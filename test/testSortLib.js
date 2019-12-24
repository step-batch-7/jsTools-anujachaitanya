const assert = require("chai").assert;
const {
  sort,
  parseUserArgs,
  getInvalidOption,
  loadContents
} = require("../src/sortLib");

describe("sort", () => {
  it("should reverse sort given strings", () => {
    const expected = ["a", "c", "d", "e"];
    const actual = sort(["a", "c", "d", "e"]);
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

describe("loadContents", () => {
  it("should return fileContents splitted with new lines", () => {
    const reader = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return "a\nb\nc\nd";
    };
    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return true;
    };
    const fsModule = { reader, exists, encoding: "utf8" };
    const actual = loadContents(
      "sample.txt",
      fsModule.reader,
      fsModule.exists,
      fsModule.encoding
    );
    const expected = ["a", "b", "c", "d"];
    assert.deepStrictEqual(actual, expected);
  });
  it("should return error object if given file is not present", () => {
    const exists = function(filePath) {
      assert.strictEqual(filePath, "sample.txt");
      return false;
    };
    const fsModule = { reader: "", exists, encoding: "utf8" };

    assert.throws(() =>
      loadContents(
        "sample.txt",
        fsModule.reader,
        fsModule.exists,
        fsModule.encoding
      )
    );
  });
});
