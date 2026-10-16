<script lang="ts">
	import { capture } from '$lib/analytics';

	let {
		url,
		durationS,
		slug,
		label,
		minutesLabel
	}: { url: string; durationS: number; slug: string; label: string; minutesLabel: string } =
		$props();

	// Direct files (Cloudflare Stream and most hosts offer an MP4 URL) get a native player, so
	// progress can be reported. Anything else is embedded and only the start is reported.
	const native = $derived(/\.(mp4|webm)(\?|$)/i.test(url));
	let playing = $state(false);
	const reported = new Set<number>();

	function report(progress: number) {
		if (reported.has(progress)) return;
		reported.add(progress);
		capture('diagnostic_video_played', { slug, progress });
	}

	function start() {
		playing = true;
		report(0);
	}

	function onTime(e: Event) {
		const video = e.currentTarget as HTMLVideoElement;
		if (!video.duration) return;
		const share = (video.currentTime / video.duration) * 100;
		for (const mark of [25, 50, 75]) if (share >= mark) report(mark);
	}

	const minutes = $derived(Math.max(1, Math.round(durationS / 60)));
</script>

<div class="video">
	{#if !playing}
		<button type="button" class="facade" onclick={start}>
			<span class="play" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
			</span>
			<span class="label">{label}</span>
			<span class="duration">{minutes} {minutesLabel}</span>
		</button>
	{:else if native}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video src={url} controls autoplay playsinline ontimeupdate={onTime} onended={() => report(100)}></video>
	{:else}
		<iframe
			src={url}
			title={label}
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen
			loading="lazy"
		></iframe>
	{/if}
</div>

<style>
	.video {
		aspect-ratio: 16 / 9;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: var(--color-bg-tertiary);
	}

	.facade {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		background: radial-gradient(ellipse at center, var(--color-bg-hover), var(--color-bg-tertiary));
		border: none;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.play {
		display: grid;
		place-items: center;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: var(--color-accent);
		color: white;
		transition: transform var(--transition-fast);
	}

	.facade:hover .play {
		transform: scale(1.06);
	}

	.label {
		font-weight: 500;
	}

	.duration {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	video,
	iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
