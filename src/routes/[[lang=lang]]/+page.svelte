<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import MethodPreview from '$lib/components/MethodPreview.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	// Intersection Observer for scroll animations
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<Seo title={data.t.meta.title} description={data.t.meta.description} locale={data.locale} />

<Hero />
<About />
<Projects />
<MethodPreview posts={data.featured} locale={data.locale} t={data.t} />
<Contact />
