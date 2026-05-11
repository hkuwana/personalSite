import { marked } from 'marked';

export interface Article {
	slug: string;
	title: string;
	date: string;
	readTime: string;
	excerpt: string;
	tags: string[];
	featured: boolean;
	content: string;
	contentHtml: string;
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
	if (!match) return { data: {}, content: raw };

	const yamlBlock = match[1];
	const content = match[2];
	const data: Record<string, unknown> = {};

	for (const line of yamlBlock.split(/\r?\n/)) {
		const colonIdx = line.indexOf(':');
		if (colonIdx === -1) continue;
		const key = line.slice(0, colonIdx).trim();
		const rawValue = line.slice(colonIdx + 1).trim();

		if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
			const inner = rawValue.slice(1, -1).trim();
			data[key] = inner
				? inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
				: [];
		} else if (rawValue === 'true') {
			data[key] = true;
		} else if (rawValue === 'false') {
			data[key] = false;
		} else {
			data[key] = rawValue.replace(/^['"]|['"]$/g, '');
		}
	}

	return { data, content };
}

marked.setOptions({ gfm: true, breaks: false });

const rawModules = import.meta.glob('/src/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const articles: Article[] = Object.entries(rawModules)
	.map(([path, raw]) => {
		const slug = (path.split('/').pop() ?? '').replace(/\.md$/, '');
		const { data, content } = parseFrontmatter(raw);
		return {
			slug,
			title: (data.title as string) ?? slug,
			date: (data.date as string) ?? '',
			readTime: (data.readTime as string) ?? '',
			excerpt: (data.excerpt as string) ?? '',
			tags: (data.tags as string[]) ?? [],
			featured: Boolean(data.featured),
			content,
			contentHtml: marked.parse(content, { async: false }) as string
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));

export function getArticles(): Article[] {
	return articles;
}

export function getArticle(slug: string): Article | null {
	return articles.find((a) => a.slug === slug) ?? null;
}

export function getAllTags(): string[] {
	return [...new Set(articles.flatMap((a) => a.tags))].sort();
}

export function getArticlesByTag(tag: string): Article[] {
	return articles.filter((a) => a.tags.includes(tag));
}

export function getFeaturedArticles(): Article[] {
	return articles.filter((a) => a.featured);
}
