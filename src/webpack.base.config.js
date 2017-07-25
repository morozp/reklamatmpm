const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: {
		index: './src/client/index.jsx',
		vendor: ['jquery', 'bootstrap', 'react', 'react-dom','react-router-dom']
	},
	output: {
		filename: 'bundle.[name].js',
		path: path.resolve(__dirname, 'server/dist'),
	},
	plugins: [
		//new webpack.EnvironmentPlugin(['NODE_ENV']),
		new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'bundle.common.js' }),
		new ExtractTextPlugin("[name].css"),

	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query:
				{
					presets: ['es2015']
				}
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query:
				{
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader', 'less-loader']
				})
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=1000'
			},
			{ test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}

module.exports = config;