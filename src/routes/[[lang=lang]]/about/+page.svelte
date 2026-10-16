<script lang="ts">
	import ContactButton from '$lib/components/ContactButton.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { OTTERD_URL, SOCIAL } from '$lib/site';

	let { data } = $props();
	const t = $derived(data.t);
</script>

<Seo title="{t.about.label} | {t.name}" description={t.about.metaDescription} locale={data.locale} />

<section class="page">
	<div class="container">
		<div class="layout">
			<img src="/images/selfPortrait.jpeg" alt={t.name} width="240" height="240" class="portrait" />
			<div>
				<span class="section-label">{t.about.label}</span>
				<h1>{t.about.title}</h1>
				<div class="bio">
					{#each t.about.paragraphs as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
				<p class="otterd">
					<a
						href="{OTTERD_URL}{data.locale === 'ja' ? '/ja' : ''}"
						data-track="cta_clicked"
						data-track-cta_id="otterd"
						data-track-location="about">{t.about.otterd} →</a
					>
				</p>
			</div>
		</div>

		<section id="contact" class="contact" aria-labelledby="contact-heading">
			<h2 id="contact-heading">{t.about.contactTitle}</h2>
			<p>{t.about.contactBody}</p>
			<div class="actions">
				<ContactButton encoded={data.contact} label={t.about.contactButton} location="about" />
				<a
					class="btn btn-secondary"
					href={SOCIAL.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					data-track="linkedin_clicked"
					data-track-location="about">LinkedIn</a
				>
			</div>
		</section>
	</div>
</section>

<style>
	.container {
		max-width: 860px;
	}

	.layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: var(--spacing-2xl);
		align-items: start;
	}

	.portrait {
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-xl);
	}

	h1 {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.bio p {
		color: var(--color-text-secondary);
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-md);
	}

	.otterd {
		margin-top: var(--spacing-lg);
	}

	.contact {
		margin-top: var(--spacing-3xl);
		padding: var(--spacing-xl);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-xl);
		scroll-margin-top: calc(var(--nav-height) + var(--spacing-lg));
	}

	.contact h2 {
		font-size: var(--font-size-2xl);
		margin-bottom: var(--spacing-sm);
	}

	.contact p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	@media (max-width: 640px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.portrait {
			max-width: 160px;
		}

		h1 {
			font-size: var(--font-size-3xl);
		}

		.contact {
			padding: var(--spacing-lg);
		}
	}
</style>
