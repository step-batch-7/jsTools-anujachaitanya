const { numericSort, sortLines, loadLines } = require("../src/sortLib");
const { EventEmitter } = require("events");
const assert = require("chai").assert;
describe("numericSort", () => {
  it("should sort given numbers", () => {
    const actual = numericSort(["1", "2", "4", "3"]);
    const expected = ["1", "2", "3", "4"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort numbers in form of string", () => {
    const actual = numericSort(["1", "2", "4", "3"]);
    const expected = ["1", "2", "3", "4"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort if no and strings are together", () => {
    const actual = numericSort(["1", "a", "4", "3"]);
    const expected = ["a", "1", "3", "4"];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("sortLines", () => {
  it("should sort given strings if no options are given", () => {
    const expected = "a\nb";
    const actual = sortLines([], "b\na");
    assert.deepStrictEqual(actual, expected);
  });

  it("should reverse sort if no options are given", () => {
    const expected = "b\na";
    const actual = sortLines(["r"], "a\nb");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if -n is given", () => {
    const expected = "1\n2\n3";
    const actual = sortLines(["n"], "2\n3\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should do both number and reverse sort if both options are given", () => {
    const expected = "3\n2\n1";
    const actual = sortLines(["n", "r"], "2\n3\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number sort if both strings and numbers are given", () => {
    const expected = "a\n1\n2";
    const actual = sortLines(["n"], "2\na\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should number and reverse sort if both strings and numbers are given", () => {
    const expected = "2\n1\na";
    const actual = sortLines(["n", "r"], "2\na\n1");
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort if both numbers and strings are given", () => {
    const expected = "1\n2\na";
    const actual = sortLines([], "2\na\n1");
    assert.deepStrictEqual(actual, expected);
  });
});

describe("loadLines", () => {
  it("should give error if given file is not present", () => {
    const finishCallback = function({ errorMsg, contents }) {
      assert.strictEqual(errorMsg, "sort: No such file or directory");
      assert.isUndefined(contents);
    };

    const inputStream = new EventEmitter();
    loadLines([], inputStream, finishCallback);
    inputStream.emit("error", { code: "ENOENT" });
  });

  it("should give sorted contents if data event is occurred", () => {
    const finishCallback = function({ errorMsg, contents }) {
      assert.isUndefined(errorMsg);
      assert.strictEqual(contents, "a\nb\nc");
    };

    const inputStream = new EventEmitter();
    loadLines([], inputStream, finishCallback);
    inputStream.emit("data", "c\nb\na");
    inputStream.emit("end");
  });

  it("should reverse sort contents if -r option is given ", () => {
    const finishCallback = function({ errorMsg, contents }) {
      assert.isUndefined(errorMsg);
      assert.strictEqual(contents, "c\nb\na");
    };

    const inputStream = new EventEmitter();
    loadLines(["r"], inputStream, finishCallback);
    inputStream.emit("data", "a\nb\nc");
    inputStream.emit("end");
  });

  it("should numeric sort if -n option is given", () => {
    const finishCallback = function({ errorMsg, contents }) {
      assert.isUndefined(errorMsg);
      assert.strictEqual(contents, "1\n4\n5");
    };

    const inputStream = new EventEmitter();
    loadLines(["n"], inputStream, finishCallback);
    inputStream.emit("data", "4\n1\n5");
    inputStream.emit("end");
  });
});
