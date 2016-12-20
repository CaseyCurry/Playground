"use strict";

module.exports = function then() {
  this.Then(
    /^I expect that (element|inputfield) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContent
  );
};

const checkContent = (type, element, falseCase, expectedText, done) => {
  const command = (type !== "inputfield") ? "getText" : "getValue";
  let doneCallback = done;
  let parsedExpectedText = expectedText;
  let boolFalseCase = !!falseCase;

  if (!doneCallback && typeof parsedExpectedText === "function") {
    doneCallback = parsedExpectedText;
    parsedExpectedText = "";
    boolFalseCase = !boolFalseCase;
  }

  if (parsedExpectedText === undefined && falseCase === undefined) {
    parsedExpectedText = "";
    boolFalseCase = true;
  }

  const text = browser[command](element);

  if (boolFalseCase) {
    parsedExpectedText.should.not.equal(text);
  } else {
    parsedExpectedText.should.equal(text);
  }

  doneCallback();
};
