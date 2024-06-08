const rules = [
	// if it says it's a webview, let's go with that
	'WebView',
	// iOS webview will be the same as safari but missing "Safari"
	'(iPhone|iPod|iPad)(?!.*Safari)',
	// Android Lollipop and Above: webview will be the same as native but it will contain "wv"
	// Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
	'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
	// old chrome android webview agent
	'Linux; U; Android'
];

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

	const webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig');

	const isWebview = !!userAgent.match(webviewRegExp);

	// const isWebview = /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);

	return { userAgent: userAgent, inAppBrowser: isWebview };
	// const osText = isIos ? 'iOS' : isAndroid ? 'Android' : 'Other';
	// const webviewText = isWebview ? 'Yes' : 'No';
}
