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
    const callback = function(error, contents) {
      assert.strictEqual(error, `sort: invalid option --x\n${USAGE}`);
      assert.strictEqual(contents, "");
    };
    sort(["sample.txt", "-x"], {}, callback);
  });
});

describe("sortForFile", () => {
  it("should return error if error is given", () => {
    const callback = function(error, contents) {
      assert.strictEqual(error, "sort: No such file or directory");
      assert.strictEqual(contents, "");
    };

    sortForFile.call({ callback }, { options: [] }, { code: "ENOENT" });
  });

  it("should return sorted lines to output stream", () => {
    const callback = function(error, contents) {
      assert.strictEqual(error, "");
      assert.strictEqual(contents, "a\nb\nc");
    };

    sortForFile.call({ callback }, { options: [] }, undefined, "c\na\nb");
  });

  it("should return sorted lines according to options", () => {
    const callback = function(error, contents) {
      assert.strictEqual(error, "");
      assert.strictEqual(contents, "c\nb\na");
    };

    sortForFile.call({ callback }, { options: ["-r"] }, undefined, "c\na\nb");
  });
});
