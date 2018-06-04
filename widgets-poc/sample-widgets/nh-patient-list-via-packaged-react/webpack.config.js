/* eslint-env node */
"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

const html = {
  filename: "index.html",
  template: path.join(__dirname, "src/index.html")
};

module.exports = [{
  name: "app",
  context: __dirname,
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.min.js"
  },
  devServer: {},
  module: {
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.scss/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader",
          "sass-loader"
        ]
      })
    }]
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".css"
    ]
  },
  devtool: "inline-sourcemap",
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, "dist")),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      filename: html.filename,
      template: html.template
    })
  ]
}, {
  name: "library",
  context: __dirname,
  entry: ["./src/Widget.jsx"],
  output: {
    path: path.join(__dirname, "lib"),
    filename: "app.min.js",
    library: "nhWidgetPatientListViaPackagedReact",
    libraryTarget: "var"
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "nh-browser-bus": "nhBrowserBus"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.scss/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader",
          "sass-loader"
        ]
      })
    }]
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".scss"
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.join(__dirname, "lib")),
    new ExtractTextPlugin("patients-list-via-packaged-react.css")
  ]
}];