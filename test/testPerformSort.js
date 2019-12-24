const assert = require("chai").assert;
const { performSort, sortForFile } = require("../src/performSort");

describe("sortForFile", () => {
  it("should return sorted contents if data is there", () => {
    const actual = sortForFile(["a", "d", "c"]);
    const expected = "a\nc\nd";
    assert.strictEqual(actual, expected);
  });
});

describe("performSort", () => {
  it("should return sorted contents if file is present", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "sample.txt");
      assert.strictEqual(encoding, "utf8");
      return "s\na";
    };

    const exists = function(path) {
      assert.strictEqual(path, "sample.txt");
      return true;
    };
    const fsTools = { reader, exists, encoding: "utf8" };
    const actual = performSort(["sample.txt"], fsTools);
    const expected = { lines: "a\ns" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should throw error if file is not present", () => {
    const exists = function(path) {
      assert.strictEqual(path, "sample.txt");
      return false;
    };
    const fsTools = { reader: "", exists, encoding: "utf8" };
    const actual = performSort(["sample.txt"], fsTools);
    const expected = { error: "sort: No such a file or directory" };
    assert.deepStrictEqual(actual, expected);
  });
});
