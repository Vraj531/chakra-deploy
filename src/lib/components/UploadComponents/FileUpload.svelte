<script lang="ts">
	import UploadIcon from '../Icons/UploadIcon.svelte';

	export let handleFileInput: (e: any) => void;
	export let inputText: string;
	export let country: string;

	let minRows = 1;
	let maxRows = 20;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="flex flex-col md:flex-row items-center gap-4 md:px-12 mt-[6em] w-4/5 mx-auto">
	<label class="btn hidden md:flex btn-primary mx-auto" for="fileUpload">
		<input
			type="file"
			class="hidden"
			id="fileUpload"
			on:change={handleFileInput}
			accept="application/pdf"
		/>
		<UploadIcon />
		Upload Resume/CV PDF
	</label>
	<label class="form-control max-w-xs">
		<select
			class="select select-bordered"
			on:change={(e) => (country = e.currentTarget.value)}
			value={country}
		>
			<option value="USA">USA</option>
			<option value="Canada">Canada</option>
			<option value="India">India</option>
		</select>
	</label>
	<div class="container rounded-2xl">
		<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{inputText +
				'\n'}</pre>

		<textarea
			placeholder="Add additional skills"
			bind:value={inputText}
			class="rounded-lg w-full"
			id="skills"
		></textarea>
	</div>
	<label class="btn flex md:hidden btn-primary mx-auto" for="fileUpload">
		<input
			type="file"
			class="hidden"
			id="fileUpload"
			on:change={handleFileInput}
			accept="application/pdf"
		/>
		<UploadIcon />
		Upload Resume/CV PDF
	</label>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		display: flex;
		margin: auto;
		padding: 0em;
		width: 100%;
	}

	pre,
	textarea {
		font-family: inherit;
		padding: 1em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
		overflow-y: scroll;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
