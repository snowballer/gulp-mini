//模块化时采用webpack进行打包
var webpack = require('webpack');
const path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: {
    index:'./src/js/index.js',
    demo:'./src/js/demo.js'
  },
  output: {
    path: path.resolve(__dirname) + '/dist/js',
    filename: '[name].js'
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
},
plugins: [
  //压缩模块化js代码
    new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
     },
     output: {
       comments: false,
     },
    })
  ]
};
