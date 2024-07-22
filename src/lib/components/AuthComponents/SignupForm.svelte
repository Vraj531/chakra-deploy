<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import { getRecaptchaToken } from '$lib/utils/getRecaptchaToken';
	import GoogleIcon from '$lib/assets/icons/google.svg?raw';

	let emailError = '';
	let passwordError = '';
	let confirmPasswordError = '';
	let status = false;

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

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
			status = true;
			data.token = await getRecaptchaToken('SIGNUP');
			data.expectedAction = 'SIGNUP';
			// data.token = data['g-recaptcha-response'];
			// console.log('data', data);
			const response = await fetch('api/signup', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			const res = await response.json();
			if (res.success) {
				console.log('success');
				status = true;
				setTimeout(() => {
					const modal = document.getElementById('auth-modal') as HTMLDialogElement;
					modal.close();
					goto('/upload');
				}, 3000);
			}
			status = false;
		} catch (error) {
			status = false;
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
		/>
		{#if confirmPasswordError !== ''}
			<span class="label-text-alt text-error">{confirmPasswordError}</span>
		{/if}
	</label>

	<div class="g-recaptcha" data-sitekey={PUBLIC_RECAPTCHA_KEY} data-action="SIGNUP"></div>
	<div>
		{#if status}
			<p class="text-2xl text-green-500">Success</p>
			<p class="text-xl">A verification mail has been sent to your account</p>
		{/if}
	</div>

	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Login</button>
	</div>
	<div class="divider">OR</div>

	<a class="btn btn-outline" type="submit" href="google">
		{@html GoogleIcon}
		Google</a
	>
</form>
