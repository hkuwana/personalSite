export type Lang = 'en' | 'ja';

/** Fields every content type shares. */
export interface Base {
	slug: string;
	title: string;
	/** ISO date, YYYY-MM-DD. */
	date: string;
	lang: Lang;
	/** Slug of the other-language version, or null when there is none. */
	pair: string | null;
	tags: string[];
	/** Drafts and _fixture folders render in `npm run dev` only. */
	draft: boolean;
	/** Rendered Markdown body. */
	html: string;
	readingTimeMin: number;
}

export interface Source {
	title: string;
	url: string;
	date: string;
}

export interface Prompt {
	id: string;
	title: string;
	/** The prompt exactly as run, for the copy button. */
	text: string;
}

export interface Diagnostic extends Base {
	company: {
		name: string;
		name_ja: string;
		ticker: string;
		sector: string;
		revenue_band: string;
	};
	view: 'outside';
	excerpt: string;
	sources: Source[];
	video: { url: string; duration_s: number } | null;
	/** Public URL of the PDF, or null until scripts/build-pdf.ts has written it. */
	pdf: string | null;
	cover: string | null;
	prompts: Prompt[];
	skills_used: string[];
	verdict: { pays_off: string; check_first: string; leave_alone: string };
	otterd_case: string | null;
}

export interface MethodPost extends Base {
	lang: 'en';
	excerpt: string;
	/** Three to five lines in Japanese; the /ja route renders this instead of the body. */
	summary_ja: string;
	title_ja: string | null;
	featured: boolean;
	canonical_lang: 'en';
}

export interface Skill extends Base {
	summary: string;
	/** The skill or prompt file, verbatim. */
	skill_file: string;
	model_tested: string[];
	used_in: string[];
	version: string;
	changelog: { date: string; note: string }[];
	license: string;
}

export interface WorkPointer extends Base {
	sector: string;
	otterd_url: string;
	otterd_pdf_url: string;
	/** One verified sentence, copied verbatim from the Otterd case study. */
	result_line: string;
	verified: true;
}

export interface Content {
	diagnostics: Diagnostic[];
	method: MethodPost[];
	skills: Skill[];
	work: WorkPointer[];
}
