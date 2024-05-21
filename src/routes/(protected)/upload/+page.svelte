<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import { options } from '../../../tableData/defaultColumns';
	import { createSvelteTable, flexRender } from '@tanstack/svelte-table';
	import { defaultData } from '../../../tableData/persons';
	// import { enhance } from '$app/forms';

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: defaultData
		}));
	};

	const table = createSvelteTable(options);

	let emblaApi;
	let carouselOptions = { loop: false };

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		console.log(emblaApi.slideNodes()); // Access API
	}
</script>

<div
	class="embla"
	use:emblaCarouselSvelte={{ options: { loop: false }, plugins: [] }}
	on:emblaInit={onInit}
>
	<div class="embla__container">
		<div class="embla__slide">Slide 1</div>
		<div class="embla__slide">Slide 2</div>
		<div class="embla__slide">Slide 3</div>
	</div>
</div>
<!-- <div class="carousel w-2/3 mx-auto">
	<div id="slide1" class="carousel-item relative w-full">
		<div class="card lg:card-side bg-base-100 shadow-xl max-w-screen-lg m-auto my-6 z-0">
			<figure>
				<img
					src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
					alt="Album"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">New album is released!</h2>
				<p>Click the button to listen on Spotiwhy app.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Listen</button>
				</div>
			</div>
		</div>
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href="#slide4" class="btn btn-circle">❮</a>
			<a href="#slide2" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide2" class="carousel-item relative w-full">
		<div class="card lg:card-side bg-base-100 shadow-xl max-w-screen-lg m-auto my-6 z-0">
			<figure>
				<img
					src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
					alt="Album"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">New album is released!</h2>
				<p>Click the button to listen on Spotiwhy app.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Listen</button>
				</div>
			</div>
		</div>
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href="#slide1" class="btn btn-circle">❮</a>
			<a href="#slide3" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide3" class="carousel-item relative w-full">
		<div class="card lg:card-side bg-base-100 shadow-xl max-w-screen-lg m-auto my-6 z-0">
			<figure>
				<img
					src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
					alt="Album"
				/>
			</figure>
			<div class="card-body">
				<h2 class="card-title">New album is released!</h2>
				<p>Click the button to listen on Spotiwhy app.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Listen</button>
				</div>
			</div>
		</div>
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href="#slide2" class="btn btn-circle">❮</a>
			<a href="#slide4" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide4" class="carousel-item relative w-full">
		<img
			src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
			class="w-full"
		/>
		<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<a href="#slide3" class="btn btn-circle">❮</a>
			<a href="#slide1" class="btn btn-circle">❯</a>
		</div>
	</div>
</div> -->
<div class="p-2 my-6 max-w-screen-xl m-auto">
	<table class="table">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr class="hover">
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.footer, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot> -->
	</table>
	<div class="h-4" />
	<!-- <button on:click={() => rerender()} class="border p-2"> Rerender </button> -->
</div>

<!-- <p>This is the protected page!</p>

<form method="post" use:enhance>
  <button>Sign out</button>
</form> -->

<style>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
</style>
