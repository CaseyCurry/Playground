const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = common.map(x => {
  if (x.name === "app") {
    // This is used to log bus activity to the console.
    const defineDevEnvironment = new webpack.DefinePlugin({
      'process.env': {
        DEV: JSON.stringify(true)
      }
    });
    x.plugins.push(defineDevEnvironment);
  }
  return Object.assign({}, x/*, {
    mode: "development"
  }*/);
});