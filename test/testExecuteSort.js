const assert = require("chai").assert;
const { sort, sortForFile } = require("../src/executeSort");

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
      assert.strictEqual(error, "sort: invalid option --x");
      assert.strictEqual(contents, "");
    };
    sort(["sample.txt", "-x"], {}, callback);
  });
});

describe("sortForFile", () => {
  it("should return error if error is given", () => {
    const callback = function(error, contents) {
      assert.strictEqual(error, "sort: No such a file or directory");
      assert.strictEqual(contents, "");
    };

    sortForFile.call({ callback }, { options: [] }, { code: "ENOENT" });
  });

  it("should return error if file is directory", () => {
    const callback = function(error, contents) {
      assert.strictEqual(error, "sort: Is a directory");
      assert.strictEqual(contents, "");
    };

    sortForFile.call({ callback }, { options: [] }, { code: "EISDIR" });
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
