import { localeFrom } from '$lib/i18n';
import { content, inLang } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => ({
	studies: inLang(content.work, localeFrom(params.lang))
});
