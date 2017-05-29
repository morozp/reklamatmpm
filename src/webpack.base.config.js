const webpack = require("webpack");
const path = require('path');


const config = {   
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    
}

module.exports = config;