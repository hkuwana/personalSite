import { dev } from '$app/environment';
import { buildContent } from './build';
import type { Content, Lang } from './types';

export type * from './types';

const texts = import.meta.glob('/src/content/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const assets = import.meta.glob('/src/content/**/*.{pdf,webp,png,jpg}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

const relative = (path: string) => path.replace(/^\/src\/content\//, '');

const built = buildContent(
	Object.fromEntries(Object.entries(texts).map(([path, raw]) => [relative(path), raw])),
	(path) => assets[`/src/content/${path}`] ?? null
);

// The same rules as `npm run validate`, so a bad entry also fails `vite build` and `vite dev`.
if (built.errors.length > 0) {
	throw new Error(`Content is invalid:\n  ${built.errors.join('\n  ')}`);
}

/** Drafts and _fixture folders are visible in dev only. */
const visible = <T extends { draft: boolean }>(list: T[]) => (dev ? list : list.filter((e) => !e.draft));

export const content: Content = {
	diagnostics: visible(built.content.diagnostics),
	method: visible(built.content.method),
	skills: visible(built.content.skills),
	work: visible(built.content.work)
};

export function inLang<T extends { lang: Lang }>(list: T[], lang: Lang): T[] {
	return list.filter((e) => e.lang === lang);
}

export function find<T extends { slug: string; lang: Lang }>(
	list: T[],
	slug: string,
	lang: Lang
): T | undefined {
	return list.find((e) => e.slug === slug && e.lang === lang);
}
