<script lang="ts">
	import '../app.css';
	import { start as startTimeStore } from '$lib/components/time.store';
	import { setupIO, setupMO } from '$lib/actions/observers';
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';

	//production only

	onMount(async () => {
		await import('reflect-metadata');

		startTimeStore();
		setupIO();
		setupMO();
		register();
	});
</script>

<Header />
<slot />
