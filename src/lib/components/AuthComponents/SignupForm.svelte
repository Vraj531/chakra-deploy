<script lang="ts">
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import { toastStore } from '$lib/stores/toastStores';
	import { getRecaptchaToken } from '$lib/utils/getRecaptchaToken';

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		try {
			if (data.remember2) return;
			data.email = (data.email as string).toLowerCase();
			if (validateEmail(data.email as string) === false) {
				toastStore.alert('Invalid email/Please enter a valid email', { position: 'bottom-end' });
				return;
			}
			// if (validatePassword(data.password as string) === false) {
			// 	toastStore.alert('Invalid password/Please enter a valid password', {
			// 		position: 'bottom-end'
			// 	});
			// 	return;
			// }
			// console.log('data', data);
			if (data.password !== data.confirmPassword) {
				toastStore.alert('Passwords do not match', { position: 'bottom-end' });
				return;
			}
			// console.log('data', data);

			// console.log('data', window.grecaptcha);
			data.token = await getRecaptchaToken('SIGNUP');
			data.expectedAction = 'SIGNUP';
			// data.token = data['g-recaptcha-response'];
			console.log('data', data);
			const res = await fetch('api/signup', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			console.log('response', await res.json());
		} catch (error) {
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
	<!-- login form -->
	<label class="form-control w-full">
		<span class="label-text">Email</span>
		<input type="text" placeholder="email" class="input input-bordered" name="email" />
	</label>

	<input type="text" id="remember2" name="remember2" class="hidden" />

	<label class="form-control w-full">
		<span class="label-text">Password</span>
		<input type="password" placeholder="password" class="input input-bordered" name="password" />
	</label>
	<label class="form-control w-full">
		<span class="label-text">Confirm Password</span>
		<input
			type="text"
			placeholder="password"
			class={`input input-bordered input-warning`}
			name="confirmPassword"
		/>
	</label>

	<!-- <div class="g-recaptcha" data-sitekey={PUBLIC_RECAPTCHA_KEY} data-action="SIGNUP"></div> -->
	<!-- <div
		class="g-recaptcha"
		data-sitekey="6LfGWgIqAAAAAIJV6ihQg4fiNC54gOOx4AcOK3vU"
		data-action="LOGIN"
	></div> -->

	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Login</button>
	</div>
</form>
