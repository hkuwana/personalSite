<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import { localize } from '$lib/i18n';

	let { data } = $props();
	const t = $derived(data.t);
	const ja = $derived(data.locale === 'ja');
</script>

<Seo
	title="{t.method.label} | {t.name}"
	description={t.method.metaDescription}
	locale={data.locale}
/>

<section class="page">
	<div class="container">
		<header class="page-header">
			<span class="section-label">{t.method.label}</span>
			<h1>{t.method.title}</h1>
			<p class="subtitle">{t.method.intro}</p>
		</header>

		<ol class="posts" role="list">
			{#each data.posts as post (post.slug)}
				<li class="post">
					<div class="meta">
						<time datetime={post.date}>{formatDate(post.date, data.locale)}</time>
						<span aria-hidden="true">·</span>
						<span>{post.readingTimeMin} {t.common.minRead}</span>
						{#if ja}
							<span class="badge" lang="en">EN</span>
						{/if}
						{#if post.featured}
							<span class="badge">{t.common.featured}</span>
						{/if}
					</div>
					<h2>
						<a
							href={localize(`/method/${post.slug}`, data.locale)}
							data-track="method_post_opened"
							data-track-slug={post.slug}
							data-track-location="index">{ja ? (post.title_ja ?? post.title) : post.title}</a
						>
					</h2>
					<p class="excerpt">{ja ? post.summary_ja : post.excerpt}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.page {
		padding-top: calc(var(--nav-height) + var(--spacing-3xl));
		padding-bottom: var(--spacing-4xl);
	}

	.page-header {
		max-width: 720px;
		margin: 0 auto var(--spacing-3xl);
		text-align: center;
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

	h1 {
		font-size: var(--font-size-5xl);
		line-height: 1.15;
		margin-bottom: var(--spacing-lg);
	}

	.subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
	}

	.posts {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
		max-width: 800px;
		margin: 0 auto;
	}

	.post {
		background: var(--gradient-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-xl);
		transition: border-color var(--transition-base);
	}

	.post:hover {
		border-color: var(--color-border-light);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
	}

	.badge {
		padding: 0 var(--spacing-sm);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
	}

	h2 {
		font-size: var(--font-size-2xl);
		line-height: 1.3;
		margin-bottom: var(--spacing-md);
	}

	h2 a {
		color: var(--color-text-primary);
	}

	h2 a:hover {
		color: var(--color-accent-light);
	}

	.excerpt {
		color: var(--color-text-secondary);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}

		h2 {
			font-size: var(--font-size-xl);
		}

		.post {
			padding: var(--spacing-lg);
		}
	}
</style>
