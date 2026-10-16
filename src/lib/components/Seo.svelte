<script lang="ts">
	import { page } from '$app/state';
	import { alternatePath, type Locale } from '$lib/i18n';
	import { SITE_ORIGIN } from '$lib/site';

	let {
		title,
		description,
		locale,
		alternate = true,
		type = 'website',
		noindex = false
	}: {
		title: string;
		description: string;
		locale: Locale;
		/** False when the page has no version in the other language. */
		alternate?: boolean;
		type?: 'website' | 'article';
		noindex?: boolean;
	} = $props();

	const path = $derived(page.url.pathname);
	const canonical = $derived(SITE_ORIGIN + path);
	const enPath = $derived(alternatePath(path, 'en'));
	const jaPath = $derived(alternatePath(path, 'ja'));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if alternate}
		<link rel="alternate" hreflang="en" href={SITE_ORIGIN + enPath} />
		<link rel="alternate" hreflang="ja" href={SITE_ORIGIN + jaPath} />
		<link rel="alternate" hreflang="x-default" href={SITE_ORIGIN + enPath} />
	{/if}
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
