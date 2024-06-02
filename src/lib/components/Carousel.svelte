<script lang="ts">
	import type { EmblaCarouselType } from 'embla-carousel';
	import embla from '$lib/index';
	import JobCard from './JobCard.svelte';
	import ChevronLeftIcon from '$lib/assets/icons/ChevronLeftIcon.svg?raw';
	import ChevronRightIcon from '$lib/assets/icons/ChevronRightIcon.svg?raw';
	import FilterIcon from '$lib/assets/icons/Filter.svg?raw';
	import RestoreIcon from '$lib/assets/icons/RestoreIcon.svg?raw';
	import type { DummyData } from '$lib/dummyData';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let arr: DummyData[];
	export let triggerModal: () => void;
	export let handleReset: () => void;

	const carousel = writable<EmblaCarouselType>();

	let selected: number = 0;

	function nextCard() {
		$carousel?.canScrollNext() && $carousel?.scrollNext();
	}
	function previousCard() {
		$carousel?.canScrollPrev() && $carousel?.scrollPrev();
	}
	const select = (index: number) => () => {
		$carousel?.scrollTo(index);
	};

	const onSelect = () => {
		selected = $carousel?.selectedScrollSnap();
	};
</script>

<div class="flex w-full mt-4">
	<div class=" ml-auto md:mx-auto">
		<button class=" btn btn-primary" on:click={handleReset}>
			{@html RestoreIcon}
			Reset
		</button>
		<div class="tooltip tooltip-top" data-tip="filter">
			<button class=" btn btn-primary" on:click={triggerModal}>
				{@html FilterIcon}
			</button>
		</div>
	</div>
</div>

<div class="relative py-16" transition:fade>
	<div class={`hidden md:block`}>
		<button
			class={`left-10 btn btn-primary btn-circle p-0 m-0 absolute top-48 z-10 ${selected === 0 ? 'hidden' : 'md:block'}`}
			on:click={previousCard}
		>
			<!-- <ChevronLeft class="h-8 w-8 pl-2" on:click={previousCard} /> -->
			<div class="pl-2 pt-1.5">
				{@html ChevronLeftIcon}
			</div>
		</button>
		<button
			class={`btn btn-primary btn-circle absolute right-10 top-48 z-10 ${selected === arr.length - 1 ? 'hidden' : 'md:block'}`}
			on:click={nextCard}
		>
			<div class="pl-2.5 pt-0.5">
				{@html ChevronRightIcon}
			</div>
			<!-- <ChevronRightIcon /> -->
			<!-- <ChevronRight class="h-9 w-9 pl-3" /> -->
		</button>
	</div>
	<div class="embla">
		<div class="embla__viewport" use:embla={{ store: carousel }} on:e-select={onSelect}>
			<div class="embla__container">
				{#each arr as slide}
					<JobCard {slide} />
				{/each}
			</div>
		</div>
	</div>
	<div class="absolute md:bottom-20 md:px-10 px-4 top-5 left-0 w-full flex justify-center gap-4">
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
