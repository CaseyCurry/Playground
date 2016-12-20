"use strict";

module.exports = function given() {
  this.Given(
    /^I open the (url|site) "([^"]*)?"$/,
    openWebsite
  );
};

const openWebsite = (type, page, done) => {
  const url = (type === "url") ? page : browser.options.baseUrl + page;
  browser.url(url);
  done();
};
