<script lang="ts">
	import { page } from '$app/stores';

	// Static blog posts content
	const posts: Record<string, {
		title: string;
		date: string;
		readTime: string;
		tags: string[];
		content: string;
	}> = {
		'getting-started-with-svelte-5': {
			title: 'Getting Started with Svelte 5: A Complete Guide',
			date: '2024-01-15',
			readTime: '8 min read',
			tags: ['Svelte', 'JavaScript', 'Tutorial'],
			content: `
				<p>Svelte 5 introduces a revolutionary new way to handle reactivity in your applications. With the introduction of runes, Svelte has evolved from a compiler-based framework to something even more powerful and intuitive.</p>

				<h2>What are Runes?</h2>
				<p>Runes are special symbols that tell Svelte how to handle reactivity. The most important ones are:</p>
				<ul>
					<li><code>$state</code> - Declares reactive state</li>
					<li><code>$derived</code> - Creates computed values</li>
					<li><code>$effect</code> - Runs side effects when dependencies change</li>
					<li><code>$props</code> - Declares component props</li>
				</ul>

				<h2>Creating Reactive State</h2>
				<p>In Svelte 5, you create reactive state using the <code>$state</code> rune:</p>
				<pre><code>let count = $state(0);

function increment() {
	count++;
}</code></pre>

				<h2>Derived Values</h2>
				<p>When you need values that depend on other reactive values, use <code>$derived</code>:</p>
				<pre><code>let count = $state(0);
let doubled = $derived(count * 2);</code></pre>

				<h2>Side Effects</h2>
				<p>The <code>$effect</code> rune replaces the old <code>$:</code> reactive statements for side effects:</p>
				<pre><code>$effect(() => {
	console.log('Count changed:', count);
});</code></pre>

				<h2>Why This Matters</h2>
				<p>These changes make Svelte more predictable and easier to reason about. The explicit nature of runes means you always know exactly what's reactive and what isn't.</p>

				<h2>Conclusion</h2>
				<p>Svelte 5 represents a significant step forward for the framework. The new runes system provides more explicit control over reactivity while maintaining the simplicity that makes Svelte so approachable.</p>
			`
		},
		'building-better-apis': {
			title: 'Building Better APIs: Best Practices for RESTful Design',
			date: '2024-01-08',
			readTime: '6 min read',
			tags: ['API', 'Backend', 'Best Practices'],
			content: `
				<p>A well-designed API is a joy to work with. It's intuitive, consistent, and makes developers productive. Let's explore the best practices that separate good APIs from great ones.</p>

				<h2>Use Nouns, Not Verbs</h2>
				<p>Your endpoints should represent resources, not actions:</p>
				<pre><code>// Good
GET /users
POST /users
GET /users/123

// Bad
GET /getUsers
POST /createUser
GET /getUserById</code></pre>

				<h2>Use HTTP Methods Correctly</h2>
				<ul>
					<li><strong>GET</strong> - Retrieve resources</li>
					<li><strong>POST</strong> - Create new resources</li>
					<li><strong>PUT</strong> - Update entire resources</li>
					<li><strong>PATCH</strong> - Partial updates</li>
					<li><strong>DELETE</strong> - Remove resources</li>
				</ul>

				<h2>Version Your API</h2>
				<p>Always version your API from day one:</p>
				<pre><code>https://api.example.com/v1/users
https://api.example.com/v2/users</code></pre>

				<h2>Handle Errors Gracefully</h2>
				<p>Provide meaningful error responses:</p>
				<pre><code>{
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Email is required",
		"field": "email"
	}
}</code></pre>

				<h2>Conclusion</h2>
				<p>Following these best practices will help you build APIs that developers love to use. Remember: the best API is one that's so intuitive, users barely need to read the documentation.</p>
			`
		},
		'the-power-of-typescript': {
			title: 'The Power of TypeScript in Large-Scale Applications',
			date: '2024-01-01',
			readTime: '5 min read',
			tags: ['TypeScript', 'JavaScript'],
			content: `
				<p>TypeScript has become the de facto standard for large-scale JavaScript applications. But why? Let's explore what makes TypeScript so powerful.</p>

				<h2>Catch Errors Early</h2>
				<p>TypeScript catches errors at compile time, not runtime:</p>
				<pre><code>function greet(name: string) {
	return \`Hello, \${name}!\`;
}

greet(123); // Error: Argument of type 'number' is not assignable</code></pre>

				<h2>Better IDE Support</h2>
				<p>With types, your IDE can provide intelligent autocomplete, refactoring tools, and inline documentation. This dramatically improves developer productivity.</p>

				<h2>Self-Documenting Code</h2>
				<p>Types serve as documentation that's always up-to-date:</p>
				<pre><code>interface User {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'user';
}</code></pre>

				<h2>Refactoring with Confidence</h2>
				<p>TypeScript makes refactoring safer. When you change a type, the compiler tells you everywhere that needs to be updated.</p>

				<h2>Conclusion</h2>
				<p>TypeScript's type system provides a safety net that becomes increasingly valuable as your application grows. The upfront investment in types pays dividends in fewer bugs and easier maintenance.</p>
			`
		}
	};

	const slug = $derived($page.params.slug);
	const post = $derived(posts[slug]);

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title} | Hiroyuki Kuwana</title>
		<meta name="description" content={post.title} />
	{:else}
		<title>Post Not Found | Hiroyuki Kuwana</title>
	{/if}
</svelte:head>

<article class="blog-post">
	<div class="container">
		{#if post}
			<header class="post-header">
				<a href="/blog" class="back-link">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M19 12H5M12 19l-7-7 7-7"/>
					</svg>
					Back to Blog
				</a>

				<div class="post-meta">
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<span class="separator">•</span>
					<span>{post.readTime}</span>
				</div>

				<h1>{post.title}</h1>

				<div class="post-tags">
					{#each post.tags as tag}
						<a href="/blog?tag={tag}" class="tag">{tag}</a>
					{/each}
				</div>
			</header>

			<div class="post-content">
				{@html post.content}
			</div>

			<footer class="post-footer">
				<div class="author-card">
					<img src="/images/selfPortrait.jpeg" alt="Hiroyuki Kuwana" class="author-image" />
					<div class="author-info">
						<h4>Written by Hiroyuki Kuwana</h4>
						<p>Full Stack Developer passionate about building elegant solutions with modern web technologies.</p>
					</div>
				</div>

				<div class="share-section">
					<span>Share this article:</span>
					<div class="share-buttons">
						<a href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.title)}&url={encodeURIComponent(`https://hkuwana.com/blog/${slug}`)}" target="_blank" rel="noopener noreferrer" class="share-btn">
							Twitter
						</a>
						<a href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent(`https://hkuwana.com/blog/${slug}`)}&title={encodeURIComponent(post.title)}" target="_blank" rel="noopener noreferrer" class="share-btn">
							LinkedIn
						</a>
					</div>
				</div>
			</footer>
		{:else}
			<div class="not-found">
				<h1>Post Not Found</h1>
				<p>The post you're looking for doesn't exist.</p>
				<a href="/blog" class="btn btn-primary">Back to Blog</a>
			</div>
		{/if}
	</div>
</article>

<style>
	.blog-post {
		padding-top: calc(var(--nav-height) + var(--spacing-3xl));
		padding-bottom: var(--spacing-4xl);
		min-height: 100vh;
	}

	.container {
		max-width: 800px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		margin-bottom: var(--spacing-xl);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-accent-light);
	}

	.post-header {
		margin-bottom: var(--spacing-3xl);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-lg);
	}

	.separator {
		opacity: 0.5;
	}

	.post-header h1 {
		font-size: var(--font-size-4xl);
		line-height: 1.2;
		margin-bottom: var(--spacing-lg);
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tag {
		padding: var(--spacing-xs) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-full);
		font-size: var(--font-size-sm);
		color: var(--color-accent-light);
		font-family: var(--font-mono);
		transition: all var(--transition-fast);
	}

	.tag:hover {
		background: var(--color-accent);
		color: white;
	}

	.post-content {
		font-size: var(--font-size-lg);
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.post-content :global(h2) {
		font-size: var(--font-size-2xl);
		color: var(--color-text-primary);
		margin-top: var(--spacing-3xl);
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(p) {
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-bottom: var(--spacing-lg);
		padding-left: var(--spacing-xl);
	}

	.post-content :global(li) {
		margin-bottom: var(--spacing-sm);
	}

	.post-content :global(pre) {
		margin-bottom: var(--spacing-lg);
	}

	.post-content :global(code) {
		font-size: 0.9em;
	}

	.post-content :global(strong) {
		color: var(--color-text-primary);
	}

	.post-footer {
		margin-top: var(--spacing-4xl);
		padding-top: var(--spacing-2xl);
		border-top: 1px solid var(--color-border);
	}

	.author-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-xl);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		margin-bottom: var(--spacing-xl);
	}

	.author-image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author-info h4 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--spacing-sm);
	}

	.author-info p {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	.share-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		flex-wrap: wrap;
	}

	.share-section span {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.share-buttons {
		display: flex;
		gap: var(--spacing-sm);
	}

	.share-btn {
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
		transition: all var(--transition-base);
	}

	.share-btn:hover {
		background: var(--color-bg-hover);
		border-color: var(--color-accent);
		color: var(--color-accent-light);
	}

	.not-found {
		text-align: center;
		padding: var(--spacing-4xl) 0;
	}

	.not-found h1 {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-lg);
	}

	.not-found p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	@media (max-width: 768px) {
		.post-header h1 {
			font-size: var(--font-size-3xl);
		}

		.author-card {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
