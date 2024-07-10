<script lang="ts">
	export let data: { heading?: string; message?: string };
	// console.log('data', data);
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2 mx-auto">
		{#if data.heading}
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
				{data.heading}
			</h1>
		{/if}
		{#if data.message}
			<p class="max-w-[700px] text-lg text-muted-foreground">{@html data.message}</p>
		{:else}
			<span class="loading loading-spinner mx-auto mt-20"></span>
		{/if}
	</div>
</section>
