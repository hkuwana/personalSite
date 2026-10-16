import { dict, localeFrom } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ params, data }) => {
	const locale = localeFrom(params.lang);
	return { ...data, locale, t: dict(locale) };
};
