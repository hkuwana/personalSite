<script>
	const skills = [
		{
			category: 'Frontend',
			items: ['Svelte/SvelteKit', 'Vue.js', 'React', 'TypeScript', 'HTML/CSS', 'Tailwind']
		},
		{
			category: 'Backend',
			items: ['Python', 'Node.js', 'Firebase', 'PostgreSQL', 'REST APIs', 'GraphQL']
		},
		{
			category: 'Tools',
			items: ['Git', 'Docker', 'VS Code', 'Figma', 'Linux', 'CI/CD']
		}
	];

	const stats = [
		{ value: '5+', label: 'Projects Completed' },
		{ value: '3+', label: 'Years Experience' },
		{ value: '100%', label: 'Client Satisfaction' }
	];
</script>

<section id="about" class="about section">
	<div class="container">
		<div class="about-header">
			<span class="section-label">About Me</span>
			<h2 class="section-title">Passionate Developer,<br/>Creative Problem Solver</h2>
			<p class="section-subtitle">
				I believe in building software that makes a difference — combining technical excellence
				with user-centered design.
			</p>
		</div>

		<div class="about-grid">
			<div class="about-story card">
				<h3>My Journey</h3>
				<p>
					I'm a Brown University graduate ('21) who discovered my passion for web development
					during a time when the world was changing rapidly. What started as curiosity about
					how websites work evolved into a deep commitment to crafting exceptional digital experiences.
				</p>
				<p>
					I approach every project with compassion and understanding, believing that the best
					solutions come from truly understanding the people who will use them. My philosophy
					is simple: technology should empower, not complicate.
				</p>
				<p>
					When I'm not coding, you'll find me exploring new technologies, contributing to
					open-source projects, or enjoying the outdoors. I'm always eager to learn and
					take on new challenges.
				</p>
			</div>

			<div class="about-skills">
				<h3>Technical Skills</h3>
				<div class="skills-grid">
					{#each skills as skillGroup}
						<div class="skill-group card">
							<h4>{skillGroup.category}</h4>
							<ul class="skill-list">
								{#each skillGroup.items as skill}
									<li class="skill-item">{skill}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="about-stats">
			{#each stats as stat}
				<div class="stat-item">
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
				</div>
			{/each}
		</div>

		<div class="about-cta">
			<a href="/resume.pdf" class="btn btn-secondary" target="_blank">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
					<polyline points="14 2 14 8 20 8"/>
					<line x1="16" y1="13" x2="8" y2="13"/>
					<line x1="16" y1="17" x2="8" y2="17"/>
					<polyline points="10 9 9 9 8 9"/>
				</svg>
				Download Resume
			</a>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--color-bg-secondary);
		position: relative;
	}

	.about::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-border), transparent);
	}

	.about-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
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

	.about-header .section-title {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.about-header .section-subtitle {
		max-width: 600px;
		margin: 0 auto;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-2xl);
		margin-bottom: var(--spacing-3xl);
	}

	.about-story h3,
	.about-skills h3 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-lg);
		color: var(--color-text-primary);
	}

	.about-story p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-md);
		line-height: 1.8;
	}

	.about-story p:last-child {
		margin-bottom: 0;
	}

	.skills-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.skill-group {
		padding: var(--spacing-lg);
	}

	.skill-group h4 {
		font-size: var(--font-size-sm);
		color: var(--color-accent-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--spacing-md);
	}

	.skill-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		list-style: none;
	}

	.skill-item {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		transition: all var(--transition-fast);
	}

	.skill-item:hover {
		background: var(--color-accent);
		color: white;
	}

	.about-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-xl);
		padding: var(--spacing-2xl);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		margin-bottom: var(--spacing-2xl);
		text-align: center;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.stat-value {
		font-size: var(--font-size-4xl);
		font-weight: 700;
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.about-cta {
		text-align: center;
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-stats {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.about-header .section-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
