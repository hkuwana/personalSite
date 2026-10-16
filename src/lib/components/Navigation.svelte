<script lang="ts">
	import { page } from '$app/state';
	import { alternatePath, localize, type Dictionary, type Locale } from '$lib/i18n';

	let { locale, t }: { locale: Locale; t: Dictionary } = $props();

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const sections = ['diagnostics', 'method', 'skills', 'work', 'about'] as const;
	const navItems = $derived(
		sections.map((id) => ({ id, label: t.nav[id], href: localize(`/${id}`, locale) }))
	);

	const otherLocale = $derived<Locale>(locale === 'en' ? 'ja' : 'en');
	const switchHref = $derived(alternatePath(page.url.pathname, otherLocale));

	function isActive(href: string) {
		const path = page.url.pathname;
		return path === href || path.startsWith(`${href}/`);
	}

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
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="nav" class:scrolled aria-label={t.nav.menu}>
	<div class="nav-container">
		<a href={localize('/', locale)} class="logo" aria-label={t.nav.home}>
			<span class="logo-text">HK</span>
			<span class="logo-dot"></span>
		</a>

		<div class="nav-links desktop">
			{#each navItems as item}
				<a
					href={item.href}
					class="nav-link"
					aria-current={isActive(item.href) ? 'page' : undefined}
					data-track="nav_clicked"
					data-track-item={item.id}
				>
					{item.label}
				</a>
			{/each}
			<a
				href={switchHref}
				class="lang-switch"
				hreflang={otherLocale}
				lang={otherLocale}
				aria-label={t.nav.switchLabel}
				data-sveltekit-noscroll
				data-track="language_switched"
				data-track-from={locale}
				data-track-to={otherLocale}
			>
				{t.nav.switch}
			</a>
		</div>

		<button
			class="mobile-toggle"
			onclick={toggleMobileMenu}
			aria-label={t.nav.menu}
			aria-expanded={mobileMenuOpen}
		>
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
						aria-current={isActive(item.href) ? 'page' : undefined}
						onclick={closeMobileMenu}
						style="animation-delay: {i * 0.1}s"
						data-track="nav_clicked"
						data-track-item={item.id}
					>
						{item.label}
					</a>
				{/each}
				<a
					href={switchHref}
					class="lang-switch mobile-lang"
					hreflang={otherLocale}
					lang={otherLocale}
					aria-label={t.nav.switchLabel}
					onclick={closeMobileMenu}
					data-track="language_switched"
					data-track-from={locale}
					data-track-to={otherLocale}
				>
					{t.nav.switch}
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

	.nav-link[aria-current='page'] {
		color: var(--color-text-primary);
	}

	.nav-link[aria-current='page']::after {
		width: 100%;
	}

	.lang-switch {
		padding: var(--spacing-xs) var(--spacing-md);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
	}

	.lang-switch:hover {
		border-color: var(--color-accent);
		color: var(--color-text-primary);
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

	.mobile-lang {
		margin-top: var(--spacing-lg);
		font-size: var(--font-size-base);
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
