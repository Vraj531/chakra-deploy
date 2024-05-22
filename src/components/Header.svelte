<script lang="ts">
	export let userData;
	console.log('user data', userData);
</script>

<header
	class="px-4 py-2.5 dark:bg-gray-800 h-full w-full bg-secondary-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border border-gray-100 navbar"
>
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Item 1</a></li>
				<li>
					<a href="/">Parent</a>
					<ul class="p-2">
						<li><a href="/">Submenu 1</a></li>
						<li><a href="/">Submenu 2</a></li>
					</ul>
				</li>
				<li><a href="/">Item 3</a></li>
			</ul>
		</div>
		<a class="btn btn-ghost text-xl" href="/">NextJob Ai</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">About Us</a></li>
			<li><a href="/">Pricing</a></li>
			<li><a href="/">Try us now!</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		{#if !userData?.picture}
			<a class="btn" href="/google">Login</a>
		{:else}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-circle btn-secondary">
					<div class="text-xl">{userData.name[0]}</div>
					<!-- <img class="w-10 h-10 rounded-full" src={userData?.picture} alt="avatar" /> -->
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/upload">Upload Resume</a></li>
					<li><a href="/api/sign-out">Log out</a></li>
				</ul>
			</div>
		{/if}
	</div>
</header>
<!-- <div
	class="flex justify-between items-center h-full w-full bg-secondary-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100"
>

	<a href="/" class="md:w-full md:flex md:justify-center">
		<div class="flex md:place-content-center items-center my-2">

			<p class="text-3xl font-semibold md:text-center font-mono" data-testid="stream-bin">
				NextJob Ai
			</p>
		</div>
	</a>
	<IconHeart />

	<button name="information-button" class="btn md:hidden block text-lg">
		<iconify-icon icon="mdi:home"></iconify-icon>
	</button>
</div> -->
