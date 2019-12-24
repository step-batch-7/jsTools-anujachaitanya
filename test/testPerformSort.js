const assert = require("chai").assert;
const { performSort, sortLines } = require("../src/performSort");

describe("sortLines", () => {
  it("should return sorted contents if data is there", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortLines(streams, { options: [] }, "a\nd\nc");
    const expected = "a\nc\nd";
    assert.strictEqual(actual, expected);
  });

  it("should return number sort if option -n is given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortLines(streams, { options: ["-n"] }, "1\n5\n3");
    const expected = "1\n3\n5";
    assert.strictEqual(actual, expected);
  });

  it("should return number sort if option -r is given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortLines(streams, { options: ["-r"] }, "a\nb\nc");
    const expected = "c\nb\na";
    assert.strictEqual(actual, expected);
  });

  it("should sort if -r and -n both options are given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortLines(streams, { options: ["-r", "-n"] }, "1\n5\n3");
    const expected = "5\n3\n1";
    assert.strictEqual(actual, expected);
  });
});

describe("performSort", () => {
  it("should return error for invalid options", () => {
    const error = function(error) {
      return error;
    };
    const streams = { error };
    const actual = performSort(["sample.txt", "-x"], {}, streams);
    const expected = "Option -x: invalid options";
    assert.strictEqual(actual, expected);
  });

  it("should return error if callback receives error", () => {
    const error = function(error) {
      return error;
    };
    const streams = { error };
    const foo = function(error, data) {
      return;
    };
    const reader = function(path, encoding, foo) {
      assert.strictEqual(path, "sample.txt");
      assert.strictEqual(encoding, "utf8");
      foo("abc");
    };
    reader.bind(null, foo);

    fsTools = { reader, encoding: "utf8" };
    const actual = performSort(["sample.txt"], fsTools, streams);
    const expected = "sort: No such a file or directory";
    assert.strictEqual(actual, expected);
  });
});
