<script>
	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '#contact' }
	];

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/hkuwana' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/hkuwana' },
		{ name: 'Twitter', url: 'https://twitter.com/hkuwana' }
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<a href="/" class="logo">
					<span class="logo-text">HK</span>
					<span class="logo-dot"></span>
				</a>
				<p class="tagline">Building elegant solutions with modern web technologies.</p>
			</div>

			<div class="footer-links">
				<h4>Quick Links</h4>
				<nav>
					{#each footerLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</nav>
			</div>

			<div class="footer-social">
				<h4>Connect</h4>
				<nav>
					{#each socialLinks as link}
						<a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
					{/each}
				</nav>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} Hiroyuki Kuwana. All rights reserved.</p>
			<p class="built-with">
				Built with
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="heart">
					<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
				</svg>
				using SvelteKit
			</p>
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

	.built-with {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.heart {
		color: var(--color-error);
		animation: pulse 1.5s ease-in-out infinite;
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
	}

	@media (max-width: 480px) {
		.footer-content {
			grid-template-columns: 1fr;
		}
	}
</style>
