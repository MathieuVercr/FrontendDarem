const webpack = require("webpack"),
      path = require("path"),
      cleanWebpackPlugin = require("clean-webpack-plugin"),
      extractPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./src/js/index.js', './src/scss/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new cleanWebpackPlugin('[dist/js]'),
    new extractPlugin({
      filename: '../css/index.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        loader: extractPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  }

}
