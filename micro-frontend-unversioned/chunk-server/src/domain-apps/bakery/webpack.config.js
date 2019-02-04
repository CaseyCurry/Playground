/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = [
  {
    mode: "development",
    name: "app",
    context: __dirname,
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "dist", "app"),
      filename: "index.min.js"
    },
    devServer: {
      historyApiFallback: true,
      port: 8092
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "eslint-loader"
            }
          ]
        },
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.(sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devtool: "inline-sourcemap",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "src/index.html")
      }),
      new MiniCssExtractPlugin()
    ]
  },
  {
    mode: "development",
    name: "chunk",
    context: __dirname,
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "dist", "chunk"),
      filename: "index.min.js"
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "eslint-loader"
            }
          ]
        },
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.(sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devtool: "inline-sourcemap",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "src/chunk.html"),
        inject: false,
        templateParameters: function(compilation, assets, options) {
          return {
            files: assets,
            options: options,
            webpackConfig: compilation.options,
            webpack: compilation.getStats().toJson()
          };
        }
      }),
      new MiniCssExtractPlugin()
    ]
  }
];
