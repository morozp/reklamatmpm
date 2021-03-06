const config = require('./webpack.base.config');
const webpack = require('webpack');

config.plugins.push (
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
);

module.exports = config;
