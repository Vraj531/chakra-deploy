<script lang="ts">
	export let resetJobList: () => void;
</script>

<dialog id="reset-joblist-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box pt-12">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-1 md:top-2">✕</button>
		</form>
		<div class="">
			<p class="text-xl pb-4">No jobs found with the filter config</p>
			<button class="btn btn-primary" on:click={resetJobList}>Reset List</button>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</div>
</dialog>
