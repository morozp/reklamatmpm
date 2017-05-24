const webpack = require("webpack");
const baseConfig = require('./webpack.base.config');

baseConfig.devtool ='source-map',

baseConfig.plugins = [  
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
];


module.exports = baseConfig;