<script lang="ts">
	//Swiper
	import 'swiper/css';
	import { Swiper } from 'swiper/core';
	import { themeConfig } from '$lib/styles/theme';
	import { press } from '$lib/actions/interaction';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import Content from './Content.svelte';
	import Background from './Background.svelte';
	import type { BannerAuctions$result } from '$houdini';

	export let auctions: BannerAuctions$result['auctions'];
	let swiper: Swiper;
	const initializer = (el: HTMLElement) => {
		const [sm, md, lg, xl, xxl] = Object.values(themeConfig.screens).map((bp) => parseInt(bp));
		swiper = new Swiper(el, {
			// Default parameters
			slidesPerView: 'auto',
			spaceBetween: 10,
			breakpoints: {
				[sm]: {
					slidesPerView: 1,
					loopAdditionalSlides: 1
				},
				[md]: {
					slidesPerView: 3,
					loopAdditionalSlides: 2
				},
				[lg]: {
					slidesPerView: 3,
					loopAdditionalSlides: 2
				},
				[xl]: {
					slidesPerView: 5,
					loopAdditionalSlides: 3
				},
				[xxl]: {
					slidesPerView: 7,
					loopAdditionalSlides: 4
				}
			},
			freeMode: {
				enabled: true,
				sticky: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			centeredSlides: true,
			slideToClickedSlide: true
			// autoplay: {
			// 	delay: 5000,
			// 	disableOnInteraction: false
			// }
		});
		selectedIndex = swiper.activeIndex;
		swiper.on('slideChange', () => {
			selectedIndex = swiper.activeIndex;
		});
	};
	let selectedIndex = 0;
	let images: string[];
	let bgImgUrl: string, selectedAuction: BannerAuctions$result['auctions'][number];
	$: if (auctions) {
		images = auctions.map((auction) => auction.nft.imgUrl || '');
		//get low res background image
		bgImgUrl = auctions[selectedIndex]?.nft.imgUrl || '';
		selectedAuction = auctions[selectedIndex];
	}
</script>

<div class="hero pt-24 mx-auto">
	<div class="-z-10 select-none pointer-events-none">
		{#key bgImgUrl}<Background src={bgImgUrl} />{/key}
	</div>
	<div class="swiper" use:initializer style="overflow:visible">
		<!-- Additional required wrapper -->
		<div class="swiper-wrapper">
			<!-- Slides -->
			{#each images as src}
				<div class="swiper-slide">
					<img
						use:press
						class="cursor-pointer rounded-2xl h-[250px] aspect-square mx-auto object-cover shadow-2xl"
						{src}
						alt=""
						crossorigin="anonymous"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="swiper-button-prev">
		<span use:press>
			<ArrowLeft class="w-16 h-16 p-2 rounded-full colored-glass shadow-lg transition-colors" />
		</span>
	</div>
	<div class="swiper-button-next">
		<span use:press>
			<ArrowRight class="w-16 h-16 p-2 rounded-full colored-glass shadow-lg transition-colors" />
		</span>
	</div>
	<div class="z-10 container mx-auto relative h-[200px]">
		{#key selectedAuction}<Content auction={selectedAuction} />{/key}
	</div>
	<hidden class="swiper-slide-prev swiper-slide-active swiper-slide-next nav-button" />
</div>

<style lang="scss">
	.hero {
		@apply relative overflow-hidden;
		.swiper {
			@apply select-none;
		}
		.swiper-button-prev {
			@apply absolute top-0 left-4 h-full flex items-center z-10;
		}
		.swiper-button-next {
			@apply absolute top-0 right-4 h-full flex items-center z-10;
		}
		.swiper-slide {
			@apply scale-75 transition-transform duration-300;
		}
		.swiper-slide-prev {
			@apply transform scale-90 translate-x-[-14px];
		}
		.swiper-slide-active {
			@apply transform scale-100;
		}
		.swiper-slide-next {
			@apply transform scale-90 translate-x-[14px];
		}
	}
</style>
