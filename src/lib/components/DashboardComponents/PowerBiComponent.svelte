<script lang="ts">
	import { onMount } from 'svelte';
	import * as powerbi from 'powerbi-client';
	import type { IEmbedConfigurationBase } from 'embed';
	import type { IComponentEmbedConfiguration } from 'service';

	export let embedUrl;
	export let embedToken;
	export let reportId;

	let reportContainer: HTMLDivElement;

	const {
		service,
		factories,
		models: { TokenType, BackgroundType, LayoutType }
	} = powerbi;

	onMount(() => {
		if (!reportContainer) return;

		reportContainer.style.height = '100vh';
		reportContainer.style.width = '100%';

		const powerbiService = new service.Service(
			factories.hpmFactory,
			factories.wpmpFactory,
			factories.routerFactory
		);

		const embedConfig: IComponentEmbedConfiguration | IEmbedConfigurationBase = {
			type: 'report',
			id: reportId,
			embedUrl,
			accessToken: embedToken,
			tokenType: TokenType.Aad,
			settings: {
				panes: {
					filters: {
						expanded: false,
						visible: false
					}
				},
				background: BackgroundType.Default,
				layoutType: detectMob() ? LayoutType.MobilePortrait : LayoutType.Master
			}
		};

		const report = powerbiService.embed(reportContainer, embedConfig);

		report.on('loaded', function () {
			console.log('Report loaded');
		});

		report.on('rendered', function () {
			console.log('Report rendered');
		});

		report.on('error', function (event) {
			console.error(event.detail);
		});
	});

	function detectMob() {
		return window.innerWidth <= 800 && window.innerHeight <= 600;
	}
</script>

<div bind:this={reportContainer} class="min-h-screen w-full"></div>
