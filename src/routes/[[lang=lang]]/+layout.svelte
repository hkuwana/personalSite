<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { initAnalytics } from '$lib/analytics';
	import Footer from '$lib/components/Footer.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let { data, children } = $props();

	onMount(() => initAnalytics(data.posthog.key, data.posthog.host, !dev));
</script>

<div class="app">
	<Navigation locale={data.locale} t={data.t} />
	<main>
		{@render children()}
	</main>
	<Footer locale={data.locale} t={data.t} />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
