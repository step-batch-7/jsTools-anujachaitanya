const assert = require("chai").assert;
const {
  sortLines,
  parseUserArgs,
  getInvalidOption
} = require("../src/sortLib");

describe("sortLines", () => {
  it("should sort given strings if no options are given", () => {
    const expected = "a\nb";
    const actual = sortLines([], "b\na");
    assert.deepStrictEqual(actual, expected);
  });

  it("should reverse sort if no options are given", () => {
    const expected = "b\na";
    const actual = sortLines(["-r"], "a\nb");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if -n is given", () => {
    const expected = "1\n2\n3";
    const actual = sortLines(["-n"], "2\n3\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should do both number and reverse sort if both options are given", () => {
    const expected = "3\n2\n1";
    const actual = sortLines(["-n", "-r"], "2\n3\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if both strings and numbers are given", () => {
    const expected = "a\n1\n2";
    const actual = sortLines(["-n"], "2\na\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number and reverse sort if both strings and numbers are given", () => {
    const expected = "2\n1\na";
    const actual = sortLines(["-n", "-r"], "2\na\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort if both numbers and strings are given", () => {
    const expected = "1\n2\na";
    const actual = sortLines([], "2\na\n1");
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
