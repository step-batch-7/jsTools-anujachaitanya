const assert = require("chai").assert;
const {
  sort,
  loadContents,
  parseUserArgs,
  generateErrorMsg,
  areOptionsValid
} = require("../src/sortLib");
const fs = require("fs");

describe("sort", () => {
  it("should sort the given lines on the basis of ascii values", () => {
    const contents = { lines: ["a", "e", "c", "d"], options: [] };
    const expected = ["a", "c", "d", "e"];
    const actual = sort(contents);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort the given lines if one or more lines starts with special characters", () => {
    const contents = { lines: ["a*", "*a", "c", "d"], options: [] };
    const expected = ["*a", "a*", "c", "d"];
    const actual = sort(contents);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort given lines if one or more lines starts with space", () => {
    const contents = { lines: [" a", "*a", "c", "d"], options: [] };
    const expected = [" a", "*a", "c", "d"];
    const actual = sort(contents);
    assert.deepStrictEqual(actual, expected);
  });

  it("should reverse sort if -r option is given", () => {
    const contents = { lines: ["a", "e", "c", "d"], options: ["-r"] };
    const expected = ["e", "d", "c", "a"];
    const actual = sort(contents);
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if -n option is given", () => {
    const contents = { lines: [4, 3, 2, 1], options: ["-n"] };
    const expected = [1, 2, 3, 4];
    const actual = sort(contents);
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
    const expected = { lines: ["a", "b", "c", "d"] };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return error object if given file is not present", () => {
    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return false;
    };

    const fsModule = { reader: "", exists, encoding: "utf8" };
    const actual = loadContents("sample.txt", fsModule);
    const expected = {
      error: "No such a file or directory",
      sub: "sample.txt"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseUserArgs", () => {
  it("should return path for given arguments", () => {
    const expected = { path: "sample.txt", options: [] };
    const actual = parseUserArgs(["sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should return path and options if options are there", () => {
    const expected = { path: "sample.txt", options: ["-r"] };
    const actual = parseUserArgs(["-r", "sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should throw error for invalid options", () => {
    assert.throws(() => parseUserArgs(["-x", "sample.txt"]), Error);
  });

  it("should parse the args for -n and -r both", () => {
    const expected = { path: "sample.txt", options: ["-r", "-n"] };
    const actual = parseUserArgs(["-r", "-n", "sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("generateErrorMsg", () => {
  it("should return error with given msg", () => {
    const contents = { error: "no", sub: "file" };
    assert.throws(() => generateErrorMsg(contents), Error);
  });
});

describe("areOptionsValid", () => {
  it("should throw error for invalid option", () => {
    assert.throws(() => areOptionsValid(["-x"]), Error);
  });

  it("shouldn't throw error if options are valid", () => {
    assert.ok(areOptionsValid(["-r"]));
  });

  it("should throw error if one option is invalid and others are valid", () => {
    assert.throws(() => areOptionsValid(["r", "-x"]), Error);
  });

  it("should validate if given option is -n ", () => {
    assert.ok(areOptionsValid(["-n"]));
  });
});
