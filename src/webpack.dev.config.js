const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

baseConfig.devtool ='source-map',

baseConfig.plugins.push (
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
);


module.exports = baseConfig;