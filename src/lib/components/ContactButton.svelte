<script lang="ts">
	import { capture } from '$lib/analytics';

	let {
		encoded,
		label,
		subject = '',
		location,
		slug,
		variant = 'primary'
	}: {
		/** From encodedContact() in a server load. */
		encoded: string;
		label: string;
		subject?: string;
		/** Where on the site the button sits, for contact_revealed. */
		location: string;
		slug?: string;
		variant?: 'primary' | 'secondary';
	} = $props();

	function open() {
		const email = [...atob(encoded)].reverse().join('');
		capture('contact_revealed', { location, slug });
		const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
		window.location.href = `mailto:${email}${query}`;
	}
</script>

<button type="button" class="btn btn-{variant}" onclick={open}>{label}</button>
