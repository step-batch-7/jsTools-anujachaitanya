const assert = require("chai").assert;
const {
  sortByOptions,
  parseUserArgs,
  getInvalidOption
} = require("../src/sortLib");
const fs = require("fs");

describe("sort", () => {
  it("should reverse sort if -r option is given", () => {
    const expected = ["e", "d", "c", "a"];
    const actual = sortByOptions(["-r"], ["a", "c", "d", "e"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if -n option is given", () => {
    const expected = [1, 2, 3, 4];
    const actual = sortByOptions(["-n"], [1, 2, 4, 3]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort if both -r and -n options are given", () => {
    const expected = [4, 3, 2, 1];
    const actual = sortByOptions(["-n", "-r"], [1, 2, 4, 3]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort strings and numbers together if -n and -r option is given", () => {
    const expected = [4, 3, 1, "a"];
    const actual = sortByOptions(["-n", "-r"], [1, 4, 3, "a"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if -n option is given", () => {
    const expected = [1, 2, 3, 4];
    const actual = sortByOptions(["-n"], [4, 3, 2, 1]);
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
