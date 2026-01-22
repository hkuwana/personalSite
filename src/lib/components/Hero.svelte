<script>
	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/hkuwana', icon: 'github' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/hkuwana', icon: 'linkedin' },
		{ name: 'Email', url: 'mailto:hello@hkuwana.com', icon: 'email' }
	];
</script>

<section class="hero" class:mounted>
	<div class="hero-bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-overlay"></div>
	</div>

	<div class="hero-container">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="status-dot"></span>
				Available for new projects
			</div>

			<h1 class="hero-title">
				<span class="line">Hi, I'm</span>
				<span class="name">Hiroyuki Kuwana</span>
			</h1>

			<p class="hero-subtitle">
				Full Stack Developer crafting <em>elegant solutions</em> with modern web technologies.
				I transform complex problems into intuitive, performant applications.
			</p>

			<div class="hero-cta">
				<a href="#projects" class="btn btn-primary">
					View My Work
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M7 17L17 7M17 7H7M17 7V17"/>
					</svg>
				</a>
				<a href="#contact" class="btn btn-secondary">
					Get in Touch
				</a>
			</div>

			<div class="hero-social">
				{#each socialLinks as link}
					<a href={link.url} class="social-link" target="_blank" rel="noopener noreferrer" aria-label={link.name}>
						{#if link.icon === 'github'}
							<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
							</svg>
						{:else if link.icon === 'linkedin'}
							<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						{:else if link.icon === 'email'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
								<polyline points="22,6 12,13 2,6"/>
							</svg>
						{/if}
					</a>
				{/each}
			</div>
		</div>

		<div class="hero-image">
			<div class="image-wrapper">
				<img src="/images/selfPortrait.jpeg" alt="Hiroyuki Kuwana" />
				<div class="image-border"></div>
			</div>
			<div class="floating-card card-1">
				<span class="card-icon">🎓</span>
				<span class="card-text">Brown '21</span>
			</div>
			<div class="floating-card card-2">
				<span class="card-icon">💻</span>
				<span class="card-text">5+ Projects</span>
			</div>
		</div>
	</div>

	<a href="#about" class="scroll-indicator" aria-label="Scroll to about section">
		<div class="mouse">
			<div class="wheel"></div>
		</div>
		<span>Scroll</span>
	</a>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding-top: var(--nav-height);
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: var(--color-accent);
		top: -200px;
		right: -100px;
		opacity: 0.15;
		animation: float 8s ease-in-out infinite;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: #8b5cf6;
		bottom: -100px;
		left: -100px;
		opacity: 0.1;
		animation: float 10s ease-in-out infinite reverse;
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--color-border) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
		background-size: 60px 60px;
		opacity: 0.3;
		mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
	}

	.hero-container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 var(--spacing-xl);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4xl);
		align-items: center;
		position: relative;
		z-index: 1;
	}

	.hero-content {
		opacity: 0;
		transform: translateX(-30px);
	}

	.hero.mounted .hero-content {
		animation: slideInLeft 0.8s ease forwards;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: var(--color-success);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.hero-title {
		font-size: var(--font-size-6xl);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: var(--spacing-lg);
	}

	.hero-title .line {
		display: block;
		color: var(--color-text-secondary);
		font-size: var(--font-size-2xl);
		font-weight: 400;
		margin-bottom: var(--spacing-sm);
	}

	.hero-title .name {
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-xl);
		max-width: 500px;
	}

	.hero-subtitle em {
		color: var(--color-accent-light);
		font-style: normal;
	}

	.hero-cta {
		display: flex;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-2xl);
	}

	.hero-social {
		display: flex;
		gap: var(--spacing-md);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		transition: all var(--transition-base);
	}

	.social-link:hover {
		background: var(--color-bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent-light);
		transform: translateY(-2px);
	}

	.hero-image {
		position: relative;
		opacity: 0;
		transform: translateX(30px);
	}

	.hero.mounted .hero-image {
		animation: slideInRight 0.8s ease forwards;
		animation-delay: 0.2s;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
	}

	.image-wrapper img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-2xl);
		position: relative;
		z-index: 1;
	}

	.image-border {
		position: absolute;
		inset: -8px;
		border: 2px solid var(--color-accent);
		border-radius: calc(var(--radius-2xl) + 8px);
		opacity: 0.5;
	}

	.floating-card {
		position: absolute;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		animation: float 4s ease-in-out infinite;
	}

	.card-1 {
		top: 10%;
		left: -20px;
		animation-delay: 0s;
	}

	.card-2 {
		bottom: 15%;
		right: -20px;
		animation-delay: 2s;
	}

	.card-icon {
		font-size: var(--font-size-lg);
	}

	.card-text {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.scroll-indicator {
		position: absolute;
		bottom: var(--spacing-xl);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
		text-decoration: none;
		opacity: 0;
		animation: fadeIn 1s ease forwards;
		animation-delay: 1s;
	}

	.mouse {
		width: 24px;
		height: 38px;
		border: 2px solid var(--color-text-muted);
		border-radius: 12px;
		position: relative;
	}

	.wheel {
		width: 4px;
		height: 8px;
		background: var(--color-text-muted);
		border-radius: 2px;
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%);
		animation: scrollWheel 2s ease-in-out infinite;
	}

	@keyframes scrollWheel {
		0%, 100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
		50% {
			opacity: 0.3;
			transform: translateX(-50%) translateY(8px);
		}
	}

	@media (max-width: 968px) {
		.hero-container {
			grid-template-columns: 1fr;
			text-align: center;
			gap: var(--spacing-2xl);
		}

		.hero-content {
			order: 1;
		}

		.hero-image {
			order: 0;
		}

		.hero-subtitle {
			margin-left: auto;
			margin-right: auto;
		}

		.hero-cta {
			justify-content: center;
		}

		.hero-social {
			justify-content: center;
		}

		.image-wrapper {
			max-width: 280px;
		}

		.floating-card {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: var(--font-size-4xl);
		}

		.hero-cta {
			flex-direction: column;
		}

		.scroll-indicator {
			display: none;
		}
	}
</style>
