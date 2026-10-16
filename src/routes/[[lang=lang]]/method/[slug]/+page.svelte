<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import { localize } from '$lib/i18n';

	let { data } = $props();
	const t = $derived(data.t);
	const post = $derived(data.post);
	const ja = $derived(data.locale === 'ja');
	const title = $derived(ja ? (post.title_ja ?? post.title) : post.title);
</script>

<Seo
	title="{title} | {t.name}"
	description={ja ? post.summary_ja : post.excerpt}
	locale={data.locale}
	type="article"
/>

<article class="post">
	<div class="container">
		<header>
			<a href={localize('/method', data.locale)} class="back">← {t.method.backToIndex}</a>
			<div class="meta">
				<time datetime={post.date}>{formatDate(post.date, data.locale)}</time>
				<span aria-hidden="true">·</span>
				<span>{post.readingTimeMin} {t.common.minRead}</span>
			</div>
			<h1>{title}</h1>
			{#if ja}
				<p class="original-title" lang="en">{t.method.originalInEnglish}: {post.title}</p>
			{/if}
		</header>

		{#if ja}
			<p class="note">{t.method.abstractNote}</p>
			<div class="prose abstract"><p>{post.summary_ja}</p></div>
			<a
				class="btn btn-primary"
				href={localize(`/method/${post.slug}`, 'en')}
				hreflang="en"
				data-track="language_switched"
				data-track-from="ja"
				data-track-to="en"
				data-track-location="method_abstract">{t.method.readOriginal}</a
			>
		{:else}
			<div class="prose">{@html post.html}</div>
		{/if}
	</div>
</article>

<style>
	.post {
		padding-top: calc(var(--nav-height) + var(--spacing-3xl));
		padding-bottom: var(--spacing-4xl);
	}

	.container {
		max-width: 760px;
	}

	header {
		margin-bottom: var(--spacing-2xl);
	}

	.back {
		display: inline-block;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-xl);
	}

	.meta {
		display: flex;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
	}

	h1 {
		font-size: var(--font-size-4xl);
		line-height: 1.25;
	}

	.original-title {
		margin-top: var(--spacing-md);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	.note {
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-md);
	}

	.abstract {
		padding: var(--spacing-xl);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		margin-bottom: var(--spacing-xl);
	}

	.abstract p {
		margin: 0;
		color: var(--color-text-primary);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>
