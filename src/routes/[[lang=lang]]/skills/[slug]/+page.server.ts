import { error } from '@sveltejs/kit';
import { localeFrom } from '$lib/i18n';
import { content, find } from '$lib/server/content';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	content.skills.map((k) => (k.lang === 'ja' ? { slug: k.slug, lang: 'ja' } : { slug: k.slug }));

export const load: PageServerLoad = ({ params }) => {
	const locale = localeFrom(params.lang);
	const skill = find(content.skills, params.slug, locale);
	if (!skill) error(404, 'Not found');
	const usedIn = skill.used_in.map((slug) => {
		const d = find(content.diagnostics, slug, locale);
		return { slug, name: d ? (locale === 'ja' ? d.company.name_ja : d.company.name) : slug };
	});
	return { skill, usedIn };
};
