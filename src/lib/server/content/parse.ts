import yaml from 'js-yaml';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/**
 * Split YAML frontmatter from a Markdown body. CORE_SCHEMA keeps dates as strings
 * ("2026-11-04" stays a string, not a Date) and still reads numbers and booleans.
 */
export function splitFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	if (!match) return { data: {}, body: raw };
	const data = yaml.load(match[1], { schema: yaml.CORE_SCHEMA });
	return {
		data: data && typeof data === 'object' ? (data as Record<string, unknown>) : {},
		body: match[2]
	};
}

export function renderMarkdown(body: string): string {
	return marked.parse(body, { async: false }) as string;
}

/** About 220 English words or 500 Japanese characters a minute. */
export function readingTime(body: string, lang: 'en' | 'ja'): number {
	const units = lang === 'ja' ? body.replace(/\s/g, '').length / 500 : body.split(/\s+/).length / 220;
	return Math.max(1, Math.round(units));
}
