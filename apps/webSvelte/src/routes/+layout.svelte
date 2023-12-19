<script lang="ts">
	import '../app.css';
	import { start as startTimeStore } from '$lib/components/time.store';
	import { setupIO, setupMO } from '$lib/actions/observers';
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { dev } from '$app/environment';

	//production only

	onMount(() => {
		startTimeStore();
		setupIO();
		setupMO();
		register();
	});
</script>

<Header />
<slot />
