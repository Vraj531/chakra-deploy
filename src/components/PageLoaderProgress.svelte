<script lang="ts">
	import { navigating } from '$app/stores';

	let loading = 'no';
	let percentage = 0;

	$: {
		if ($navigating) {
			loading = 'yes';
		} else {
			loading = 'closing';
			setTimeout(() => {
				loading = 'no';
			}, 300);
		}
	}
	$: {
		if (loading === 'closing') {
			percentage = 1;
		}
	}

	function load(_node: any) {
		let timeout: any;
		const handle = () => {
			if (percentage < 0.7) {
				percentage += Math.random() * 0.3;
				timeout = setTimeout(handle, Math.random() * 1000);
			}
		};
		handle();
		return {
			destroy() {
				clearTimeout(timeout);
				percentage = 0;
			}
		};
	}
</script>

{#if loading !== 'no'}
	<div use:load style:--percentage={percentage} class="custom-progress" />
{/if}

<style p>
	.custom-progress {
		position: fixed;
		inset: 0;
		bottom: auto;
		height: var(--loader-height, 0.5vh);
		transform-origin: left;
		transform: scaleX(calc(var(--percentage) * 100%));
		background-color: #ffb700;
		transition: transform 550ms;
		z-index: 9999;
	}
</style>
