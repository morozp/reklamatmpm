const webpack = require("webpack");
const path = require('path');


const config = {
	entry: './src/client/index.jsx',
	output: {
		filename: 'bundle.index.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV'])
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query:
				{
					presets: ['react']
				}
			},
			{
				test: /\.less$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "less-loader", options: {
						strictMath: true,
						noIeCompat: true
					}
				}]
			},
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000' 
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}

module.exports = config;