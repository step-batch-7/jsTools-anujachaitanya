const assert = require("chai").assert;
const {
  parseUserArgs,
  getInvalidOption,
  separateUserArgs
} = require("../src/optionParsing");

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
      options: [],
      invalidOption: undefined
    };
    const actual = parseUserArgs(["sample.txt"]);
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

describe("separateUserArgs", () => {
  it("should return empty array if options are not given", () => {
    const expected = { path: "sample.txt", options: [] };
    const actual = separateUserArgs(["sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should return path undefined if no path is given", () => {
    const expected = { path: undefined, options: [] };
    const actual = separateUserArgs([]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should return options if only options are given", () => {
    const expected = { path: undefined, options: ["-r", "-n"] };
    const actual = separateUserArgs(["-r", "-n"]);
    assert.deepStrictEqual(actual, expected);
  });
});
