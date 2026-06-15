<script>
	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/hkuwana', icon: 'github' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/hkuwana', icon: 'linkedin' },
		{ name: 'Email', url: 'mailto:hello@hkuwana.com', icon: 'email' }
	];
</script>

<section class="hero">
	<div class="hero-container">
		<div class="hero-content">
			<p class="hero-intro">Software Engineer</p>
			<h1 class="hero-title">
				I build products that<br />
				<span class="highlight">augment people</span>,<br />
				not replace them.
			</h1>
			<p class="hero-description">
				TypeScript, Svelte, Python, and LLM systems. I treat the model as a teammate with blind spots—useful for the right work, never for judgment.
			</p>

			<div class="hero-cta">
				<a href="#projects" class="btn btn-primary">View Work</a>
				<a href="#contact" class="btn btn-secondary">Get in Touch</a>
			</div>
		</div>

		<div class="hero-image">
			<img src="/images/selfPortrait.jpeg" alt="Hiroyuki Kuwana" />
		</div>
	</div>

	<div class="hero-social">
		{#each socialLinks as link}
			<a href={link.url} class="social-link" target="_blank" rel="noopener noreferrer" aria-label={link.name}>
				{#if link.icon === 'github'}
					<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
					</svg>
				{:else if link.icon === 'linkedin'}
					<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				{:else if link.icon === 'email'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
						<polyline points="22,6 12,13 2,6"/>
					</svg>
				{/if}
			</a>
		{/each}
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: var(--nav-height);
		padding-bottom: var(--spacing-3xl);
		position: relative;
	}

	.hero-container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 var(--spacing-xl);
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: var(--spacing-4xl);
		align-items: center;
	}

	.hero-intro {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--spacing-lg);
	}

	.hero-title {
		font-size: var(--font-size-5xl);
		font-weight: 600;
		line-height: 1.1;
		margin-bottom: var(--spacing-xl);
		letter-spacing: -0.03em;
	}

	.hero-title .highlight {
		color: var(--color-accent);
	}

	.hero-description {
		font-size: var(--font-size-lg);
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-2xl);
		max-width: 480px;
	}

	.hero-cta {
		display: flex;
		gap: var(--spacing-md);
	}

	.hero-image {
		display: flex;
		justify-content: center;
	}

	.hero-image img {
		width: 100%;
		max-width: 340px;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-lg);
	}

	.hero-social {
		position: absolute;
		bottom: var(--spacing-2xl);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: var(--spacing-lg);
	}

	.social-link {
		color: var(--color-text-muted);
		transition: color var(--transition-fast);
	}

	.social-link:hover {
		color: var(--color-text);
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

		.hero-image img {
			max-width: 240px;
		}

		.hero-description {
			margin-left: auto;
			margin-right: auto;
		}

		.hero-cta {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.hero-cta {
			flex-direction: column;
			align-items: center;
		}

		.hero-social {
			position: static;
			transform: none;
			margin-top: var(--spacing-3xl);
			justify-content: center;
		}
	}
</style>
