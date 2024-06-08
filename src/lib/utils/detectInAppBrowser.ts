export function isInAppBrowser() {
	const userAgent = navigator.userAgent || navigator.vendor;

	// Check for common in-app browser user agents
	const inAppBrowserAgents = [
		'FBAN', // Facebook
		'FBAV', // Facebook
		'Instagram',
		'Twitter',
		'LinkedIn',
		'TikTok'
	];

	const val = inAppBrowserAgents.some((agent) => userAgent.includes(agent));

	return { userAgent: userAgent, inAppBrowser: val };
}

export function detectInAppBrowser() {
	const navigator = window.navigator;
	const userAgent = navigator.userAgent;
	const normalizedUserAgent = userAgent.toLowerCase();
	// const standalone = navigator?.standalone;

	const isIos =
		/ip(ad|hone|od)/.test(normalizedUserAgent) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
	const isAndroid = /android/.test(normalizedUserAgent);
	const isSafari = /safari/.test(normalizedUserAgent);
	const isWebview = (isAndroid && /; wv\)/.test(normalizedUserAgent)) || (isIos && !isSafari);

	let mobileView = false;
	if (isIos || isAndroid) {
		mobileView = true;
	}
	if (isWebview) {
		mobileView = true;
	}
	return { userAgent: userAgent, inAppBrowser: mobileView };
	// const osText = isIos ? 'iOS' : isAndroid ? 'Android' : 'Other';
	// const webviewText = isWebview ? 'Yes' : 'No';
}
