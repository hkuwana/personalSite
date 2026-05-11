<script>
	const skills = [
		{
			category: 'AI & LLMs',
			items: ['Claude / GPT', 'RAG pipelines', 'Tool-use agents', 'Evals', 'Prompt design', 'Streaming UX']
		},
		{
			category: 'TypeScript & Svelte',
			items: ['SvelteKit 5', 'TypeScript', 'Vite', 'Tailwind']
		},
		{
			category: 'Backend',
			items: ['Python', 'Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Edge runtimes']
		}
	];

	const stats = [
		{ value: '2018', label: 'Shipping since' },
		{ value: 'TS · Py', label: 'Daily stack' },
		{ value: 'LLM-native', label: 'How I build' }
	];
</script>

<section id="about" class="about section">
	<div class="container">
		<div class="about-header">
			<span class="section-label">About</span>
			<h2 class="section-title">Engineer who designs.<br/>Designer who ships.</h2>
			<p class="section-subtitle">
				I build software that augments people instead of replacing their judgment. Real
				interfaces, real systems, real outcomes.
			</p>
		</div>

		<div class="about-grid">
			<div class="about-story card">
				<h3>How I work</h3>
				<p>
					I started shipping code in 2018 as an intern, kept shipping through Brown ('21),
					and now build product end-to-end: research, design, frontend, API, infra.
				</p>
				<p>
					LLMs entered my stack the day they were useful. I treat them like a teammate with
					blind spots: useful for grunt work, terrible at judgment, and the best leverage I
					have for prototyping new interfaces before I commit to them.
				</p>
				<p>
					I care about the seam between people and software. The model should fade into
					the product. The product should fade into the work. That is the bar.
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
