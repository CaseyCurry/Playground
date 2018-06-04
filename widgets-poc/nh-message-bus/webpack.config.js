/* eslint-env node */
"use strict";

const path = require("path");

module.exports = [{
  name: "library",
  context: __dirname,
  target: "web",
  entry: ["./src/bus.js"],
  output: {
    path: path.join(__dirname, "lib"),
    filename: "bus.js",
    library: "nhBrowserBus",
    libraryTarget: "var"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
}];