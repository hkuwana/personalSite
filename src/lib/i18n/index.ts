import en from './en.json';
import ja from './ja.json';

export type Locale = 'en' | 'ja';
export type Dictionary = typeof en;

// Japanese must have every key English has; svelte-check fails if they drift.
const dictionaries: Record<Locale, Dictionary> = { en, ja: ja satisfies Dictionary };

export const locales: Locale[] = ['en', 'ja'];

export function localeFrom(param: string | undefined): Locale {
	return param === 'ja' ? 'ja' : 'en';
}

export function dict(locale: Locale): Dictionary {
	return dictionaries[locale];
}

/** Prefix a site path with the locale: localize('/method', 'ja') -> '/ja/method'. */
export function localize(path: string, locale: Locale): string {
	if (locale === 'en') return path;
	return path === '/' ? '/ja' : `/ja${path}`;
}

/** The same page in the other language. */
export function alternatePath(pathname: string, target: Locale): string {
	const bare = pathname === '/ja' ? '/' : pathname.replace(/^\/ja(?=\/)/, '');
	return localize(bare, target);
}
