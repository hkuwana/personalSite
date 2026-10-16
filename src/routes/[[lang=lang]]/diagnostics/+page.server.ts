import { localeFrom } from '$lib/i18n';
import { content, inLang, summarize } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => ({
	diagnostics: inLang(content.diagnostics, localeFrom(params.lang)).map(summarize)
});
