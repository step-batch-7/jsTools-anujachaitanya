const assert = require("chai").assert;
const { performSort, sortForFile } = require("../src/performSort");

describe("sortForFile", () => {
  it("should return sorted contents if data is there", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortForFile(streams, { options: [] }, undefined, "a\nd\nc");
    const expected = "a\nc\nd";
    assert.strictEqual(actual, expected);
  });

  it("should return number sort if option -n is given", () => {
    const logger = function(data) {
      return data;
    };
    const streams = { error: {}, logger };
    const actual = sortForFile(
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
    const actual = sortForFile(
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
    const actual = sortForFile(
      streams,
      { options: ["-r", "-n"] },
      undefined,
      "1\n5\n3"
    );
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

  it("should readFile is path is given", () => {
    const error = function(error) {
      return error;
    };
    const streams = { error };

    const reader = function(path, encoding) {
      assert.strictEqual(path, "sample.txt");
      assert.strictEqual(encoding, "utf8");
      return true;
    };

    fsTools = { reader, encoding: "utf8" };
    const actual = performSort(["sample.txt"], fsTools, streams);
    assert.ok(actual);
  });
});
