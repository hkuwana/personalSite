<script lang="ts">
	import { getArticles, getAllTags } from '$lib/articles';

	const posts = getArticles();
	const allTags = getAllTags();

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? posts.filter((p) => p.tags.includes(selectedTag!)) : posts
	);
</script>

<svelte:head>
	<title>Writing | Hiroyuki Kuwana</title>
	<meta name="description" content="Notes on building with LLMs, the tools I use daily, and what stops being true the more you ship." />
</svelte:head>

<section class="blog-page">
	<div class="container">
		<header class="blog-header">
			<h1>Writing</h1>
			<p class="subtitle">
				Notes on building with LLMs and what stops being true the more you ship.
			</p>
		</header>

		<div class="blog-filters">
			<button
				class="filter-tag"
				class:active={selectedTag === null}
				onclick={() => (selectedTag = null)}
			>
				All
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
			{#each filteredPosts as post (post.slug)}
				<a href="/blog/{post.slug}" class="post-item">
					<div class="post-content">
						<h2 class="post-title">{post.title}</h2>
						<p class="post-excerpt">{post.excerpt}</p>
					</div>
					<div class="post-meta">
						<time datetime={post.date}>{formatDate(post.date)}</time>
						<span class="read-time">{post.readTime}</span>
					</div>
				</a>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<div class="no-posts">
				<p>No posts found.</p>
				<button class="btn btn-secondary" onclick={() => (selectedTag = null)}>
					View All
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

	.container {
		max-width: 720px;
	}

	.blog-header {
		margin-bottom: var(--spacing-3xl);
	}

	.blog-header h1 {
		font-size: var(--font-size-4xl);
		font-weight: 600;
		margin-bottom: var(--spacing-md);
	}

	.subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.blog-filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-2xl);
	}

	.filter-tag {
		padding: var(--spacing-sm) var(--spacing-md);
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.filter-tag:hover {
		border-color: var(--color-text);
		color: var(--color-text);
	}

	.filter-tag.active {
		background: var(--color-text);
		border-color: var(--color-text);
		color: var(--color-bg);
	}

	.posts-list {
		display: flex;
		flex-direction: column;
	}

	.post-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--spacing-xl);
		padding: var(--spacing-lg) 0;
		border-top: 1px solid var(--color-border-subtle);
		text-decoration: none;
		transition: padding-left var(--transition-fast);
	}

	.post-item:last-child {
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.post-item:hover {
		padding-left: var(--spacing-md);
	}

	.post-content {
		flex: 1;
	}

	.post-title {
		font-size: var(--font-size-lg);
		font-weight: 500;
		color: var(--color-text);
		margin-bottom: var(--spacing-xs);
		line-height: 1.4;
	}

	.post-item:hover .post-title {
		color: var(--color-accent);
	}

	.post-excerpt {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-xs);
		white-space: nowrap;
	}

	.post-meta time {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.read-time {
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
	}

	.no-posts {
		text-align: center;
		padding: var(--spacing-3xl);
		color: var(--color-text-muted);
	}

	.no-posts p {
		margin-bottom: var(--spacing-lg);
	}

	@media (max-width: 640px) {
		.post-item {
			flex-direction: column;
			gap: var(--spacing-sm);
		}

		.post-meta {
			flex-direction: row;
			align-items: center;
			gap: var(--spacing-md);
		}
	}
</style>
