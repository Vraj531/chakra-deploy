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

	return inAppBrowserAgents.some((agent) => userAgent.includes(agent));
}
