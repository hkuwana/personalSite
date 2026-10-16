<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children } = $props();
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
