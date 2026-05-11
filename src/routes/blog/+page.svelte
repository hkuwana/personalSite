<script lang="ts">
	import { getArticles, getAllTags } from '$lib/articles';

	const posts = getArticles();
	const allTags = getAllTags();

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? posts.filter((p) => p.tags.includes(selectedTag!)) : posts
	);
</script>

<svelte:head>
	<title>Blog | Hiroyuki Kuwana</title>
	<meta
		name="description"
		content="Articles about web development, AI workflows, and software engineering by Hiroyuki Kuwana."
	/>
</svelte:head>

<section class="blog-page">
	<div class="container">
		<header class="blog-header">
			<span class="section-label">Blog</span>
			<h1>Thoughts & Tutorials</h1>
			<p class="subtitle">
				Exploring web development, AI workflows, and the technologies that power the modern web.
			</p>
		</header>

		<div class="blog-filters">
			<button
				class="filter-tag"
				class:active={selectedTag === null}
				onclick={() => (selectedTag = null)}
			>
				All Posts
			</button>
			{#each allTags as tag}
				<button
					class="filter-tag"
					class:active={selectedTag === tag}
					onclick={() => (selectedTag = tag)}
				>
					{tag}
				</button>
			{/each}
		</div>

		<div class="posts-list">
			{#each filteredPosts as post, i (post.slug)}
				<article class="post-item" style="animation-delay: {i * 0.1}s">
					<div class="post-content">
						<div class="post-meta">
							<time datetime={post.date}>{formatDate(post.date)}</time>
							<span class="separator">•</span>
							<span>{post.readTime}</span>
							{#if post.featured}
								<span class="featured-badge">Featured</span>
							{/if}
						</div>

						<h2 class="post-title">
							<a href="/blog/{post.slug}">{post.title}</a>
						</h2>

						<p class="post-excerpt">{post.excerpt}</p>

						<div class="post-footer">
							<div class="post-tags">
								{#each post.tags as tag}
									<button class="tag" onclick={() => (selectedTag = tag)}>
										{tag}
									</button>
								{/each}
							</div>
							<a href="/blog/{post.slug}" class="read-more">
								Read Article
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<div class="no-posts">
				<p>No posts found with the selected tag.</p>
				<button class="btn btn-secondary" onclick={() => (selectedTag = null)}>
					View All Posts
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.blog-page {
		padding-top: calc(var(--nav-height) + var(--spacing-3xl));
		padding-bottom: var(--spacing-4xl);
		min-height: 100vh;
	}

	.blog-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
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

	.blog-header h1 {
		font-size: var(--font-size-5xl);
		margin-bottom: var(--spacing-lg);
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		max-width: 600px;
		margin: 0 auto;
	}

	.blog-filters {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-2xl);
	}

	.filter-tag {
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.filter-tag:hover {
		border-color: var(--color-border-light);
		color: var(--color-text-primary);
	}

	.filter-tag.active {
		background: var(--gradient-accent);
		border-color: transparent;
		color: white;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
		max-width: 800px;
		margin: 0 auto;
	}

	.post-item {
		background: var(--gradient-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		transition: all var(--transition-base);
		animation: fadeInUp 0.6s ease forwards;
		opacity: 0;
	}

	.post-item:hover {
		border-color: var(--color-border-light);
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
		flex-wrap: wrap;
	}

	.separator {
		opacity: 0.5;
	}

	.featured-badge {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--gradient-accent);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: white;
		font-weight: 500;
	}

	.post-title {
		font-size: var(--font-size-2xl);
		line-height: 1.3;
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
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-border);
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-bg-tertiary);
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--color-accent-light);
		font-family: var(--font-mono);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.tag:hover {
		background: var(--color-accent);
		color: white;
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

	.no-posts {
		text-align: center;
		padding: var(--spacing-3xl);
		color: var(--color-text-muted);
	}

	.no-posts p {
		margin-bottom: var(--spacing-lg);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.blog-header h1 {
			font-size: var(--font-size-4xl);
		}

		.post-title {
			font-size: var(--font-size-xl);
		}
	}
</style>
