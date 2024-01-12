<script>
	import { fade } from 'svelte/transition';
	export let src = '';
	//Todo use canvas to create still images from gifs
</script>

<img transition:fade={{ duration: 600 }} {src} alt="" crossorigin="anonymous" />

<style>
	img {
		@apply absolute inset-0 w-full h-full object-fill scale-105
        filter blur-[150px] saturate-[1.5] contrast-[0.5] brightness-[0.8];
	}
</style>
