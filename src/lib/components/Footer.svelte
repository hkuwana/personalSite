<script>
	const currentYear = new Date().getFullYear();

	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Work', href: '#projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '#contact' }
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<span class="name">Hiroyuki Kuwana</span>
				<span class="tagline">Building products that augment people.</span>
			</div>

			<nav class="footer-nav">
				{#each links as link}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>
		</div>

		<div class="footer-bottom">
			<span>&copy; {currentYear}</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: var(--spacing-3xl) 0 var(--spacing-xl);
		border-top: 1px solid var(--color-border-subtle);
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-2xl);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.name {
		font-weight: 600;
		color: var(--color-text);
	}

	.tagline {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.footer-nav {
		display: flex;
		gap: var(--spacing-xl);
	}

	.footer-nav a {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.footer-nav a:hover {
		color: var(--color-text);
	}

	.footer-bottom {
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-border-subtle);
	}

	.footer-bottom span {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: var(--spacing-xl);
		}

		.footer-nav {
			flex-wrap: wrap;
			gap: var(--spacing-md);
		}
	}
</style>
