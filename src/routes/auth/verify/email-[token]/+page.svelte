<script lang="ts">
	export let data: { heading?: string; message?: string };
	// console.log('data', data);
</script>

<section class="mt-12 grid items-center gap-6">
	<div class="flex flex-col items-start gap-2 mx-auto">
		{#if data.heading}
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl text-center">
				{data.heading}
			</h1>
		{/if}
		{#if data.message}
			<p class="text-lg">{data.message}</p>
		{:else}
			<span class="loading loading-spinner mx-auto mt-20"></span>
		{/if}
	</div>
</section>
