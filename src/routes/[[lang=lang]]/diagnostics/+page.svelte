<script lang="ts">
	import DiagnosticCard from '$lib/components/DiagnosticCard.svelte';
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();
	const t = $derived(data.t);
</script>

<Seo
	title="{t.diagnostics.label} | {t.name}"
	description={t.diagnostics.metaDescription}
	locale={data.locale}
/>

<section class="page">
	<div class="container">
		<header class="intro">
			<span class="section-label">{t.diagnostics.label}</span>
			<h1>{t.diagnostics.title}</h1>
			<p>{t.diagnostics.intro}</p>
		</header>

		{#if data.diagnostics.length === 0}
			<p class="empty">{t.diagnostics.empty}</p>
		{:else}
			<div class="grid">
				{#each data.diagnostics as diagnostic (diagnostic.slug)}
					<DiagnosticCard {diagnostic} locale={data.locale} {t} location="index" />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.intro {
		max-width: 720px;
		margin-bottom: var(--spacing-3xl);
	}

	h1 {
		font-size: var(--font-size-5xl);
		line-height: 1.15;
		margin-bottom: var(--spacing-lg);
	}

	.intro p {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: var(--spacing-xl);
	}

	.empty {
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>
