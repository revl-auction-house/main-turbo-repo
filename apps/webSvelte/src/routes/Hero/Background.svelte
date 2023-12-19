<script>
	import { fade } from 'svelte/transition';
	export let src = '';
	//Todo use canvas to create still images from gifs
</script>

<img transition:fade={{ duration: 600 }} {src} alt="" />

<style>
	img {
		@apply absolute inset-0 w-full h-full object-fill scale-105
        filter blur-[50px] saturate-[1.2] contrast-[0.6] brightness-[0.6];
	}
</style>
