<script lang="ts">
	// import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import { getRecaptchaToken } from '$lib/utils/getRecaptchaToken';

	let emailError = '';
	let emailSuccess = '';
	let status: 'sendingMail' | 'counterInProgress' | '' = '';
	let timer = 0;
	const countdownTime = 30;

	function startTimer() {
		const interval = setInterval(() => {
			if (timer > 0) {
				timer--;
			} else {
				status = '';
				clearInterval(interval);
			}
		}, 1000);
	}

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		try {
			if (data.remember2) return;
			data.email = (data.email as string).toLowerCase();
			if (validateEmail(data.email as string) === false) {
				emailError = 'Invalid email/Please enter a valid email';
				emailSuccess = '';
				return;
			} else {
				emailError = '';
				emailSuccess = '';
			}
			// console.log('data', data);
			status = 'sendingMail';
			const token = await getRecaptchaToken('FORGOT_PASSWORD');
			if (token) data.token = token;
			else data.token = '';
			// data.expectedAction = 'FORGOT_PASSWORD';
			// data.token = data['g-recaptcha-response'];
			// console.log('data', data);
			const response = await fetch('api/forgot-password', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			const res = await response.json();
			if (res.success) {
				console.log('success');
				status = 'counterInProgress';
				// status = '';
				emailSuccess = "If the email exists in our database, we'll send you a reset link.";
				timer = countdownTime;
				startTimer();
				return;
			}
			// console.log('res', res);
			emailError = res.message;
			emailSuccess = '';
			status = '';
		} catch (error) {
			status = '';
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
			<span class="label-text-alt text-error">{emailError}</span>
		{/if}
		{#if emailSuccess !== ''}
			<span class="label-text-alt text-green-500">{emailSuccess}</span>
		{/if}
	</label>
	<input type="text" id="required" name="remember2" class="hidden" />
	<div class="form-control mt-6">
		<button
			class="btn btn-primary"
			type="submit"
			disabled={status === 'sendingMail' || status === 'counterInProgress'}
		>
			{#if status === 'sendingMail'}
				<span class="loading loading-spinner"></span>
			{/if}
			{#if status === 'counterInProgress'}
				Wait {timer}s
			{/if}
			{#if status === ''}
				Send Reset Link
			{/if}
		</button>
		<!-- <button
			class="g-recaptcha btn btn-primary"
			type="submit"
			disabled={status === 'sendingMail' || status === 'counterInProgress'}
			data-sitekey={PUBLIC_RECAPTCHA_KEY}
			data-action="FORGOT_PASSWORD"
		>
			{#if status === 'sendingMail'}
				<span class="loading loading-spinner"></span>
			{/if}
			{#if status === 'counterInProgress'}
				Wait {timer}s
			{/if}
			{#if status === ''}
				Send Reset Link
			{/if}
		</button> -->
	</div>
</form>
