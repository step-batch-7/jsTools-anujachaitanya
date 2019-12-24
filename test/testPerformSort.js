const assert = require("chai").assert;
const { performSort, performSortForFile } = require("../src/performSort");

describe("performSortForFile", () => {
  it("should return error if error is given", () => {
    const error = function(error) {
      return error;
    };
    const streams = { error, logger: {} };
    const actual = performSortForFile(streams, {}, "ENOENT", undefined);
    const expected = "sort: No such a file or directory";
    assert.strictEqual(actual, expected);
  });

  it("should return sorted contents if data is there", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = performSortForFile(
      streams,
      { options: [] },
      undefined,
      "a\nd\nc"
    );
    const expected = "a\nc\nd";
    assert.strictEqual(actual, expected);
  });

  it("should return number sort if option -n is given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = performSortForFile(
      streams,
      { options: ["-n"] },
      undefined,
      "1\n5\n3"
    );
    const expected = "1\n3\n5";
    assert.strictEqual(actual, expected);
  });

  it("should return number sort if option -r is given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = performSortForFile(
      streams,
      { options: ["-r"] },
      undefined,
      "a\nb\nc"
    );
    const expected = "c\nb\na";
    assert.strictEqual(actual, expected);
  });

  it("should sort if -r and -n both options are given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = performSortForFile(
      streams,
      { options: ["-r", "-n"] },
      undefined,
      "1\n5\n3"
    );
    const expected = "5\n3\n1";
    assert.strictEqual(actual, expected);
  });
});
