var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/main.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
        exclude: /node_modules/,
				loader: 'babel-loader',
				test: path.join(__dirname, 'src'),
				query: {
					presets: ['es2015', 'react']
				},
			}
		]
	},
	plugins: [
		// Avoid publishing files when compilation fails
		new webpack.NoErrorsPlugin()
	],
	stats: {
		// Nice colored output
		colors: true
	},
	// Create Sourcemaps for the bundle
	devtool: 'source-map',
};
