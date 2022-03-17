const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },
  entry: './src/scripts/app.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /[\.js]$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  targets: {
                    browsers: ['last 3 versions', 'ie >= 11'],
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src/scripts')],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_module/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
            fallback: 'file-loader',
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
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
      filename: 'css/style.css',
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
