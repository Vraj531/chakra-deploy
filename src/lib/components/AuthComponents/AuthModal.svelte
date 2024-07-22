<script lang="ts">
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import ForgotPassword from '$lib/components/AuthComponents/ForgotPassword.svelte';
	import SignupForm from '$lib/components/AuthComponents/SignupForm.svelte';
	import LoginForm from './LoginForm.svelte';

	let activeTab = 0;
</script>

<svelte:head>
	<script
		src={`https://www.google.com/recaptcha/enterprise.js?render=${PUBLIC_RECAPTCHA_KEY}`}
	></script>
</svelte:head>
<dialog id="auth-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="container p-2">
			<div role="tablist" class="tabs tabs-lifted tabs-lg mb-1">
				<!-- svelte-ignore a11y-missing-attribute -->
				<button
					role="tab"
					id="tab1"
					class={`tab`}
					class:tab-active={activeTab === 0}
					on:click={() => (activeTab = 0)}>Login</button
				>
				<!-- svelte-ignore a11y-missing-attribute -->
				<button
					role="tab"
					class={`tab`}
					id="tab2"
					class:tab-active={activeTab === 1}
					on:click={() => (activeTab = 1)}>Sign Up</button
				>
			</div>
			<div class:hidden={activeTab !== 0}>
				<LoginForm toForgotPassword={() => (activeTab = 2)} />
			</div>
			<div class:hidden={activeTab !== 1}>
				<SignupForm />
			</div>
			<div class:hidden={activeTab !== 2}><ForgotPassword /></div>
		</div>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button class="">close</button>
	</form>
</dialog>
