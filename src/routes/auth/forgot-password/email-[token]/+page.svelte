<script lang="ts">
	export let data: { heading?: string; message?: string; status?: string };
	//if data.status is true, render form
</script>

<div>
	<div class="flex justify-center items-center mt-10">
		<form action="POST" class="w-full max-w-xs flex flex-col gap-4">
			<div class="form-control w-full max-w-xs">
				<span class="label-text">New Password</span>
				<input
					type="password"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<span class="label-text">Confirm Password</span>
				<input
					type="password"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<button type="submit" class="btn btn-primary mt-4">Update Password</button>
		</form>
	</div>
</div>
