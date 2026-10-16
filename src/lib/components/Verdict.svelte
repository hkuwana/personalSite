<script lang="ts">
	import type { Dictionary } from '$lib/i18n';
	import type { Diagnostic } from '$lib/server/content/types';

	let {
		verdict,
		t,
		compact = false
	}: { verdict: Diagnostic['verdict']; t: Dictionary; compact?: boolean } = $props();

	const rows = $derived([
		{ key: 'pays', label: t.diagnostics.paysOff, text: verdict.pays_off },
		{ key: 'check', label: t.diagnostics.checkFirst, text: verdict.check_first },
		{ key: 'leave', label: t.diagnostics.leaveAlone, text: verdict.leave_alone }
	]);
</script>

<dl class="verdict" class:compact aria-label={t.diagnostics.verdict}>
	{#each rows as row (row.key)}
		<div class="row {row.key}">
			<dt>{row.label}</dt>
			<dd>{row.text}</dd>
		</div>
	{/each}
</dl>

<style>
	.verdict {
		display: grid;
		gap: 1px;
		background: var(--color-border);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.row {
		display: grid;
		grid-template-columns: 9.5rem 1fr;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-bg-secondary);
	}

	dt {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-sm);
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-text-primary);
	}

	/* The marker repeats the label's meaning; it is never the only cue. */
	dt::before {
		content: '';
		flex: none;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		transform: translateY(-1px);
	}

	.pays dt::before {
		background: var(--color-success);
	}

	.check dt::before {
		background: var(--color-warning);
	}

	.leave dt::before {
		background: var(--color-text-muted);
	}

	dd {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
		line-height: 1.6;
	}

	.compact .row {
		padding: var(--spacing-sm) var(--spacing-md);
	}

	@media (max-width: 560px) {
		.row {
			grid-template-columns: 1fr;
			gap: var(--spacing-xs);
		}
	}
</style>
