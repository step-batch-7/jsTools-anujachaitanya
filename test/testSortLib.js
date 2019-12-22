const assert = require("chai").assert;
const { sort, loadContents, parseUserArgs } = require("../src/sortLib");
const fs = require("fs");

describe("formatLines", () => {
  it("should sort the given lines on the basis of ascii values", () => {
    const expected = ["a", "c", "d", "e"];
    const actual = sort(["a", "e", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort the given lines if one or more lines starts with special characters", () => {
    const expected = ["*a", "a*", "c", "d"];
    const actual = sort(["a*", "*a", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort given lines if one or more lines starts with space", () => {
    const expected = [" a", "*a", "c", "d"];
    const actual = sort([" a", "*a", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("loadContents", () => {
  const reader = function(filePath) {
    assert.strictEqual(filePath, "sample.txt");
    return "a\nb\nc\nd";
  };

  const exists = function(filePath) {
    assert.strictEqual(filePath, "sample.txt");
    return true;
  };

  const fsModule = { reader, exists, encoding: "utf8" };

  it("should return fileContents splitted with new lines", () => {
    const actual = loadContents("sample.txt", fsModule);
    const expected = ["a", "b", "c", "d"];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseUserArgs", () => {
  it("should return path for given arguments", () => {
    const actual = "sample.txt";
    const expected = parseUserArgs(["sample.txt"]);
    assert.strictEqual(actual, expected);
  });
});
