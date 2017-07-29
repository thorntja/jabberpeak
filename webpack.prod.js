const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const BUILD_DIR = resolve(__dirname, 'public/scripts');
const APP_DIR = resolve(__dirname, 'src');
const PUBLIC_DIR = resolve(__dirname, 'public');

const VENDOR_LIBS = [
	'react',
	'react-dom',
];

module.exports = {
  entry: {
		bundle: APP_DIR + '/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].chunk.js',
		publicPath: '/scripts/',
	},

	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
				include : APP_DIR,
				options: {
					presets: [
						[
							'env',
							{ modules: false }
						],
						'react'
					],
					plugins: [ 'syntax-dynamic-import' ]
				}
			},
			{
				use: ExtractTextPlugin.extract(['css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]",camelCase']),
				test: /\.css$/
			},
			{
				loader: 'json-loader',
				test: /\.json$/
			}
		],
	},

	plugins: [
		new ExtractTextPlugin({
			filename: 'styles.[chunkhash:6].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
			minChunks: Infinity,
		}),
		new HTMLWebpackPlugin({
			inject: false,
			filename: '../index.html',
			template: 'scripts/index.ejs',
			minify: {
				collapseBooleanAttributes: true,
				removeComments: true,
				collapseWhitespace: true,
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				// keep_fnames: true
			},
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html|css)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],

	resolve: {
		alias: {
			app: APP_DIR,
			public: PUBLIC_DIR
		},
	}
}
