const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/scripts/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /[\.js]$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src/scripts')],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src/scripts'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'typescript-tutorial',
      template: './index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    watchFiles: ['./index.html'],
  },
};
