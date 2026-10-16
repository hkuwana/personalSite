<script lang="ts">
	import { onMount } from 'svelte';
	import { capture } from '$lib/analytics';
	import PromptBlock from '$lib/components/PromptBlock.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { formatDate } from '$lib/format';
	import { localize } from '$lib/i18n';

	let { data } = $props();
	const t = $derived(data.t);
	const k = $derived(data.skill);

	onMount(() => capture('skill_opened', { skill: k.slug }));
</script>

<Seo title="{k.title} | {t.name}" description={k.summary} locale={data.locale} type="article" />

<article class="page">
	<div class="container">
		<header>
			<a href={localize('/skills', data.locale)} class="back">← {t.skills.backToIndex}</a>
			<h1>{k.title}</h1>
			<p class="summary">{k.summary}</p>
			<dl class="facts">
				<div><dt>{t.skills.version}</dt><dd>{k.version}</dd></div>
				{#if k.model_tested.length > 0}
					<div><dt>{t.skills.modelTested}</dt><dd>{k.model_tested.join(', ')}</dd></div>
				{/if}
				<div><dt>{t.skills.license}</dt><dd>{k.license}</dd></div>
			</dl>
		</header>

		<div class="prose">{@html k.html}</div>

		<section class="block" aria-labelledby="file-heading">
			<h2 id="file-heading" class="block-title">{t.skills.file}</h2>
			<PromptBlock
				id="skill"
				title="{k.slug}/skill.md"
				text={k.skill_file}
				slug={k.slug}
				copyLabel={t.diagnostics.copy}
				copiedLabel={t.diagnostics.copied}
				open
			/>
		</section>

		{#if data.usedIn.length > 0}
			<section class="block" aria-labelledby="used-heading">
				<h2 id="used-heading" class="block-title">{t.skills.usedIn}</h2>
				<ul class="links">
					{#each data.usedIn as d (d.slug)}
						<li><a href={localize(`/diagnostics/${d.slug}`, data.locale)}>{d.name}</a></li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if k.changelog.length > 0}
			<section class="block" aria-labelledby="log-heading">
				<h2 id="log-heading" class="block-title">{t.skills.changelog}</h2>
				<ul class="log">
					{#each k.changelog as entry}
						<li><time datetime={entry.date}>{formatDate(entry.date, data.locale)}</time> {entry.note}</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</article>

<style>
	.container {
		max-width: 780px;
	}

	.back {
		display: inline-block;
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-xl);
	}

	h1 {
		font-size: var(--font-size-4xl);
		line-height: 1.2;
		margin-bottom: var(--spacing-md);
	}

	.summary {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md) var(--spacing-xl);
		margin: var(--spacing-lg) 0 var(--spacing-2xl);
		font-size: var(--font-size-sm);
	}

	dt {
		color: var(--color-text-muted);
	}

	dd {
		color: var(--color-text-primary);
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

	.links,
	.log {
		padding-left: var(--spacing-xl);
		color: var(--color-text-secondary);
	}

	.log time {
		color: var(--color-text-muted);
		margin-right: var(--spacing-sm);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: var(--font-size-3xl);
		}
	}
</style>
