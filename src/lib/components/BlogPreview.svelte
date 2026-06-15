<script lang="ts">
	const posts = [
		{
			slug: 'getting-started-with-svelte-5',
			title: 'Getting Started with Svelte 5',
			excerpt: 'Exploring runes, fine-grained reactivity, and the new mental model.',
			date: '2024-01-15'
		},
		{
			slug: 'building-better-apis',
			title: 'Building Better APIs',
			excerpt: 'Designing clean, intuitive REST endpoints that developers love.',
			date: '2024-01-08'
		},
		{
			slug: 'the-power-of-typescript',
			title: 'TypeScript in Large-Scale Apps',
			excerpt: 'Why static typing matters and how to get the most out of it.',
			date: '2024-01-01'
		}
	];

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<section id="blog" class="blog-preview section">
	<div class="container">
		<header class="blog-header">
			<div>
				<h2 class="section-title">Writing</h2>
				<p class="section-subtitle">
					Notes on building with LLMs and what stops being true the more you ship.
				</p>
			</div>
			<a href="/blog" class="view-all">
				All Posts
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</header>

		<div class="posts-list">
			{#each posts as post}
				<a href="/blog/{post.slug}" class="post-item">
					<div class="post-content">
						<h3 class="post-title">{post.title}</h3>
						<p class="post-excerpt">{post.excerpt}</p>
					</div>
					<time class="post-date" datetime={post.date}>{formatDate(post.date)}</time>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.blog-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: var(--spacing-2xl);
	}

	.view-all {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.view-all:hover {
		color: var(--color-text);
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
		transition: all var(--transition-fast);
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
	}

	.post-item:hover .post-title {
		color: var(--color-accent);
	}

	.post-excerpt {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.post-date {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.blog-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.post-item {
			flex-direction: column;
			gap: var(--spacing-sm);
		}
	}
</style>
