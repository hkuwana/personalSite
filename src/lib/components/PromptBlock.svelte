<script lang="ts">
	import { capture } from '$lib/analytics';

	let {
		id,
		title,
		text,
		slug,
		copyLabel,
		copiedLabel,
		open = false
	}: {
		id: string;
		title: string;
		text: string;
		/** The diagnostic or skill this prompt belongs to, for prompt_copied. */
		slug: string;
		copyLabel: string;
		copiedLabel: string;
		open?: boolean;
	} = $props();

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// Clipboard can be blocked (permissions, http). Select the text so Ctrl+C works.
			const range = document.createRange();
			range.selectNodeContents(pre);
			getSelection()?.removeAllRanges();
			getSelection()?.addRange(range);
			return;
		}
		capture('prompt_copied', { slug, prompt_id: id });
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	let pre: HTMLPreElement;
</script>

<details class="prompt" {open}>
	<summary>
		<span class="title">{title}</span>
	</summary>
	<div class="body">
		<button type="button" class="copy" onclick={copy} aria-live="polite">
			{copied ? copiedLabel : copyLabel}
		</button>
		<pre bind:this={pre}><code>{text}</code></pre>
	</div>
</details>

<style>
	.prompt {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-bg-secondary);
	}

	summary {
		cursor: pointer;
		padding: var(--spacing-md) var(--spacing-lg);
		font-weight: 500;
		color: var(--color-text-primary);
		list-style-position: inside;
	}

	.body {
		position: relative;
		border-top: 1px solid var(--color-border);
	}

	pre {
		margin: 0;
		padding: var(--spacing-lg);
		padding-top: calc(var(--spacing-lg) + 2rem);
		overflow-x: auto;
		white-space: pre-wrap;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: 1.6;
		color: var(--color-text-primary);
	}

	.copy {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		min-height: 2rem;
		padding: 0 var(--spacing-md);
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		font-size: var(--font-size-sm);
		cursor: pointer;
	}

	.copy:hover {
		border-color: var(--color-accent);
	}
</style>
