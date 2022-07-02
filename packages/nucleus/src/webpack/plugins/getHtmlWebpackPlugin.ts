import HtmlWebpackPlugin from 'html-webpack-plugin';

export default function getHtmlWebpackPlugin() {
	return new HtmlWebpackPlugin({ publicPath: '/' });
}
