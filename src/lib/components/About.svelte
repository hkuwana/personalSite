<script>
	const skills = [
		{
			category: 'AI & LLMs',
			items: ['Claude / GPT', 'RAG pipelines', 'Tool-use agents', 'Evals', 'Prompt design']
		},
		{
			category: 'Frontend',
			items: ['SvelteKit', 'TypeScript', 'React', 'Tailwind']
		},
		{
			category: 'Backend',
			items: ['Python', 'Node.js', 'PostgreSQL', 'Supabase']
		}
	];
</script>

<section id="about" class="about section">
	<div class="container">
		<div class="about-grid">
			<div class="about-content">
				<h2 class="section-title">About</h2>
				<div class="about-text">
					<p>
						I started shipping code in 2018 as an intern, kept shipping through Brown ('21), and now build product end-to-end: research, design, frontend, API, infra.
					</p>
					<p>
						LLMs entered my stack the day they were useful. I treat them like a teammate with blind spots—useful for grunt work, terrible at judgment, and the best leverage I have for prototyping new interfaces.
					</p>
					<p>
						I care about the seam between people and software. The model should fade into the product. The product should fade into the work.
					</p>
				</div>
				<a href="/resume.pdf" class="resume-link" target="_blank">
					Download Resume
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M7 17L17 7M17 7H7M17 7V17"/>
					</svg>
				</a>
			</div>

			<div class="about-skills">
				<h3 class="skills-title">Skills</h3>
				{#each skills as group}
					<div class="skill-group">
						<h4 class="skill-category">{group.category}</h4>
						<div class="skill-list">
							{#each group.items as skill}
								<span class="skill-item">{skill}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--color-bg-subtle);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4xl);
	}

	.about-text {
		margin-bottom: var(--spacing-xl);
	}

	.about-text p {
		color: var(--color-text-secondary);
		line-height: 1.8;
		margin-bottom: var(--spacing-md);
	}

	.about-text p:last-child {
		margin-bottom: 0;
	}

	.resume-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text);
		font-weight: 500;
	}

	.resume-link:hover {
		color: var(--color-accent);
	}

	.skills-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		margin-bottom: var(--spacing-xl);
	}

	.skill-group {
		margin-bottom: var(--spacing-xl);
	}

	.skill-group:last-child {
		margin-bottom: 0;
	}

	.skill-category {
		font-size: var(--font-size-xs);
		font-weight: 500;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: var(--spacing-md);
	}

	.skill-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.skill-item {
		padding: var(--spacing-xs) var(--spacing-md);
		background: white;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-3xl);
		}
	}
</style>
