<script lang="ts">
	import { page } from '$app/stores';
	import { getArticle } from '$lib/articles';

	const slug = $derived($page.params.slug ?? '');
	const post = $derived(slug ? getArticle(slug) : null);

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title} | Hiroyuki Kuwana</title>
		<meta name="description" content={post.excerpt || post.title} />
	{:else}
		<title>Not Found | Hiroyuki Kuwana</title>
	{/if}
</svelte:head>

<article class="blog-post">
	<div class="container">
		{#if post}
			<header class="post-header">
				<a href="/blog" class="back-link">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					Back
				</a>

				<div class="post-meta">
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<span class="separator">/</span>
					<span>{post.readTime}</span>
				</div>

				<h1>{post.title}</h1>
			</header>

			<div class="post-content">
				{@html post.contentHtml}
			</div>

			<footer class="post-footer">
				<a href="/blog" class="back-link-footer">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					All posts
				</a>
			</footer>
		{:else}
			<div class="not-found">
				<h1>Not Found</h1>
				<p>This post doesn't exist.</p>
				<a href="/blog" class="btn btn-secondary">Back to Blog</a>
			</div>
		{/if}
	</div>
</article>

<style>
	.blog-post {
		padding-top: calc(var(--nav-height) + var(--spacing-3xl));
		padding-bottom: var(--spacing-4xl);
		min-height: 100vh;
	}

	.container {
		max-width: 680px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-2xl);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-text);
	}

	.post-header {
		margin-bottom: var(--spacing-3xl);
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
		opacity: 0.4;
	}

	.post-header h1 {
		font-size: var(--font-size-4xl);
		font-weight: 600;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.post-content {
		font-size: var(--font-size-lg);
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.post-content :global(h2) {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-text);
		margin-top: var(--spacing-3xl);
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(h3) {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--color-text);
		margin-top: var(--spacing-2xl);
		margin-bottom: var(--spacing-md);
	}

	.post-content :global(p) {
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-bottom: var(--spacing-lg);
		padding-left: var(--spacing-xl);
	}

	.post-content :global(li) {
		margin-bottom: var(--spacing-sm);
	}

	.post-content :global(pre) {
		margin-bottom: var(--spacing-lg);
		padding: var(--spacing-lg);
		background: var(--color-bg-subtle);
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-md);
		overflow-x: auto;
		font-size: var(--font-size-sm);
		line-height: 1.6;
	}

	.post-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	.post-content :global(pre code) {
		color: var(--color-text);
		background: transparent;
		padding: 0;
	}

	.post-content :global(:not(pre) > code) {
		padding: 0.15em 0.4em;
		background: var(--color-bg-muted);
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.post-content :global(strong) {
		color: var(--color-text);
		font-weight: 600;
	}

	.post-content :global(blockquote) {
		margin: var(--spacing-lg) 0;
		padding-left: var(--spacing-lg);
		border-left: 2px solid var(--color-border);
		color: var(--color-text);
		font-style: italic;
	}

	.post-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.post-content :global(a:hover) {
		color: var(--color-accent-hover);
	}

	.post-content :global(hr) {
		border: none;
		border-top: 1px solid var(--color-border-subtle);
		margin: var(--spacing-2xl) 0;
	}

	.post-footer {
		margin-top: var(--spacing-4xl);
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-border-subtle);
	}

	.back-link-footer {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.back-link-footer:hover {
		color: var(--color-text);
	}

	.not-found {
		text-align: center;
		padding: var(--spacing-4xl) 0;
	}

	.not-found h1 {
		font-size: var(--font-size-3xl);
		margin-bottom: var(--spacing-md);
	}

	.not-found p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	@media (max-width: 768px) {
		.post-header h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>
