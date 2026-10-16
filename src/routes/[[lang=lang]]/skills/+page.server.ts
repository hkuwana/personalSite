import { localeFrom } from '$lib/i18n';
import { content, inLang } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => ({
	skills: inLang(content.skills, localeFrom(params.lang)).map(
		({ slug, title, summary, version, used_in, tags }) => ({ slug, title, summary, version, used_in, tags })
	)
});
