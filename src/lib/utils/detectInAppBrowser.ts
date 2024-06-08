const rules = [
	'WebView', // General webview indicator
	'(iPhone|iPod|iPad)(?!.*Safari)', // iOS webview not containing Safari
	'Android.*(;\\s*wv|Version/\\d+\\.\\d+\\s+Chrome/\\d+\\.\\d+\\.\\d+\\.\\d+)', // Android webview indicators
	'Linux; U; Android', // Old Android webview pattern
	'Chrome/[.0-9]* Mobile Safari/[.0-9]*', // General Android Chrome mobile
	'Mobile Safari/[.0-9]*' // General mobile Safari
];

export function detectInAppBrowser() {
	// const navigator = window.navigator;
	const userAgent = navigator.userAgent;
	// const userAgent =
	// 	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36';

	const webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig');

	const isWebview = !!userAgent.match(webviewRegExp);
	console.log('web view', isWebview, userAgent.match(webviewRegExp));
	// const isWebview = /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);

	return { userAgent: userAgent, inAppBrowser: isWebview };
	// const osText = isIos ? 'iOS' : isAndroid ? 'Android' : 'Other';
	// const webviewText = isWebview ? 'Yes' : 'No';
}
