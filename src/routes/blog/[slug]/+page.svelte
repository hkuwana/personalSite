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
		<title>Post Not Found | Hiroyuki Kuwana</title>
	{/if}
</svelte:head>

<article class="blog-post">
	<div class="container">
		{#if post}
			<header class="post-header">
				<a href="/blog" class="back-link">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					Back to Blog
				</a>

				<div class="post-meta">
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<span class="separator">•</span>
					<span>{post.readTime}</span>
				</div>

				<h1>{post.title}</h1>

				<div class="post-tags">
					{#each post.tags as tag}
						<a href="/blog?tag={tag}" class="tag">{tag}</a>
					{/each}
				</div>
			</header>

			<div class="post-content">
				{@html post.contentHtml}
			</div>

			<footer class="post-footer">
				<div class="author-card">
					<img src="/images/selfPortrait.jpeg" alt="Hiroyuki Kuwana" class="author-image" />
					<div class="author-info">
						<h4>Written by Hiroyuki Kuwana</h4>
						<p>
							Full Stack Developer passionate about building elegant solutions with modern web
							technologies.
						</p>
					</div>
				</div>

				<div class="share-section">
					<span>Share this article:</span>
					<div class="share-buttons">
						<a
							href="https://twitter.com/intent/tweet?text={encodeURIComponent(
								post.title
							)}&url={encodeURIComponent(`https://hkuwana.com/blog/${slug}`)}"
							target="_blank"
							rel="noopener noreferrer"
							class="share-btn"
						>
							Twitter
						</a>
						<a
							href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent(
								`https://hkuwana.com/blog/${slug}`
							)}&title={encodeURIComponent(post.title)}"
							target="_blank"
							rel="noopener noreferrer"
							class="share-btn"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</footer>
		{:else}
			<div class="not-found">
				<h1>Post Not Found</h1>
				<p>The post you're looking for doesn't exist.</p>
				<a href="/blog" class="btn btn-primary">Back to Blog</a>
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
		max-width: 800px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-xl);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-accent-light);
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
		margin-bottom: var(--spacing-lg);
	}

	.separator {
		opacity: 0.5;
	}

	.post-header h1 {
		font-size: var(--font-size-4xl);
		line-height: 1.2;
		margin-bottom: var(--spacing-lg);
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-accent-light);
		font-family: var(--font-mono);
		transition: all var(--transition-fast);
	}

	.tag:hover {
		background: var(--color-accent);
		color: white;
	}

	.post-content {
		font-size: var(--font-size-lg);
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.post-content :global(h2) {
		font-size: var(--font-size-2xl);
		color: var(--color-text-primary);
		margin-top: var(--spacing-3xl);
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(h3) {
		font-size: var(--font-size-xl);
		color: var(--color-text-primary);
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
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow-x: auto;
		font-size: var(--font-size-sm);
		line-height: 1.6;
	}

	.post-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
		color: var(--color-accent-light);
	}

	.post-content :global(pre code) {
		color: var(--color-text-primary);
		background: transparent;
		padding: 0;
	}

	.post-content :global(:not(pre) > code) {
		padding: 0.1em 0.4em;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
	}

	.post-content :global(strong) {
		color: var(--color-text-primary);
	}

	.post-content :global(blockquote) {
		margin: var(--spacing-lg) 0;
		padding-left: var(--spacing-lg);
		border-left: 3px solid var(--color-accent);
		color: var(--color-text-primary);
		font-style: italic;
	}

	.post-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: var(--spacing-lg);
		font-size: var(--font-size-sm);
	}

	.post-content :global(thead) {
		border-bottom: 1px solid var(--color-border-light);
	}

	.post-content :global(th),
	.post-content :global(td) {
		padding: var(--spacing-sm) var(--spacing-md);
		text-align: left;
		border-bottom: 1px solid var(--color-border);
	}

	.post-content :global(th) {
		color: var(--color-text-primary);
		font-weight: 600;
	}

	.post-content :global(a) {
		color: var(--color-accent-light);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.post-content :global(a:hover) {
		color: var(--color-accent);
	}

	.post-content :global(hr) {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: var(--spacing-2xl) 0;
	}

	.post-footer {
		margin-top: var(--spacing-4xl);
		padding-top: var(--spacing-2xl);
		border-top: 1px solid var(--color-border);
	}

	.author-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-xl);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		margin-bottom: var(--spacing-xl);
	}

	.author-image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author-info h4 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-sm);
	}

	.author-info p {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.share-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		flex-wrap: wrap;
	}

	.share-section span {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.share-buttons {
		display: flex;
		gap: var(--spacing-sm);
	}

	.share-btn {
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		transition: all var(--transition-base);
	}

	.share-btn:hover {
		background: var(--color-bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent-light);
	}

	.not-found {
		text-align: center;
		padding: var(--spacing-4xl) 0;
	}

	.not-found h1 {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.not-found p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	@media (max-width: 768px) {
		.post-header h1 {
			font-size: var(--font-size-3xl);
		}

		.author-card {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
