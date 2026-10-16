import { error } from '@sveltejs/kit';
import { localeFrom } from '$lib/i18n';
import { content, find } from '$lib/server/content';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	content.diagnostics.map((d) => (d.lang === 'ja' ? { slug: d.slug, lang: 'ja' } : { slug: d.slug }));

export const load: PageServerLoad = ({ params }) => {
	const locale = localeFrom(params.lang);
	const diagnostic = find(content.diagnostics, params.slug, locale);
	if (!diagnostic) error(404, 'Not found');
	const skills = diagnostic.skills_used.map((slug) => {
		const skill = find(content.skills, slug, locale) ?? find(content.skills, slug, 'en');
		return { slug, title: skill?.title ?? slug };
	});
	return { diagnostic, skills };
};
