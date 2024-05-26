<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	// import ChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
	// import ChevronRight from '@tabler/icons-svelte/IconChevronRight.svelte';
	import JobCard from './JobCard.svelte';
	import type { DummyData } from '$lib/dummyData';

	export let arr: DummyData[];

	let emblaApi: EmblaCarouselType;
	let scrollSnapList: number[];
	let carouselOptions = { loop: false };
	// let selected: number = 0;
	$: selected = emblaApi?.selectedScrollSnap() ?? 0;

	// $: {
	// 	console.log('embla api', emblaApi, selected);
	// }

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		scrollSnapList = emblaApi.scrollSnapList();
		// console.log('list', scrollSnapList); // Access API
	}
	// $: selected = emblaApi?.selectedScrollSnap() ?? 0;

	function nextCard() {
		emblaApi.scrollNext();
		selected = emblaApi?.selectedScrollSnap();
		// console.log('log', emblaApi.slideNodes());
		// console.log('rest', selected, arr.length - 1);
	}
	function previousCard() {
		emblaApi.scrollPrev();
		selected = emblaApi?.selectedScrollSnap();
	}
	const select = (index: number) => () => {
		emblaApi?.scrollTo(index);
		selected = emblaApi?.selectedScrollSnap();
	};
</script>

<div class="relative py-16">
	<div class={`hidden md:block`}>
		<button
			class={`left-10 btn btn-primary btn-circle absolute top-20 z-10 ${selected === 0 ? 'hidden' : 'md:block'}`}
			on:click={previousCard}
		>
			<!-- <ChevronLeft class="h-8 w-8 pl-2" on:click={previousCard} /> -->
			left
		</button>
		<button
			class={`btn btn-primary btn-circle absolute right-10 top-20 z-10 ${selected === arr.length - 1 ? 'hidden' : 'md:block'}`}
			on:click={nextCard}
		>right
			<!-- <ChevronRight class="h-9 w-9 pl-3" /> -->
		</button>
	</div>
	<div class="embla">
		<div
			class="embla__viewport"
			use:emblaCarouselSvelte={{ options: carouselOptions, plugins: [] }}
			on:emblaInit={onInit}
		>
			<div class="embla__container">
				{#each arr as slide}
					<JobCard {slide} />
				{/each}
			</div>
		</div>
	</div>
	<div class="absolute bottom-4 left-0 w-full flex justify-center gap-4">
		{#each arr as _, index}
			<button class="w-[30px] h-[30px] grid place-items-center" on:click={select(index)}>
				<div
					class="w-full h-[3px] bg-black rounded-[.25rem]"
					class:[background:linear-gradient(45deg,#ff9500,#ffcc00)]={selected === index}
				/>
			</button>
		{/each}
	</div>
</div>

<style>
	.embla {
		overflow: hidden;
		position: relative;
		z-index: 0;
	}
	.embla__container {
		display: flex;
	}
	/* .embla__dots {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: center;
		margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
	}
	.embla__dot {
		-webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		touch-action: manipulation;
		display: inline-flex;
		text-decoration: none;
		cursor: pointer;
		border: 0;
		padding: 0;
		margin: 0;
		width: 2.6rem;
		height: 2.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.embla__dot:after {
		box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		content: '';
	}
	.embla__dot--selected:after {
		box-shadow: inset 0 0 0 0.2rem var(--text-body);
	} */
</style>
