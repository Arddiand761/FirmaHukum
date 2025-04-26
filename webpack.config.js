'use strict';
const path = require('path');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },


  mode: 'production',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  
  module: {
    rules: [
      /* style and css loader */
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Gunakan Dart Sass
              sassOptions: {
                quietDeps: true // Suppress deprecation warnings
              }
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
    }),
  ],
};
