<script lang="ts">
	import { onMount } from 'svelte';
	import { capture } from '$lib/analytics';
	import ContactButton from '$lib/components/ContactButton.svelte';
	import DiagnosticVideo from '$lib/components/DiagnosticVideo.svelte';
	import PromptBlock from '$lib/components/PromptBlock.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Verdict from '$lib/components/Verdict.svelte';
	import { formatDate } from '$lib/format';
	import { localize } from '$lib/i18n';
	import { OTTERD_URL } from '$lib/site';

	let { data } = $props();
	const t = $derived(data.t);
	const d = $derived(data.diagnostic);
	const ja = $derived(data.locale === 'ja');
	const name = $derived(ja ? d.company.name_ja : d.company.name);
	const otherName = $derived(ja ? d.company.name : d.company.name_ja);
	const subject = $derived(`${t.diagnostics.subjectPrefix}: ${name} (${d.slug})`);
	const otterdCase = $derived(
		d.otterd_case ? `${OTTERD_URL}${ja ? '/ja' : ''}/case-studies/${d.otterd_case}` : null
	);

	onMount(() => capture('diagnostic_opened', { slug: d.slug, company: d.company.name }));
</script>

<Seo title="{d.title} | {t.name}" description={d.excerpt || d.verdict.pays_off} locale={data.locale} type="article" />

<article class="page diagnostic">
	<div class="container">
		<header class="head">
			<p class="crumb">
				<a href={localize('/diagnostics', data.locale)}>{t.diagnostics.label}</a>
				<span aria-hidden="true">/</span>
				<time datetime={d.date}>{formatDate(d.date, data.locale)}</time>
			</p>
			<h1>
				{name}
				<span class="alt" lang={ja ? 'en' : 'ja'}>{otherName}</span>
			</h1>
			<p class="facts">
				<span>{t.diagnostics.ticker} {d.company.ticker}</span>
				<span>{d.company.sector}</span>
				<span>{d.company.revenue_band}</span>
			</p>
			<p class="outside">{t.diagnostics.outsideLabel}</p>
		</header>

		<section class="verdict" aria-labelledby="verdict-heading">
			<h2 id="verdict-heading" class="visually-hidden">{t.diagnostics.verdict}</h2>
			<Verdict verdict={d.verdict} {t} />
		</section>

		{#if d.video}
			<section class="block">
				<DiagnosticVideo
					url={d.video.url}
					durationS={d.video.duration_s}
					slug={d.slug}
					label={t.diagnostics.video}
					minutesLabel={t.diagnostics.videoDuration}
				/>
			</section>
		{/if}

		<section class="block" aria-labelledby="memo-heading">
			<h2 id="memo-heading" class="block-title">{t.diagnostics.memo}</h2>
			<div class="prose">{@html d.html}</div>
		</section>

		{#if d.prompts.length > 0}
			<section class="block" aria-labelledby="method-heading">
				<h2 id="method-heading" class="block-title">{t.diagnostics.method}</h2>
				<p class="lead">{t.diagnostics.methodIntro}</p>
				<div class="prompts">
					{#each d.prompts as prompt (prompt.id)}
						<PromptBlock
							id={prompt.id}
							title={prompt.title}
							text={prompt.text}
							slug={d.slug}
							copyLabel={t.diagnostics.copy}
							copiedLabel={t.diagnostics.copied}
						/>
					{/each}
				</div>
				{#if data.skills.length > 0}
					<p class="skills">
						{t.diagnostics.usedSkill}:
						{#each data.skills as skill, i (skill.slug)}
							{#if i > 0}, {/if}<a href={localize(`/skills/${skill.slug}`, data.locale)}>{skill.title}</a>
						{/each}
					</p>
				{/if}
			</section>
		{/if}

		<section class="block" aria-labelledby="sources-heading">
			<h2 id="sources-heading" class="block-title">{t.diagnostics.sources}</h2>
			<ol class="sources">
				{#each d.sources as source}
					<li>
						<a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
						<span class="date">{source.date}</span>
					</li>
				{/each}
			</ol>
		</section>

		{#if d.pdf}
			<section class="block">
				<a
					class="btn btn-secondary"
					href={d.pdf}
					download="{d.slug}-{data.locale}.pdf"
					data-track="diagnostic_pdf_downloaded"
					data-track-slug={d.slug}>{t.diagnostics.pdf}</a
				>
			</section>
		{/if}

		<section class="cta">
			<p>{t.diagnostics.ctaBody}</p>
			<ContactButton
				encoded={data.contact}
				label={t.diagnostics.ctaButton}
				{subject}
				location="diagnostic_cta"
				slug={d.slug}
			/>
			{#if otterdCase}
				<a
					class="otterd"
					href={otterdCase}
					data-track="case_study_opened"
					data-track-destination="otterd"
					data-track-slug={d.otterd_case}
					data-track-location="diagnostic">{t.diagnostics.otterdLink} →</a
				>
			{/if}
		</section>

		<footer class="notes">
			<p>
				{t.diagnostics.correction}
				<ContactButton
					encoded={data.contact}
					label={t.diagnostics.correctionButton}
					subject="{t.diagnostics.correctionButton}: {d.slug}"
					location="diagnostic_correction"
					slug={d.slug}
					variant="secondary"
				/>
			</p>
			<p class="advice">{t.diagnostics.notAdvice}</p>
		</footer>
	</div>
</article>

<style>
	.container {
		max-width: 780px;
	}

	.crumb {
		display: flex;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
	}

	.crumb a {
		color: var(--color-text-secondary);
	}

	h1 {
		font-size: var(--font-size-4xl);
		line-height: 1.2;
	}

	.alt {
		display: block;
		margin-top: var(--spacing-xs);
		font-size: var(--font-size-xl);
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs) var(--spacing-md);
		margin-top: var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.outside {
		margin-top: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		border-left: 3px solid var(--color-warning);
		background: var(--color-bg-secondary);
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
	}

	.verdict {
		margin-top: var(--spacing-lg);
	}

	.block {
		margin-top: var(--spacing-3xl);
	}

	.block-title {
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-lg);
	}

	:global(:lang(ja)) .block-title {
		text-transform: none;
		letter-spacing: 0.04em;
	}

	.lead {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.prompts {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.skills {
		margin-top: var(--spacing-md);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.sources {
		padding-left: var(--spacing-xl);
		color: var(--color-text-secondary);
	}

	.sources li {
		margin-bottom: var(--spacing-sm);
	}

	.sources .date {
		margin-left: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.cta {
		margin-top: var(--spacing-3xl);
		padding: var(--spacing-xl);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-xl);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-lg);
	}

	.cta p {
		font-size: var(--font-size-lg);
		color: var(--color-text-primary);
	}

	.otterd {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.notes {
		margin-top: var(--spacing-2xl);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.notes p {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-md);
	}

	.advice {
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}

		.alt {
			font-size: var(--font-size-lg);
		}

		.cta {
			padding: var(--spacing-lg);
		}
	}
</style>
