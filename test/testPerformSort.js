const assert = require("chai").assert;
<<<<<<< HEAD
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
=======
const { performSort } = require("../src/performSort");

describe("performSort", () => {
  const reader = function(filePath) {
    assert.strictEqual(filePath, "sample.txt");
    return "a\nb\nc\nd";
  };

  const exists = function(filePath) {
    assert.strictEqual(filePath, "sample.txt");
    return true;
  };

  const fsModule = { reader, exists, encoding: "utf8" };
  it("should return sorted lines if given file is present", () => {
    const actual = performSort(["sample.txt"], fsModule);
    const expected = "a\nb\nc\nd";
    assert.strictEqual(actual, expected);
  });

  it("should throw error if given file is not present", () => {
    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return false;
    };
    const fsModule = { reader: "", exists, encoding: "utf8" };
    assert.throws(() => performSort(["sample.txt"], fsModule), Error);
  });

  it("should reversely sort lines if -r options is given", () => {
    const reader = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return "a\nb\nc\nd";
    };

    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return true;
    };

    const fsModule = { reader, exists, encoding: "utf8" };
    const actual = performSort(["-r", "sample.txt"], fsModule);
    const expected = "d\nc\nb\na";
    assert.strictEqual(actual, expected);
  });

  it("should throw error for invalid options", () => {
    assert.throws(() => performSort(["-x", "sample.txt"], fsModule), Error);
  });

  it("should number sort if -n is given", () => {
    const reader = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return "1\n2\n3\n0";
    };

    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return true;
    };

    const fsModule = { reader, exists, encoding: "utf8" };
    const actual = performSort(["-n", "sample.txt"], fsModule);
    const expected = "0\n1\n2\n3";
>>>>>>> parent of fffe868... made async readFile and modified perform sort
    assert.strictEqual(actual, expected);
  });
});
