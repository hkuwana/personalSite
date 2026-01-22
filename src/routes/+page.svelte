<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { onMount } from 'svelte';

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

<svelte:head>
	<title>Hiroyuki Kuwana | Full Stack Developer</title>
	<meta name="description" content="Hiroyuki Kuwana - Full Stack Developer & Creative Problem Solver. Building elegant solutions with modern web technologies." />
</svelte:head>

<Hero />
<About />
<Projects />
<BlogPreview />
<Contact />
