const assert = require("chai").assert;
const { sort, sortForFile } = require("../src/executeSort");
const USAGE =
  "Usage: sort [-bcCdfigMmnrsuz] [-kPOS1[,POS2] ... ] [+POS1 [-POS2]] [-S memsize] [-T tmpdir] [-t separator] [-o outfile] [--batch-size size] [--files0-from file] [--heapsort] [--mergesort] [--radixsort] [--qsort] [--mmap] [--parallel thread_no] [--human-numeric-sort] [--version-sort] [--random-sort [--random-source file]] [--compress-program program] [file ...]";

describe("sort", () => {
  it("should return sorted contents if file is present", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "sample.txt");
      assert.strictEqual(encoding, "utf8");
    };
    sort(["sample.txt"], reader);
  });

  it("should return error for invalid option", () => {
    const displayResult = function(error, contents) {
      assert.strictEqual(error, `sort: invalid option --x\n${USAGE}`);
      assert.strictEqual(contents, "");
    };
    sort(["sample.txt", "-x"], {}, displayResult);
  });
});

describe("sortForFile", () => {
  it("should return error if error is given", () => {
    const displayResult = function(error, contents) {
      assert.strictEqual(error, "sort: No such file or directory");
      assert.strictEqual(contents, "");
    };

    sortForFile.call({ displayResult }, { options: [] }, { code: "ENOENT" });
  });

  it("should return sorted lines to output stream", () => {
    const displayResult = function(error, contents) {
      assert.strictEqual(error, "");
      assert.strictEqual(contents, "a\nb\nc");
    };

    sortForFile.call({ displayResult, options: [] }, undefined, "c\na\nb");
  });

  it("should return sorted lines according to options", () => {
    const displayResult = function(error, contents) {
      assert.strictEqual(error, "");
      assert.strictEqual(contents, "c\nb\na");
    };

    sortForFile.call({ displayResult, options: ["-r"] }, undefined, "c\na\nb");
  });
});
