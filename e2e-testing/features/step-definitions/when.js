"use strict";

module.exports = function when() {
  this.When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
  );
  this.When(
    /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
    clickElement
  );
};

const setInputField = (method, value, element, done) => {
  const command = (method === "add") ? "addValue" : "setValue";
  browser[command](element, value);
  done();
};

const clickElement = (action, type, element, done) => {
  const elem = (type === "link") ? `=${element}` : element;
  const method = (action === "click") ? "click" : "doubleClick";
  browser[method](elem);
  done();
};
