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
    assert.throws(() => performSort("sample.txt", fsModule), Error);
  });
});
