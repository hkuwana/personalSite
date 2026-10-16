<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { OTTERD_URL } from '$lib/site';

	let { data } = $props();
	const t = $derived(data.t);
</script>

<Seo title="{t.work.label} | {t.name}" description={t.work.metaDescription} locale={data.locale} />

<section class="page">
	<div class="container">
		<header class="intro">
			<span class="section-label">{t.work.label}</span>
			<h1>{t.work.title}</h1>
			<p>{t.work.intro}</p>
		</header>

		<ul class="studies" role="list">
			{#each data.studies as study (study.slug)}
				<li class="card study">
					<p class="meta">{study.sector} · {t.work.by} {study.author}</p>
					<h2>{study.title}</h2>
					<div class="body">{@html study.html}</div>
					<p class="result"><strong>{t.work.result}:</strong> {study.result_line}</p>
					<p class="links">
						<a
							class="btn btn-primary"
							href={study.otterd_url}
							data-track="case_study_opened"
							data-track-destination="otterd"
							data-track-slug={study.slug}
							data-track-location="work">{t.work.read}</a
						>
						<a
							class="btn btn-secondary"
							href={study.otterd_pdf_url}
							data-track="case_pdf_downloaded"
							data-track-slug={study.slug}
							data-track-location="work">{t.work.pdf}</a
						>
					</p>
				</li>
			{/each}
		</ul>

		<p class="more">
			<a href="{OTTERD_URL}{data.locale === 'ja' ? '/ja' : ''}/case-studies" data-track="case_study_opened" data-track-destination="otterd" data-track-location="work_index">otterd.co/case-studies →</a>
		</p>
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

	.studies {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
		gap: var(--spacing-xl);
	}

	.study {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.meta {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	h2 {
		font-size: var(--font-size-2xl);
		line-height: 1.3;
	}

	.body {
		color: var(--color-text-secondary);
	}

	.result {
		padding: var(--spacing-md);
		border-left: 3px solid var(--color-success);
		background: var(--color-bg-tertiary);
		color: var(--color-text-primary);
		font-size: var(--font-size-sm);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		margin-top: auto;
	}

	.more {
		margin-top: var(--spacing-2xl);
		font-size: var(--font-size-sm);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>
