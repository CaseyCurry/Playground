const common = require("./webpack.common.js");

module.exports = common.map(x => {
  return Object.assign({}, x, {
    mode: "production"
  });
});