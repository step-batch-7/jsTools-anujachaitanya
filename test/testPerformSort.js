const assert = require("chai").assert;
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
    assert.strictEqual(actual, expected);
  });
});
