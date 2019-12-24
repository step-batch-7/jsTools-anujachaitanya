const assert = require("chai").assert;
const {
  sort,
  parseUserArgs,
  generateErrorMsg,
  getInvalidOption
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
    const contents = {
      lines: [4, 3, 2, 1],
      options: ["-n"],
      invalidOption: undefined
    };
    const expected = [1, 2, 3, 4];
    const actual = sort(contents);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseUserArgs", () => {
  it("should return path for given arguments", () => {
    const expected = {
      path: "sample.txt",
      options: [],
      invalidOption: undefined
    };
    const actual = parseUserArgs(["sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should return path and options if options are there", () => {
    const expected = {
      path: "sample.txt",
      options: ["-r"],
      invalidOption: undefined
    };
    const actual = parseUserArgs(["-r", "sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should parse the args for -n and -r both", () => {
    const expected = {
      path: "sample.txt",
      options: ["-r", "-n"],
      invalidOption: undefined
    };
    const actual = parseUserArgs(["-r", "-n", "sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getInvalidOption", () => {
  it("should return invalid options", () => {
    assert.strictEqual(getInvalidOption(["-x"]), "-x");
  });

  it("should return undefined for valid options", () => {
    assert.isUndefined(getInvalidOption(["-r"]));
  });

  it("should return invalid options if others are valid options", () => {
    assert.strictEqual(getInvalidOption(["-r", "-x"]), "-x");
  });

  it("should return undefined for options -n", () => {
    assert.isUndefined(getInvalidOption(["-n"]));
  });
});
