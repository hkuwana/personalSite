<script>
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'About', href: '#about' },
		{ label: 'Work', href: '#projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<nav class="nav" class:scrolled>
	<div class="nav-container">
		<a href="/" class="logo">Hiroyuki Kuwana</a>

		<div class="nav-links desktop">
			{#each navItems as item}
				<a href={item.href} class="nav-link">{item.label}</a>
			{/each}
		</div>

		<button class="mobile-toggle" onclick={toggleMobileMenu} aria-label="Toggle menu">
			<span class="hamburger" class:open={mobileMenuOpen}>
				<span></span>
				<span></span>
			</span>
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="mobile-menu">
			{#each navItems as item}
				<a href={item.href} class="mobile-nav-link" onclick={closeMobileMenu}>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: var(--spacing-lg) 0;
		transition: all var(--transition-base);
		background: var(--color-bg);
	}

	.nav.scrolled {
		padding: var(--spacing-md) 0;
		box-shadow: var(--shadow-sm);
	}

	.nav-container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 var(--spacing-xl);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-size: var(--font-size-base);
		font-weight: 600;
		color: var(--color-text);
		letter-spacing: -0.01em;
	}

	.logo:hover {
		color: var(--color-text);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--spacing-2xl);
	}

	.nav-link {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		transition: color var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-text);
	}

	.mobile-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--spacing-sm);
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 20px;
	}

	.hamburger span {
		display: block;
		width: 100%;
		height: 1.5px;
		background: var(--color-text);
		transition: all var(--transition-base);
	}

	.hamburger.open span:first-child {
		transform: translateY(3.75px) rotate(45deg);
	}

	.hamburger.open span:last-child {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	.mobile-menu {
		position: fixed;
		top: var(--nav-height);
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--color-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xl);
	}

	.mobile-nav-link {
		font-size: var(--font-size-xl);
		color: var(--color-text);
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 0 var(--spacing-lg);
		}

		.desktop {
			display: none;
		}

		.mobile-toggle {
			display: block;
		}
	}
</style>
