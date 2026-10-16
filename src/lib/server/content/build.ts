import { readingTime, renderMarkdown, splitFrontmatter } from './parse';
import type {
	Base,
	Content,
	Diagnostic,
	Lang,
	MethodPost,
	Prompt,
	Skill,
	Source,
	WorkPointer
} from './types';

/**
 * Turn the files under src/content into typed records and check every rule the site depends
 * on. The site loader (import.meta.glob) and scripts/validate-content.ts (fs) both call this,
 * so they cannot disagree about what is valid.
 *
 * `files` maps a path relative to src/content (e.g. "diagnostics/2026-11-x/en.md") to its text.
 * `assetUrl` returns the public URL of a binary file (PDF, image) next to the content, or null
 * when it does not exist.
 */
export function buildContent(
	files: Record<string, string>,
	assetUrl: (path: string) => string | null
): { content: Content; errors: string[]; warnings: string[] } {
	const errors: string[] = [];
	const warnings: string[] = [];
	const content: Content = { diagnostics: [], method: [], skills: [], work: [] };

	for (const [path, raw] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
		const parts = path.split('/');
		const [type] = parts;
		const isEntry =
			(type === 'method' && parts.length === 2) ||
			(['diagnostics', 'skills', 'work'].includes(type) &&
				parts.length === 3 &&
				/^(en|ja)\.md$/.test(parts[2]));
		// Anything else (prompt files, skill.md) is read by the entry that points at it.
		if (!isEntry) continue;

		const err = (message: string) => errors.push(`${path}: ${message}`);
		let parsed: ReturnType<typeof splitFrontmatter>;
		try {
			parsed = splitFrontmatter(raw);
		} catch (e) {
			err(`frontmatter is not valid YAML: ${(e as Error).message.split('\n')[0]}`);
			continue;
		}
		const { data, body } = parsed;

		if (type === 'method') {
			const slug = parts[1].replace(/\.md$/, '');
			content.method.push(method(slug, data, body, err));
		} else {
			const slug = parts[1];
			const fileLang = parts[2].slice(0, 2) as Lang;
			if (type === 'diagnostics') {
				content.diagnostics.push(diagnostic(slug, fileLang, data, body, files, assetUrl, err));
			} else if (type === 'skills') {
				content.skills.push(skill(slug, fileLang, data, body, files, err));
			} else if (type === 'work') {
				content.work.push(work(slug, fileLang, data, body, err));
			}
		}
	}

	crossCheck(content, files, errors, warnings);

	for (const list of Object.values(content) as Base[][]) {
		list.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
	}
	return { content, errors, warnings };
}

// ---------------------------------------------------------------------------------------------
// Field readers. Each records an error and returns a safe default, so one run reports every
// problem instead of stopping at the first.

type Err = (message: string) => void;
type Data = Record<string, unknown>;

function str(data: Data, key: string, err: Err, required = true): string {
	const value = data[key];
	if (typeof value === 'number') return String(value);
	if (typeof value === 'string' && value.trim() !== '') return value.trim();
	if (required) err(`"${key}" must be a non-empty string`);
	return '';
}

function optStr(data: Data, key: string, err: Err): string | null {
	return data[key] == null ? null : str(data, key, err);
}

function strList(data: Data, key: string, err: Err): string[] {
	const value = data[key];
	if (value == null) return [];
	if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value;
	err(`"${key}" must be a list of strings`);
	return [];
}

function record(data: Data, key: string, err: Err): Data {
	const value = data[key];
	if (value && typeof value === 'object' && !Array.isArray(value)) return value as Data;
	err(`"${key}" must be a mapping`);
	return {};
}

function base(slug: string, fileLang: Lang, data: Data, body: string, err: Err): Base {
	const date = str(data, 'date', err);
	if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) err(`"date" must be YYYY-MM-DD, got "${date}"`);
	const lang = str(data, 'lang', err);
	if (lang && lang !== fileLang) err(`"lang" is "${lang}" but the file is ${fileLang}`);
	const pair = data.pair == null ? null : str(data, 'pair', err);
	if (data.draft != null && typeof data.draft !== 'boolean') err('"draft" must be true or false');
	const minutes = data.reading_time_min;
	return {
		slug,
		title: str(data, 'title', err),
		date,
		lang: fileLang,
		pair,
		tags: strList(data, 'tags', err),
		draft: data.draft === true || slug.startsWith('_'),
		html: renderMarkdown(body),
		readingTimeMin: typeof minutes === 'number' ? minutes : readingTime(body, fileLang)
	};
}

// ---------------------------------------------------------------------------------------------
// Types.

function diagnostic(
	slug: string,
	lang: Lang,
	data: Data,
	body: string,
	files: Record<string, string>,
	assetUrl: (path: string) => string | null,
	err: Err
): Diagnostic {
	const dir = `diagnostics/${slug}`;
	if (!/^(\d{4}-\d{2}-[a-z0-9-]+|_[a-z0-9-]+)$/.test(slug)) {
		err(`folder name must be yyyy-mm-company (lowercase, hyphens), got "${slug}"`);
	}
	if (data.view !== 'outside') {
		err('"view: outside" is required: every diagnostic is an outside view from public sources');
	}

	const company = record(data, 'company', err);
	const verdict = record(data, 'verdict', err);

	const sources: Source[] = [];
	if (!Array.isArray(data.sources) || data.sources.length < 2) {
		err('"sources" needs at least two company-published sources');
	}
	for (const [i, s] of (Array.isArray(data.sources) ? data.sources : []).entries()) {
		const item = (s ?? {}) as Data;
		const e: Err = (m) => err(`sources[${i}]: ${m}`);
		const url = str(item, 'url', e);
		if (url && !/^https?:\/\//.test(url)) e(`"url" must be absolute, got "${url}"`);
		sources.push({ title: str(item, 'title', e), url, date: str(item, 'date', e) });
	}

	let video: Diagnostic['video'] = null;
	if (data.video != null) {
		const v = record(data, 'video', err);
		const duration = v.duration_s;
		if (typeof duration !== 'number') err('"video.duration_s" must be a number of seconds');
		video = { url: str(v, 'url', err), duration_s: typeof duration === 'number' ? duration : 0 };
	}

	const prompts: Prompt[] = [];
	for (const ref of strList(data, 'prompts', err)) {
		const path = resolve(dir, ref);
		const raw = files[path];
		if (raw == null) {
			err(`prompt "${ref}" not found at src/content/${path}`);
			continue;
		}
		const id = path.split('/').pop()!.replace(/\.md$/, '');
		try {
			const prompt = splitFrontmatter(raw);
			prompts.push({
				id,
				title: typeof prompt.data.title === 'string' ? prompt.data.title : id,
				text: prompt.body.trim()
			});
		} catch (e) {
			err(`prompt "${ref}" frontmatter is not valid YAML: ${(e as Error).message.split('\n')[0]}`);
		}
	}

	const pdfRef = optStr(data, 'pdf', err);
	const pdf = pdfRef ? assetUrl(resolve(dir, pdfRef)) : null;
	const coverRef = optStr(data, 'cover', err);
	const cover = coverRef ? assetUrl(resolve(dir, coverRef)) : null;
	if (coverRef && !cover) err(`cover "${coverRef}" not found`);

	return {
		...base(slug, lang, data, body, err),
		company: {
			name: str(company, 'name', err),
			name_ja: str(company, 'name_ja', err),
			ticker: str(company, 'ticker', err),
			sector: str(company, 'sector', err),
			revenue_band: str(company, 'revenue_band', err)
		},
		view: 'outside',
		excerpt: str(data, 'excerpt', err, false),
		sources,
		video,
		pdf,
		cover,
		prompts,
		skills_used: strList(data, 'skills_used', err),
		verdict: {
			pays_off: str(verdict, 'pays_off', err),
			check_first: str(verdict, 'check_first', err),
			leave_alone: str(verdict, 'leave_alone', err)
		},
		otterd_case: optStr(data, 'otterd_case', err)
	};
}

function method(slug: string, data: Data, body: string, err: Err): MethodPost {
	if (data.canonical_lang != null && data.canonical_lang !== 'en') {
		err('"canonical_lang" must be en: method posts are written in English');
	}
	return {
		...base(slug, 'en', data, body, err),
		lang: 'en',
		pair: null,
		excerpt: str(data, 'excerpt', err),
		summary_ja: str(data, 'summary_ja', err),
		title_ja: optStr(data, 'title_ja', err),
		featured: data.featured === true,
		canonical_lang: 'en'
	};
}

function skill(
	slug: string,
	lang: Lang,
	data: Data,
	body: string,
	files: Record<string, string>,
	err: Err
): Skill {
	const ref = str(data, 'skill_file', err);
	const path = ref ? resolve(`skills/${slug}`, ref) : '';
	const skillFile = path ? files[path] : undefined;
	if (ref && skillFile == null) err(`skill_file "${ref}" not found at src/content/${path}`);

	const changelog: Skill['changelog'] = [];
	for (const [i, c] of (Array.isArray(data.changelog) ? data.changelog : []).entries()) {
		const item = (c ?? {}) as Data;
		const e: Err = (m) => err(`changelog[${i}]: ${m}`);
		changelog.push({ date: str(item, 'date', e), note: str(item, 'note', e) });
	}

	return {
		...base(slug, lang, data, body, err),
		summary: str(data, 'summary', err),
		skill_file: skillFile ?? '',
		model_tested: strList(data, 'model_tested', err),
		used_in: strList(data, 'used_in', err),
		version: str(data, 'version', err),
		changelog,
		license: str(data, 'license', err)
	};
}

function work(slug: string, lang: Lang, data: Data, body: string, err: Err): WorkPointer {
	if (data.verified !== true) {
		err('"verified: true" is required: only results Otterd has verified are shown here');
	}
	const url = str(data, 'otterd_url', err);
	if (url && !url.startsWith('https://otterd.co/')) err('"otterd_url" must be on https://otterd.co/');
	const pdf = str(data, 'otterd_pdf_url', err);
	if (pdf && !/^https:\/\/otterd\.co\/.+\.pdf$/.test(pdf)) {
		err('"otterd_pdf_url" must be a .pdf on https://otterd.co/');
	}
	return {
		...base(slug, lang, data, body, err),
		sector: str(data, 'sector', err),
		otterd_url: url,
		otterd_pdf_url: pdf,
		result_line: str(data, 'result_line', err),
		verified: true
	};
}

// ---------------------------------------------------------------------------------------------
// Rules that span entries.

function crossCheck(
	content: Content,
	files: Record<string, string>,
	errors: string[],
	warnings: string[]
) {
	const has = (type: string, slug: string, lang: Lang) => `${type}/${slug}/${lang}.md` in files;

	for (const d of content.diagnostics) {
		const where = `diagnostics/${d.slug}/${d.lang}.md`;
		const other: Lang = d.lang === 'en' ? 'ja' : 'en';
		if (d.pair !== d.slug || !has('diagnostics', d.slug, other)) {
			errors.push(
				`${where}: every diagnostic ships in both languages; needs "pair: ${d.slug}" and diagnostics/${d.slug}/${other}.md`
			);
		}
		for (const s of d.skills_used) {
			const skill = content.skills.find((k) => k.slug === s);
			if (!skill) {
				errors.push(`${where}: skills_used names "${s}", which is not in src/content/skills`);
			} else if (skill.draft && !d.draft) {
				errors.push(`${where}: skills_used names "${s}", which is a draft and will not be published`);
			}
		}
		if (d.pdf === null) {
			warnings.push(`${where}: no PDF yet; run npm run pdf after the page builds`);
		}
	}

	for (const k of content.skills) {
		for (const slug of k.used_in) {
			const d = content.diagnostics.find((d) => d.slug === slug);
			if (!d) {
				errors.push(`skills/${k.slug}/${k.lang}.md: used_in names "${slug}", which is not a diagnostic`);
			} else if (d.draft && !k.draft) {
				errors.push(`skills/${k.slug}/${k.lang}.md: used_in names "${slug}", which is a draft and will not be published`);
			}
		}
	}

	for (const type of ['skills', 'work'] as const) {
		for (const entry of content[type]) {
			const other: Lang = entry.lang === 'en' ? 'ja' : 'en';
			if (entry.pair !== null && !has(type, entry.pair, other)) {
				errors.push(`${type}/${entry.slug}/${entry.lang}.md: pair "${entry.pair}" has no ${other}.md`);
			}
		}
	}
}

/** Resolve "./prompts/01.md" against "diagnostics/x" to "diagnostics/x/prompts/01.md". */
function resolve(dir: string, ref: string): string {
	const parts = dir.split('/');
	for (const piece of ref.split('/')) {
		if (piece === '..') parts.pop();
		else if (piece !== '.' && piece !== '') parts.push(piece);
	}
	return parts.join('/');
}
