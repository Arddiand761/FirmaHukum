'use strict';
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Pilih 'development' atau 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Penting untuk path asset yang benar
    clean: true, // Membersihkan folder dist sebelum build
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve dari folder dist
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true, // Aktifkan hot module replacement
    open: true, // Buka browser secara otomatis
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', // Simpan gambar di dist/images/ dengan nama asli
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // <--- INI YANG DIBUTUHKAN
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      inject: 'body', // Suntikkan bundle.js di bagian body
    }),
  ],
  // Tambahan untuk mempermudah debugging
  devtool: 'eval-source-map', // Hanya untuk development
};