const assert = require("chai").assert;
const { parseUserArgs, getInvalidOption } = require("../src/optionParsing");
const USAGE =
  "Usage: sort [-bcCdfigMmnrsuz] [-kPOS1[,POS2] ... ] [+POS1 [-POS2]] [-S memsize] [-T tmpdir] [-t separator] [-o outfile] [--batch-size size] [--files0-from file] [--heapsort] [--mergesort] [--radixsort] [--qsort] [--mmap] [--parallel thread_no] [--human-numeric-sort] [--version-sort] [--random-sort [--random-source file]] [--compress-program program] [file ...]";

describe("parseUserArgs", () => {
  it("should return path for given arguments", () => {
    const expected = {
      path: "sample.txt",
      options: [],
      error: undefined
    };
    const actual = parseUserArgs(["sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should return path and options if options are there", () => {
    const expected = {
      path: "sample.txt",
      options: [],
      error: undefined
    };
    const actual = parseUserArgs(["sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });
  it("should parse the args for -n and -r both", () => {
    const expected = {
      path: "sample.txt",
      options: ["r", "n"],
      error: undefined
    };
    const actual = parseUserArgs(["-r", "-n", "sample.txt"]);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getInvalidOption", () => {
  it("should return invalid options", () => {
    assert.strictEqual(getInvalidOption(["x"]), `sort: invalid option -- x\n${USAGE}`);
  });
  it("should return undefined for valid options", () => {
    assert.isUndefined(getInvalidOption(["r"]));
  });
  it("should return invalid options if others are valid options", () => {
    assert.strictEqual(getInvalidOption(["r", "x"]), `sort: invalid option -- x\n${USAGE}`);
  });
  it("should return undefined for options -n", () => {
    assert.isUndefined(getInvalidOption(["n"]));
  });
});
