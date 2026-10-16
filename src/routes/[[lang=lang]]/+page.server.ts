import { localeFrom } from '$lib/i18n';
import { content, inLang, summarize } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const diagnostics = inLang(content.diagnostics, localeFrom(params.lang)).map(summarize);
	return {
		latest: diagnostics[0] ?? null,
		more: diagnostics.slice(1, 4),
		featured: content.method
			.filter((p) => p.featured)
			.slice(0, 3)
			.map(({ html: _html, ...post }) => post)
	};
};
