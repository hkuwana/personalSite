<script>
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'About', href: '#about' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 50;
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
		<a href="/" class="logo">
			<span class="logo-text">HK</span>
			<span class="logo-dot"></span>
		</a>

		<div class="nav-links desktop">
			{#each navItems as item}
				<a href={item.href} class="nav-link">{item.label}</a>
			{/each}
			<a href="#contact" class="btn btn-primary nav-cta">Let's Talk</a>
		</div>

		<button class="mobile-toggle" onclick={toggleMobileMenu} aria-label="Toggle menu">
			<span class="hamburger" class:open={mobileMenuOpen}>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="mobile-menu" class:open={mobileMenuOpen}>
			<div class="mobile-menu-content">
				{#each navItems as item, i}
					<a
						href={item.href}
						class="mobile-nav-link"
						onclick={closeMobileMenu}
						style="animation-delay: {i * 0.1}s"
					>
						{item.label}
					</a>
				{/each}
				<a href="#contact" class="btn btn-primary mobile-cta" onclick={closeMobileMenu}>
					Let's Talk
				</a>
			</div>
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
		padding: var(--spacing-md) 0;
		transition: all var(--transition-base);
		background: transparent;
	}

	.nav.scrolled {
		background: rgba(10, 10, 15, 0.9);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--color-border);
		padding: var(--spacing-sm) 0;
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
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		font-size: var(--font-size-xl);
		font-weight: 700;
		color: var(--color-text-primary);
		text-decoration: none;
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
		animation: pulse 2s infinite;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--spacing-xl);
	}

	.nav-link {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		font-weight: 500;
		transition: color var(--transition-fast);
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient-accent);
		transition: width var(--transition-base);
	}

	.nav-link:hover {
		color: var(--color-text-primary);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-cta {
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: var(--font-size-sm);
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
		gap: 5px;
		width: 24px;
	}

	.hamburger span {
		display: block;
		width: 100%;
		height: 2px;
		background: var(--color-text-primary);
		transition: all var(--transition-base);
		transform-origin: center;
	}

	.hamburger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	.mobile-menu {
		position: fixed;
		top: var(--nav-height);
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--color-bg-primary);
		z-index: 999;
		opacity: 0;
		animation: fadeIn 0.3s forwards;
	}

	.mobile-menu-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: var(--spacing-xl);
	}

	.mobile-nav-link {
		font-size: var(--font-size-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
		opacity: 0;
		animation: fadeInUp 0.5s forwards;
	}

	.mobile-cta {
		margin-top: var(--spacing-lg);
		opacity: 0;
		animation: fadeInUp 0.5s forwards;
		animation-delay: 0.4s;
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 0 var(--spacing-md);
		}

		.desktop {
			display: none;
		}

		.mobile-toggle {
			display: block;
		}
	}
</style>
