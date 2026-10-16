// Old /blog URLs. Posts that became method posts move permanently; the generic web-development
// posts that were cut answer 410 Gone so search engines drop them.
const moved = new Set([
	'claude-overnight-experiments',
	'implementing-karpathy-autoresearch',
	'measuring-ai-effectiveness',
	'promotion-checklist-for-experiments',
	'rollback-discipline-for-experiments',
	'the-program-md-pattern',
	'the-proxy-metric-trap',
	'thompson-sampling-without-stats-degree'
]);

export type LegacyRoute = { status: 301; location: string } | { status: 410 } | null;

export function legacyRoute(pathname: string): LegacyRoute {
	const match = /^(\/ja)?\/blog(?:\/([^/]+))?\/?$/.exec(pathname);
	if (!match) return null;
	const [, ja = '', slug] = match;
	if (!slug) return { status: 301, location: `${ja}/method` };
	if (moved.has(slug)) return { status: 301, location: `${ja}/method/${slug}` };
	return { status: 410 };
}
