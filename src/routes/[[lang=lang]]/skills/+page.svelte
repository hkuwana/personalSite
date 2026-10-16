<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { localize } from '$lib/i18n';

	let { data } = $props();
	const t = $derived(data.t);
</script>

<Seo title="{t.skills.label} | {t.name}" description={t.skills.metaDescription} locale={data.locale} />

<section class="page">
	<div class="container">
		<header class="intro">
			<span class="section-label">{t.skills.label}</span>
			<h1>{t.skills.title}</h1>
			<p>{t.skills.intro}</p>
		</header>

		{#if data.skills.length === 0}
			<p class="empty">{t.skills.empty}</p>
		{:else}
			<ul class="grid" role="list">
				{#each data.skills as skill (skill.slug)}
					<li class="card skill">
						<p class="meta">{t.skills.version} {skill.version}</p>
						<h2>
							<a
								href={localize(`/skills/${skill.slug}`, data.locale)}
								data-track="cta_clicked"
								data-track-cta_id="skill"
								data-track-skill={skill.slug}
								data-track-location="index">{skill.title}</a
							>
						</h2>
						<p class="summary">{skill.summary}</p>
					</li>
				{/each}
			</ul>
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
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
		gap: var(--spacing-xl);
	}

	.skill {
		position: relative;
	}

	.meta {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-sm);
	}

	h2 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-sm);
	}

	h2 a {
		color: var(--color-text-primary);
	}

	h2 a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.skill:hover h2 a {
		color: var(--color-accent-light);
	}

	.summary {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
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
