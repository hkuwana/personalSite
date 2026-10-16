<script lang="ts">
	import { formatDate } from '$lib/format';
	import { localize, type Dictionary, type Locale } from '$lib/i18n';
	import type { MethodPost } from '$lib/server/content/types';

	let {
		posts,
		locale,
		t
	}: { posts: Omit<MethodPost, 'html'>[]; locale: Locale; t: Dictionary } = $props();

	const ja = $derived(locale === 'ja');
</script>

<section id="method" class="blog-preview section">
	<div class="container">
		<div class="blog-header">
			<div class="header-content">
				<span class="section-label">{t.method.label}</span>
				<h2 class="section-title">{t.method.title}</h2>
				<p class="section-subtitle">{t.method.intro}</p>
			</div>
			<a href={localize('/method', locale)} class="btn btn-secondary view-all">
				{t.common.viewAll}
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

		<div class="posts-grid">
			{#each posts as post, i (post.slug)}
				<article class="post-card card" style="animation-delay: {i * 0.1}s">
					<div class="post-meta">
						<time datetime={post.date}>{formatDate(post.date, locale)}</time>
						<span class="separator">•</span>
						<span>{post.readingTimeMin} {t.common.minRead}</span>
					</div>

					<h3 class="post-title">
						<a
							href={localize(`/method/${post.slug}`, locale)}
							data-track="cta_clicked"
							data-track-cta_id="method_post"
							data-track-slug={post.slug}
							data-track-location="home">{ja ? (post.title_ja ?? post.title) : post.title}</a
						>
					</h3>

					<p class="post-excerpt">{ja ? post.summary_ja : post.excerpt}</p>

					<div class="post-footer">
						<div class="post-tags">
							{#each post.tags.slice(0, 2) as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
						<a href={localize(`/method/${post.slug}`, locale)} class="read-more" aria-hidden="true" tabindex="-1">
							{t.common.readMore}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.blog-preview {
		background: var(--color-bg-secondary);
		position: relative;
	}

	.blog-preview::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-border), transparent);
	}

	.blog-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: var(--spacing-2xl);
		flex-wrap: wrap;
		gap: var(--spacing-lg);
	}

	.section-label {
		display: inline-block;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-accent-light);
		margin-bottom: var(--spacing-lg);
	}

	.header-content .section-title {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-sm);
	}

	.view-all {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-xl);
	}

	.post-card {
		display: flex;
		flex-direction: column;
		animation: fadeInUp 0.6s ease forwards;
		opacity: 0;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
	}

	.separator {
		opacity: 0.5;
	}

	.post-title {
		font-size: var(--font-size-xl);
		line-height: 1.4;
		margin-bottom: var(--spacing-md);
	}

	.post-title a {
		color: var(--color-text-primary);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.post-title a:hover {
		color: var(--color-accent-light);
	}

	.post-excerpt {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
		flex-grow: 1;
		margin-bottom: var(--spacing-lg);
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-border);
	}

	.post-tags {
		display: flex;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--color-accent-light);
		font-family: var(--font-mono);
	}

	.read-more {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-accent-light);
		transition: gap var(--transition-base);
	}

	.read-more:hover {
		gap: var(--spacing-sm);
	}

	@media (max-width: 968px) {
		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}

		.blog-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.header-content .section-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
