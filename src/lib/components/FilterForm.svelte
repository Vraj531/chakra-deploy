<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	export let handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;

	let clearanceFilters = [
		{ label: 'Required', value: true },
		{ label: 'Optional', value: false }
	];
	let jobTypeFilters = [
		{ label: 'Full Time', value: 'Full Time' },
		{ label: 'Part Time', value: 'Part Time' }
	];
	let experienceFilters = [
		{ label: 'Entry Level', value: 'Entry Level' },
		{ label: 'Mid Level', value: 'Mid Level' },
		{ label: 'Senior Level', value: 'Senior Level' },
		{ label: 'Executive Level', value: 'Executive Level' }
	];
	let salaryScale = 0;

	let clearance = '';
	let jobTypeValue = '';
	let experienceValue = '';
</script>

<dialog id="filter-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<form class="flex flex-col w-full gap-4" on:submit={handleSubmit}>
			<p class="text-lg">Filters</p>
			<div class="flex w-full gap-2">
				<div class="w-1/2">
					<div class="form-control">
						<p class="font-semibold">Clearance</p>
						<label class="label cursor-pointer">
							<span class="label-text">Required</span>
							<input type="radio" name="clearance" class="radio" checked value={true} />
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Not Required</span>
							<input type="radio" name="clearance" class="radio" checked value={false} />
						</label>
					</div>
				</div>
				<div class="w-1/2">
					<div class="form-control">
						<p class="font-semibold">Job Type</p>
						<label class="label cursor-pointer">
							<span class="label-text">On Site</span>
							<input
								type="radio"
								name="has_remote"
								class="radio checked:bg-primary"
								checked
								value={false}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Remote</span>
							<input
								type="radio"
								name="has_remote"
								class="radio checked:bg-primary"
								checked
								value={true}
							/>
						</label>
					</div>
				</div>
			</div>

			<label for="" class="form-control">
				<div class="label">
					<span class="label-text">Experience level</span>
				</div>

				<select
					class="select select-primary w-full"
					id="experience"
					name="experience"
					placeholder="Mid-level, Excecutive etc"
				>
					{#each experienceFilters as experienceLevel}
						<option value={experienceLevel.value}>{experienceLevel.label}</option>
					{/each}
				</select>
			</label>
			<label for="" class="form-control">
				<div class="label">
					<span>Salary (in USD)</span>
				</div>
				<input type="text" class="input input-primary" name="min_salary" pattern="^[1-9]\d*$" />
			</label>
			<button class="btn btn-primary mx-auto" type="submit">Submit</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="">close</button>
	</form>
</dialog>
