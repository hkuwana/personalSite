import { error } from '@sveltejs/kit';
import { content } from '$lib/server/content';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	content.method.flatMap((p) => [{ slug: p.slug }, { slug: p.slug, lang: 'ja' }]);

export const load: PageServerLoad = ({ params }) => {
	const post = content.method.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Not found');
	return { post };
};
