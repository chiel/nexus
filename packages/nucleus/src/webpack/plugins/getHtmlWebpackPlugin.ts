import HtmlWebpackPlugin from 'html-webpack-plugin';

export const DEFAULT_TEMPLATE = `<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Page Title</title>
	</head>
	<body>
		<div id="app-root"></div>
	</body>
</html>`;

export default function getHtmlWebpackPlugin() {
	return new HtmlWebpackPlugin({
		publicPath: '/',
		templateContent: DEFAULT_TEMPLATE,
	});
}
