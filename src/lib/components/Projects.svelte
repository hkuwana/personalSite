<script>
	const projects = [
		{
			title: 'Personal Portfolio',
			description: 'A modern, animated personal website built with SvelteKit 5. Features smooth animations, dark theme, and a blog section.',
			tags: ['SvelteKit', 'TypeScript', 'CSS'],
			image: '/images/project-portfolio.jpg',
			liveUrl: '#',
			githubUrl: 'https://github.com/hkuwana/personalSite',
			featured: true
		},
		{
			title: 'Task Management App',
			description: 'A collaborative task management application with real-time updates, team workspaces, and progress tracking.',
			tags: ['Vue.js', 'Firebase', 'Node.js'],
			image: '/images/project-tasks.jpg',
			liveUrl: '#',
			githubUrl: '#',
			featured: true
		},
		{
			title: 'E-Commerce Platform',
			description: 'Full-stack e-commerce solution with product management, cart functionality, and secure payment processing.',
			tags: ['React', 'Python', 'PostgreSQL'],
			image: '/images/project-ecommerce.jpg',
			liveUrl: '#',
			githubUrl: '#',
			featured: false
		},
		{
			title: 'Weather Dashboard',
			description: 'Real-time weather application with location-based forecasts, interactive maps, and weather alerts.',
			tags: ['Svelte', 'REST API', 'Charts'],
			image: '/images/project-weather.jpg',
			liveUrl: '#',
			githubUrl: '#',
			featured: false
		}
	];

	let filter = $state('all');

	const filteredProjects = $derived(
		filter === 'all' ? projects : projects.filter(p => p.featured)
	);
</script>

<section id="projects" class="projects section">
	<div class="container">
		<div class="projects-header">
			<span class="section-label">My Work</span>
			<h2 class="section-title">Featured Projects</h2>
			<p class="section-subtitle">
				A selection of projects that showcase my skills in full-stack development,
				from concept to deployment.
			</p>
		</div>

		<div class="projects-filter">
			<button
				class="filter-btn"
				class:active={filter === 'all'}
				onclick={() => filter = 'all'}
			>
				All Projects
			</button>
			<button
				class="filter-btn"
				class:active={filter === 'featured'}
				onclick={() => filter = 'featured'}
			>
				Featured
			</button>
		</div>

		<div class="projects-grid">
			{#each filteredProjects as project, i}
				<article class="project-card card" style="animation-delay: {i * 0.1}s">
					<div class="project-image">
						<div class="image-placeholder">
							<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
								<circle cx="8.5" cy="8.5" r="1.5"/>
								<polyline points="21 15 16 10 5 21"/>
							</svg>
						</div>
						<div class="project-overlay">
							<a href={project.liveUrl} class="overlay-btn" aria-label="View live project">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
									<polyline points="15 3 21 3 21 9"/>
									<line x1="10" y1="14" x2="21" y2="3"/>
								</svg>
							</a>
							<a href={project.githubUrl} class="overlay-btn" aria-label="View source code">
								<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
									<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
								</svg>
							</a>
						</div>
					</div>

					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>
						<div class="project-tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="projects-cta">
			<a href="https://github.com/hkuwana" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
				<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				View All on GitHub
			</a>
		</div>
	</div>
</section>

<style>
	.projects {
		position: relative;
	}

	.projects-header {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
	}

	.section-label {
		display: inline-block;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-accent-light);
		margin-bottom: var(--spacing-lg);
	}

	.projects-header .section-title {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.projects-header .section-subtitle {
		max-width: 600px;
		margin: 0 auto;
	}

	.projects-filter {
		display: flex;
		justify-content: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-2xl);
	}

	.filter-btn {
		padding: var(--spacing-sm) var(--spacing-lg);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.filter-btn:hover {
		border-color: var(--color-border-light);
		color: var(--color-text-primary);
	}

	.filter-btn.active {
		background: var(--gradient-accent);
		border-color: transparent;
		color: white;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-2xl);
	}

	.project-card {
		padding: 0;
		overflow: hidden;
		animation: fadeInUp 0.6s ease forwards;
		opacity: 0;
	}

	.project-image {
		position: relative;
		aspect-ratio: 16 / 10;
		background: var(--color-bg-tertiary);
		overflow: hidden;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
	}

	.project-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.project-card:hover .project-overlay {
		opacity: 1;
	}

	.overlay-btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-card);
		border-radius: var(--radius-lg);
		color: var(--color-text-primary);
		transition: all var(--transition-base);
		transform: translateY(10px);
	}

	.project-card:hover .overlay-btn {
		transform: translateY(0);
	}

	.overlay-btn:hover {
		background: var(--color-accent);
		color: white;
	}

	.project-content {
		padding: var(--spacing-lg);
	}

	.project-title {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-sm);
	}

	.project-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-md);
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--color-accent-light);
		font-family: var(--font-mono);
	}

	.projects-cta {
		text-align: center;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.projects-header .section-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
