<script lang="ts">
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});

	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		status = 'sending';

		// Simulate form submission - replace with actual endpoint
		await new Promise(resolve => setTimeout(resolve, 1500));

		// For demo purposes, always succeed
		status = 'success';
		formData = { name: '', email: '', message: '' };

		// Reset status after 3 seconds
		setTimeout(() => {
			status = 'idle';
		}, 3000);
	}

	const contactInfo = [
		{
			icon: 'email',
			label: 'Email',
			value: 'hello@hkuwana.com',
			href: 'mailto:hello@hkuwana.com'
		},
		{
			icon: 'location',
			label: 'Location',
			value: 'San Francisco, CA',
			href: null
		},
		{
			icon: 'availability',
			label: 'Availability',
			value: 'Open to opportunities',
			href: null
		}
	];
</script>

<section id="contact" class="contact section">
	<div class="container">
		<div class="contact-header">
			<span class="section-label">Contact</span>
			<h2 class="section-title">Let's Work Together</h2>
			<p class="section-subtitle">
				Have a project in mind or just want to chat? I'm always excited to hear about
				new opportunities and interesting ideas.
			</p>
		</div>

		<div class="contact-grid">
			<div class="contact-info">
				<h3>Get in Touch</h3>
				<p class="info-text">
					Whether you're looking for a developer to bring your vision to life,
					have questions about my work, or just want to say hello — my inbox is always open.
				</p>

				<div class="info-items">
					{#each contactInfo as item}
						<div class="info-item">
							<div class="info-icon">
								{#if item.icon === 'email'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
										<polyline points="22,6 12,13 2,6"/>
									</svg>
								{:else if item.icon === 'location'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
										<circle cx="12" cy="10" r="3"/>
									</svg>
								{:else if item.icon === 'availability'}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
										<circle cx="12" cy="12" r="10"/>
										<polyline points="12 6 12 12 16 14"/>
									</svg>
								{/if}
							</div>
							<div class="info-content">
								<span class="info-label">{item.label}</span>
								{#if item.href}
									<a href={item.href} class="info-value">{item.value}</a>
								{:else}
									<span class="info-value">{item.value}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<div class="social-links">
					<a href="https://github.com/hkuwana" class="social-btn" target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
						</svg>
					</a>
					<a href="https://linkedin.com/in/hkuwana" class="social-btn" target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
					<a href="https://twitter.com/hkuwana" class="social-btn" target="_blank" rel="noopener noreferrer">
						<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
				</div>
			</div>

			<form class="contact-form card" onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="name">Name</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						placeholder="Your name"
						required
						disabled={status === 'sending'}
					/>
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						placeholder="your@email.com"
						required
						disabled={status === 'sending'}
					/>
				</div>

				<div class="form-group">
					<label for="message">Message</label>
					<textarea
						id="message"
						bind:value={formData.message}
						placeholder="Tell me about your project..."
						rows="5"
						required
						disabled={status === 'sending'}
					></textarea>
				</div>

				<button type="submit" class="btn btn-primary submit-btn" disabled={status === 'sending'}>
					{#if status === 'sending'}
						<span class="spinner"></span>
						Sending...
					{:else if status === 'success'}
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Message Sent!
					{:else}
						Send Message
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="22" y1="2" x2="11" y2="13"/>
							<polygon points="22 2 15 22 11 13 2 9 22 2"/>
						</svg>
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>

<style>
	.contact {
		position: relative;
	}

	.contact-header {
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

	.contact-header .section-title {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.contact-header .section-subtitle {
		max-width: 600px;
		margin: 0 auto;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		align-items: start;
	}

	.contact-info h3 {
		font-size: var(--font-size-2xl);
		margin-bottom: var(--spacing-md);
	}

	.info-text {
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: var(--spacing-xl);
	}

	.info-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.info-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
	}

	.info-icon {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-accent-light);
		flex-shrink: 0;
	}

	.info-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.info-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.info-value {
		color: var(--color-text-primary);
		font-weight: 500;
	}

	a.info-value:hover {
		color: var(--color-accent-light);
	}

	.social-links {
		display: flex;
		gap: var(--spacing-md);
	}

	.social-btn {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-secondary);
		transition: all var(--transition-base);
	}

	.social-btn:hover {
		background: var(--color-bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent-light);
		transform: translateY(-2px);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.form-group label {
		font-size: var(--font-size-sm);
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.form-group input,
	.form-group textarea {
		padding: var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text-primary);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		transition: all var(--transition-fast);
		resize: vertical;
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--color-text-muted);
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px var(--color-accent-glow);
	}

	.form-group input:disabled,
	.form-group textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-btn {
		margin-top: var(--spacing-md);
		width: 100%;
	}

	.submit-btn:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-2xl);
		}

		.contact-header .section-title {
			font-size: var(--font-size-3xl);
		}
	}
</style>
