"use strict";

const expect = require("chai")
  .expect;

describe("bus test suite", () => {
  describe("unit test suite", () => {
    let bus = null;
    let eventName = null;
    let listener = null;

    beforeEach(() => {
      bus = require("./bus.js")
        .default;
      eventName = "TEST_EXECUTED";
    });

    afterEach(() => {
      bus.ignore(listener);
    });

    it("should execute listener if listening", () => {
      const event = {
        eventName,
        value: 1
      };
      listener = {
        eventName,
        respond: (x) => {
          expect(x)
            .to
            .equal(event);
          return Promise.resolve();
        }
      };
      bus.listen(listener);
      bus.notify(event);
    });

    it("should not execute listener if it is ignored", () => {
      const event = {
        eventName
      };
      listener = {
        eventName,
        respond: () => {
          throw new Error("This point should not be reached.");
        }
      };
      bus.listen(listener);
      bus.ignore(listener);
      bus.notify(event);
    });

    it("should execute multiple listeners", () => {
      const event = {
        eventName,
        value: 1
      };
      listener = {
        eventName,
        respond: (x) => {
          expect(x)
            .to
            .equal(event);
          return Promise.resolve();
        }
      };
      bus.listen(listener);
      const secondListener = {
        eventName,
        respond: (x) => {
          expect(x)
            .to
            .equal(event);
          return Promise.resolve();
        }
      };
      bus.listen(secondListener);
      bus.notify(event);
      bus.ignore(secondListener);
    });

    it("should report an error if a notified event doesn't have a name",
      async () => {
        const event = {};
        try {
          await bus.notify(event);
        } catch (error) {
          expect(error)
            .to
            .be
            .ok;
        }
      });

    it("should not report an error if an ignored event doesn't have a name",
      () => {
        const listener = {};
        try {
          bus.ignore(listener);
          expect(true)
            .to
            .equal(true);
        } catch (error) {
          throw new Error("This point should not be reached.");
        }
      });

    it("should report an error if a listener doesn't have a name", () => {
      const listener = {
        respond: () => {}
      };
      try {
        bus.listen(listener);
      } catch (error) {
        expect(error)
          .to
          .be
          .ok;
      }
    });

    it("should report an error if a listener doesn't have respond", () => {
      const listener = {
        eventName
      };
      try {
        bus.listen(listener);
      } catch (error) {
        expect(error)
          .to
          .be
          .ok;
      }
    });

    it("should not attempt to ignore a listener if it isn't listening", () => {
      listener = {
        eventName
      };
      bus.ignore(listener);
    });
  });
});