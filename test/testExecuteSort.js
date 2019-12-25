const assert = require("chai").assert;
const { sort, sortForFile } = require("../src/executeSort");

describe("sort", () => {
  it("should return sorted contents if file is present", () => {
    const reader = function(path, encoding) {
      assert.strictEqual(path, "sample.txt");
      assert.strictEqual(encoding, "utf8");
    };

    const fsTools = { reader, encoding: "utf8" };
    sort(["sample.txt"], fsTools);
  });

  it("should return error for invalid option", () => {
    const errorStream = function(error) {
      assert.strictEqual(error, "sort: invalid option --x");
    };
    sort(["sample.txt", "-x"], {}, {}, errorStream);
  });
});

describe("sortForFile", () => {
  it("should return error if error is given", () => {
    const errorStream = function(error) {
      assert.strictEqual(error, "sort: No such a file or directory");
    };
    const streams = { errorStream };
    sortForFile.call(streams, { options: [] }, { code: "ENOENT" });
  });

  it("should return error if file is directory", () => {
    const errorStream = function(error) {
      assert.strictEqual(error, "sort: Is a directory");
    };
    const streams = { errorStream };
    sortForFile.call(streams, { options: [] }, { code: "EISDIR" });
  });

  it("should return sorted lines to output stream", () => {
    const outputStream = function(data) {
      assert.strictEqual(data, "a\nb\nc");
    };

    const streams = { outputStream };
    sortForFile.call(streams, { options: [] }, undefined, "c\na\nb");
  });

  it("should return sorted lines according to options", () => {
    const outputStream = function(data) {
      assert.strictEqual(data, "c\nb\na");
    };

    const streams = { outputStream };
    sortForFile.call(streams, { options: ["-r"] }, undefined, "c\na\nb");
  });
});
