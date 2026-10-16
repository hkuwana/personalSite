<script lang="ts">
	import DiagnosticCard from '$lib/components/DiagnosticCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import MethodPreview from '$lib/components/MethodPreview.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { localize } from '$lib/i18n';

	let { data } = $props();
	const t = $derived(data.t);
</script>

<Seo title={t.meta.title} description={t.meta.description} locale={data.locale} />

<Hero latest={data.latest} locale={data.locale} {t} />

{#if data.more.length > 0}
	<section class="section shelf">
		<div class="container">
			<div class="shelf-head">
				<h2 class="section-title">{t.diagnostics.label}</h2>
				<a href={localize('/diagnostics', data.locale)} class="btn btn-secondary">{t.home.moreDiagnostics}</a>
			</div>
			<div class="grid">
				{#each data.more as diagnostic (diagnostic.slug)}
					<DiagnosticCard {diagnostic} locale={data.locale} {t} location="home_shelf" />
				{/each}
			</div>
		</div>
	</section>
{/if}

<MethodPreview posts={data.featured} locale={data.locale} {t} />

<section class="section strip">
	<div class="container strip-grid">
		<div>
			<h2 class="section-title">{t.home.workTitle}</h2>
			<p>{t.home.workBody}</p>
		</div>
		<div class="strip-actions">
			<a
				class="btn btn-primary"
				href={localize('/work', data.locale)}
				data-track="cta_clicked"
				data-track-cta_id="work"
				data-track-location="home">{t.home.workLink}</a
			>
			<a class="btn btn-secondary" href={localize('/about', data.locale)}>{t.home.aboutLink}</a>
		</div>
	</div>
</section>

<style>
	.shelf-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: var(--spacing-xl);
	}

	.strip {
		border-top: 1px solid var(--color-border);
	}

	.strip-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: var(--spacing-2xl);
		align-items: center;
	}

	.strip p {
		color: var(--color-text-secondary);
		max-width: 38rem;
	}

	.strip-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md);
		justify-content: flex-end;
	}

	@media (max-width: 768px) {
		.section {
			padding: var(--spacing-3xl) 0;
		}

		.strip-grid {
			grid-template-columns: 1fr;
		}

		.strip-actions {
			justify-content: flex-start;
		}
	}
</style>
