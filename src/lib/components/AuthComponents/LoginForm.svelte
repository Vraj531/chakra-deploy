<script lang="ts">
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

	export let toForgotPassword: () => void;

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		try {
			// console.log('data', window.grecaptcha);
			// data.token = await getRecaptchaToken();
			data.token = data['g-recaptcha-response'];
			console.log('data', data);
			const res = await fetch('api/login', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			console.log('response', await res.json());
		} catch (error) {
			console.log('error', error);
		}
	};
</script>

<form class="p-2 flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
	<!-- login form -->
	<label class="form-control w-full">
		<span class="label-text">Email</span>
		<input type="text" placeholder="email" class="input input-bordered" name="email" />
	</label>

	<label class="form-control w-full">
		<span class="label-text">Password</span>
		<input type="password" placeholder="password" class="input input-bordered" name="password" />
		<a
			href="#forgot-password"
			class="label-text-alt link link-hover pt-2"
			on:click={toForgotPassword}>Forgot password?</a
		>
	</label>

	<!-- <div class="g-recaptcha" data-sitekey={PUBLIC_RECAPTCHA_KEY} data-action="LOGIN"></div> -->
	<div
		class="g-recaptcha"
		data-sitekey="6LfGWgIqAAAAAIJV6ihQg4fiNC54gOOx4AcOK3vU"
		data-action="LOGIN"
	></div>

	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Login</button>
	</div>
</form>
