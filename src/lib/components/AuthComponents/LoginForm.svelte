<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import { getRecaptchaToken } from '$lib/utils/getRecaptchaToken';
	import GoogleIcon from '$lib/assets/icons/google.svg?raw';

	export let toForgotPassword: () => void;

	let status = false;
	let emailError = '';
	let passwordError = '';

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		if (data.email === '') {
			emailError = 'Email is required';
			return;
		}
		if (!validateEmail(data.email as string)) {
			emailError = 'Invalid email';
			return;
		}
		emailError = '';
		if (data.password === '') {
			emailError = 'Password is required';
			return;
		}
		try {
			status = true;
			data.token = await getRecaptchaToken('LOGIN');
			// data.token = data['g-recaptcha-response'];
			// console.log('data', data);
			const res = await fetch('api/login', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			if (res.status === 401) {
				// console.log('res', res);
				const resData = await res.json();
				passwordError = resData.message;
				status = false;
				return;
			}
			if (res.status === 200) {
				const modal = document.getElementById('auth-modal') as HTMLDialogElement;
				modal.close();
				goto('/upload');
			}
			passwordError = '';
			status = false;
		} catch (error) {
			status = false;
			passwordError = '';
			console.log('error', error);
		}
	};

	function validateEmail(email: string) {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	}
</script>

<form class="p-2 flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
	<!-- login form -->
	<label class="form-control w-full">
		<span class="label-text">Email</span>
		<input type="text" placeholder="email" class="input input-bordered" name="email" />
		{#if emailError !== ''}
			<span class="label-text-alt text-red-500">{emailError}</span>
		{/if}
	</label>

	<!-- <input type="checkbox" name="props" id="remember1" required class="hidden" /> -->

	<label class="form-control w-full">
		<span class="label-text">Password</span>
		<input type="password" placeholder="password" class="input input-bordered" name="password" />
		<a href="#forgot-password" class="label-text-alt link pt-2" on:click={toForgotPassword}
			>Forgot password?</a
		>
		{#if passwordError !== ''}
			<div class="label">
				<span class="label-text-alt text-red-500">{passwordError}</span>
			</div>
		{/if}
	</label>

	<div class="g-recaptcha" data-sitekey={PUBLIC_RECAPTCHA_KEY} data-action="LOGIN"></div>

	<p class="text-xs">
		This site is protected by reCAPTCHA and the Google
		<a href="https://policies.google.com/privacy" class="link">Privacy Policy</a> and
		<a href="https://policies.google.com/terms" class="link">Terms of Service</a> apply.
	</p>
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={status}>
			{#if status}
				<span class="loading loading-spinner"></span>
			{/if}
			Login</button
		>
	</div>
	<div class="divider">OR</div>

	<a class="btn btn-outline" type="submit" href="google">
		{@html GoogleIcon}
		Google</a
	>
</form>
