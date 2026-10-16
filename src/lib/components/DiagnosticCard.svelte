<script lang="ts">
	import { formatDate } from '$lib/format';
	import { localize, type Dictionary, type Locale } from '$lib/i18n';
	import type { DiagnosticSummary } from '$lib/server/content/types';

	let {
		diagnostic: d,
		locale,
		t,
		location
	}: { diagnostic: DiagnosticSummary; locale: Locale; t: Dictionary; location: string } = $props();

	const name = $derived(locale === 'ja' ? d.company.name_ja : d.company.name);
	const href = $derived(localize(`/diagnostics/${d.slug}`, locale));
</script>

<article class="card diagnostic-card">
	<div class="meta">
		<span>{d.company.sector}</span>
		<span aria-hidden="true">·</span>
		<time datetime={d.date}>{formatDate(d.date, locale)}</time>
	</div>
	<h3>
		<a
			{href}
			data-track="diagnostic_opened"
			data-track-slug={d.slug}
			data-track-location={location}>{name}</a
		>
	</h3>
	<p class="pays"><strong>{t.diagnostics.paysOff}:</strong> {d.verdict.pays_off}</p>
</article>

<style>
	.diagnostic-card {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	h3 {
		font-size: var(--font-size-xl);
		line-height: 1.35;
	}

	h3 a {
		color: var(--color-text-primary);
	}

	/* The whole card is the link target. */
	h3 a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.diagnostic-card {
		position: relative;
	}

	.diagnostic-card:hover h3 a {
		color: var(--color-accent-light);
	}

	.pays {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.pays strong {
		color: var(--color-text-primary);
		font-weight: 600;
	}
</style>
