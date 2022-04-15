const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AwesomeTypescriptLoader = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
    },
    extensions: ['.ts', '.js', '.json', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader',},
      {
        test: /\.(less|css)$/i,
        loader: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Paper Taffy',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
};
