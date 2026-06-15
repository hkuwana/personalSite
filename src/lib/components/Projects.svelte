<script>
	const projects = [
		{
			title: 'Personal Portfolio',
			description: 'A minimal personal website built with SvelteKit 5 and a focus on typography and simplicity.',
			tags: ['SvelteKit', 'TypeScript', 'CSS'],
			url: 'https://github.com/hkuwana/personalSite'
		},
		{
			title: 'Task Management App',
			description: 'Collaborative task management with real-time updates and team workspaces.',
			tags: ['Vue.js', 'Firebase', 'Node.js'],
			url: '#'
		},
		{
			title: 'E-Commerce Platform',
			description: 'Full-stack e-commerce solution with product management and secure payments.',
			tags: ['React', 'Python', 'PostgreSQL'],
			url: '#'
		},
		{
			title: 'Weather Dashboard',
			description: 'Real-time weather with location-based forecasts and interactive maps.',
			tags: ['Svelte', 'REST API', 'Charts'],
			url: '#'
		}
	];
</script>

<section id="projects" class="projects section">
	<div class="container">
		<header class="projects-header">
			<h2 class="section-title">Selected Work</h2>
			<p class="section-subtitle">
				Things I shipped end-to-end. Each solves a real problem.
			</p>
		</header>

		<div class="projects-grid">
			{#each projects as project}
				<a href={project.url} class="project-card" target="_blank" rel="noopener noreferrer">
					<div class="project-number">{String(projects.indexOf(project) + 1).padStart(2, '0')}</div>
					<h3 class="project-title">{project.title}</h3>
					<p class="project-description">{project.description}</p>
					<div class="project-tags">
						{#each project.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</a>
			{/each}
		</div>

		<div class="projects-cta">
			<a href="https://github.com/hkuwana" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
				View All on GitHub
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M7 17L17 7M17 7H7M17 7V17"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.projects-header {
		margin-bottom: var(--spacing-3xl);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-3xl);
	}

	.project-card {
		display: block;
		padding: var(--spacing-xl);
		background: white;
		border: 1px solid var(--color-border-subtle);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
		text-decoration: none;
	}

	.project-card:hover {
		border-color: var(--color-border);
		background: var(--color-bg-subtle);
	}

	.project-number {
		font-size: var(--font-size-xs);
		font-family: var(--font-mono);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-md);
	}

	.project-title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		margin-bottom: var(--spacing-sm);
		color: var(--color-text);
	}

	.project-card:hover .project-title {
		color: var(--color-accent);
	}

	.project-description {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--spacing-lg);
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		font-size: var(--font-size-xs);
		font-family: var(--font-mono);
		color: var(--color-text-muted);
	}

	.projects-cta {
		text-align: center;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
