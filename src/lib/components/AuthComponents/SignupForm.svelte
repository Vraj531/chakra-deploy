<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import { getRecaptchaToken } from '$lib/utils/getRecaptchaToken';
	import GoogleIcon from '$lib/assets/icons/google.svg?raw';

	let emailError = '';
	let passwordError = '';
	let confirmPasswordError = '';
	let status = false;
	let loading = false;

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		emailError = '';
		passwordError = '';
		confirmPasswordError = '';

		try {
			if (data.remember2) return;
			data.email = (data.email as string).toLowerCase();
			if (validateEmail(data.email as string) === false) {
				emailError = 'Invalid email/Please enter a valid email';
				// toastStore.alert('Invalid email/Please enter a valid email', { position: 'bottom-end' });
				return;
			} else emailError = '';
			if (validatePassword(data.password as string) === false) {
				passwordError = 'Invalid password/Please enter a valid password';
				// toastStore.alert('Invalid password/Please enter a valid password', {
				// 	position: 'bottom-end'
				// });
				return;
			}
			// console.log('data', data);
			if (data.password !== data.confirmPassword) {
				confirmPasswordError = 'Passwords do not match';
				// toastStore.alert('Passwords do not match', { position: 'bottom-end' });
				return;
			}
			loading = true;
			const token = await getRecaptchaToken('SIGNUP');
			if (token) data.token = token;
			else data.token = '';
			data.expectedAction = 'SIGNUP';
			// data.token = data['g-recaptcha-response'];
			console.log('sign up data');
			const response = await fetch('api/signup', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			// console.log('response', response);
			const res = await response.json();
			if (response.ok) {
				console.log('success');
				status = true;
				// setTimeout(() => {
				// 	const modal = document.getElementById('auth-modal') as HTMLDialogElement;
				// 	modal.close();
				// 	goto('/upload');
				// }, 3000);
			} else {
				status = false;
				// console.log('res', res);
				emailError = res.message;
			}
			loading = false;
		} catch (error) {
			status = false;
			loading = false;
			console.log('error', error);
		}
	};

	function validateEmail(email: string) {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	function validatePassword(password: string) {
		const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		return re.test(password);
	}
</script>

<form class="p-2 flex flex-col gap-2" on:submit|preventDefault={handleSubmit}>
	<!-- sign-up form -->
	<label class="form-control w-full">
		<span class="label-text">Email</span>
		<input type="text" placeholder="email" class="input input-bordered" name="email" />
		{#if emailError !== ''}
			<span class="label-text-alt text-error">{emailError}</span>
		{/if}
	</label>

	<input type="text" id="remember2" name="remember2" class="hidden" />

	<label class="form-control w-full">
		<span class="label-text">Password</span>
		<input type="password" placeholder="password" class="input input-bordered" name="password" />
		{#if passwordError !== ''}
			<span class="label-text-alt text-error">{passwordError}</span>
		{/if}
	</label>
	<label class="form-control w-full">
		<span class="label-text">Confirm Password</span>
		<input
			type="text"
			placeholder="password"
			class={`input input-bordered input-warning`}
			name="confirmPassword"
			autocomplete="off"
		/>
		{#if confirmPasswordError !== ''}
			<span class="label-text-alt text-error">{confirmPasswordError}</span>
		{/if}
	</label>

	<div>
		{#if status}
			<p class="text-2xl text-green-500">Success</p>
			<p class="text-xl">A verification mail has been sent to your account</p>
		{/if}
	</div>

	<p class="text-xs">
		This site is protected by reCAPTCHA and the Google
		<a href="https://policies.google.com/privacy" class="link">Privacy Policy</a> and
		<a href="https://policies.google.com/terms" class="link">Terms of Service</a> apply.
	</p>
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
			Sign Up</button
		>
		<!-- <button
			class="g-recaptcha btn btn-primary"
			type="submit"
			disabled={loading}
			data-sitekey={PUBLIC_RECAPTCHA_KEY}
			data-action="SIGNUP"
		>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
			Sign Up</button
		> -->
	</div>
	<div class="divider">OR</div>

	<a class="btn btn-outline" type="submit" href="google">
		{@html GoogleIcon}
		Google</a
	>
</form>
