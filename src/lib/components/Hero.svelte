<script lang="ts">
	import Verdict from '$lib/components/Verdict.svelte';
	import { formatDate } from '$lib/format';
	import { localize, type Dictionary, type Locale } from '$lib/i18n';
	import type { DiagnosticSummary } from '$lib/server/content/types';

	let {
		latest,
		locale,
		t
	}: { latest: DiagnosticSummary | null; locale: Locale; t: Dictionary } = $props();

	const name = $derived(latest ? (locale === 'ja' ? latest.company.name_ja : latest.company.name) : '');
</script>

<section class="hero">
	<!-- Decorative glow, desktop only: on a phone it costs paint time and adds nothing. -->
	<div class="glow" aria-hidden="true"></div>

	<div class="container hero-grid">
		<div class="copy">
			<h1>{t.home.title}</h1>
			<p class="sub">{t.home.sub}</p>
		</div>

		<div class="shelf">
			{#if latest}
				<p class="kicker">{t.home.latest}</p>
				<article class="latest card">
					<p class="meta">
						{latest.company.sector} · <time datetime={latest.date}>{formatDate(latest.date, locale)}</time>
					</p>
					<h2>{name}</h2>
					<p class="outside">{t.diagnostics.outsideLabel}</p>
					<Verdict verdict={latest.verdict} {t} compact />
					<a
						class="btn btn-primary"
						href={localize(`/diagnostics/${latest.slug}`, locale)}
						data-track="cta_clicked"
						data-track-cta_id="diagnostic"
						data-track-slug={latest.slug}
						data-track-location="home_hero">{t.diagnostics.read}</a
					>
				</article>
			{:else}
				<article class="latest card">
					<p class="none">{t.home.noneYet}</p>
					<a
						class="btn btn-secondary"
						href={localize('/method', locale)}
						data-track="cta_clicked"
						data-track-cta_id="method"
						data-track-location="home_hero">{t.method.label}</a
					>
				</article>
			{/if}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		padding: calc(var(--nav-height) + var(--spacing-3xl)) 0 var(--spacing-3xl);
	}

	.glow {
		display: none;
	}

	@media (min-width: 900px) {
		.glow {
			display: block;
			position: absolute;
			top: -240px;
			right: -120px;
			width: 560px;
			height: 560px;
			border-radius: 50%;
			background: var(--color-accent);
			opacity: 0.12;
			filter: blur(90px);
			pointer-events: none;
		}
	}

	.hero-grid {
		position: relative;
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--spacing-3xl);
		align-items: center;
	}

	h1 {
		font-size: var(--font-size-5xl);
		line-height: 1.12;
		letter-spacing: -0.02em;
		margin-bottom: var(--spacing-lg);
	}

	:global(:lang(ja)) h1 {
		letter-spacing: 0;
		line-height: 1.35;
	}

	.sub {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		max-width: 34rem;
	}

	.kicker {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-sm);
	}

	.latest {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		align-items: flex-start;
	}

	.latest :global(.verdict) {
		width: 100%;
	}

	.meta {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	h2 {
		font-size: var(--font-size-2xl);
		line-height: 1.25;
	}

	.outside {
		font-size: var(--font-size-xs);
		color: var(--color-text-secondary);
		border-left: 3px solid var(--color-warning);
		padding-left: var(--spacing-sm);
	}

	.none {
		color: var(--color-text-secondary);
	}

	@media (max-width: 900px) {
		.hero {
			padding-top: calc(var(--nav-height) + var(--spacing-xl));
		}

		.hero-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-2xl);
		}

		h1 {
			font-size: var(--font-size-3xl);
		}

		.sub {
			font-size: var(--font-size-base);
		}
	}
</style>
