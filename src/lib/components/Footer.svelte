<script lang="ts">
	import { localize, type Dictionary, type Locale } from '$lib/i18n';
	import { OTTERD_URL, SOCIAL } from '$lib/site';

	let { locale, t }: { locale: Locale; t: Dictionary } = $props();

	const currentYear = new Date().getFullYear();

	const sections = ['diagnostics', 'method', 'skills', 'work', 'about'] as const;
	const footerLinks = $derived([
		...sections.map((id) => ({ label: t.nav[id], href: localize(`/${id}`, locale) })),
		{ label: t.footer.contact, href: localize('/about#contact', locale) }
	]);

	const socialLinks = [
		{ name: 'LinkedIn', url: SOCIAL.linkedin, track: 'linkedin_clicked' },
		{ name: 'GitHub', url: SOCIAL.github, track: undefined }
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<a href={localize('/', locale)} class="logo" aria-label={t.nav.home}>
					<span class="logo-text">HK</span>
					<span class="logo-dot"></span>
				</a>
				<p class="tagline">{t.footer.tagline}</p>
				<a
					class="otterd"
					href="{OTTERD_URL}{locale === 'ja' ? '/ja' : ''}"
					data-track="cta_clicked"
					data-track-cta_id="otterd"
					data-track-location="footer"
				>
					<span class="wordmark">Otterd</span>
					<span>{t.footer.otterdLink} →</span>
				</a>
			</div>

			<div class="footer-links">
				<h4>{t.nav.menu}</h4>
				<nav>
					{#each footerLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</nav>
			</div>

			<div class="footer-social">
				<h4>{t.footer.connect}</h4>
				<nav>
					{#each socialLinks as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							data-track={link.track}
							data-track-location="footer">{link.name}</a
						>
					{/each}
				</nav>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} {t.name}</p>
			<p class="disclaimer">{t.footer.disclaimer}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-bg-secondary);
		padding: var(--spacing-3xl) 0 var(--spacing-xl);
		border-top: 1px solid var(--color-border);
	}

	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: var(--spacing-3xl);
		margin-bottom: var(--spacing-2xl);
	}

	.footer-brand .logo {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		text-decoration: none;
		margin-bottom: var(--spacing-md);
	}

	.logo-text {
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.logo-dot {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 50%;
	}

	.tagline {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		max-width: 300px;
	}

	.otterd {
		display: inline-flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-lg);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	.otterd:hover {
		color: var(--color-accent-light);
	}

	.wordmark {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: var(--font-size-lg);
		color: var(--color-text-primary);
	}

	.footer-links h4,
	.footer-social h4 {
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-md);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.footer-links nav,
	.footer-social nav {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.footer-links a,
	.footer-social a {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		transition: color var(--transition-fast);
	}

	.footer-links a:hover,
	.footer-social a:hover {
		color: var(--color-accent-light);
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-border);
	}

	.footer-bottom p {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.disclaimer {
		max-width: 40ch;
		text-align: right;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr 1fr;
			gap: var(--spacing-xl);
		}

		.footer-brand {
			grid-column: 1 / -1;
		}

		.footer-bottom {
			flex-direction: column;
			gap: var(--spacing-md);
			text-align: center;
		}

		.disclaimer {
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.footer-content {
			grid-template-columns: 1fr;
		}
	}
</style>
