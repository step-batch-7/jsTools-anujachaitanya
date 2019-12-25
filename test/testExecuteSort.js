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
});

describe("sortForFile", () => {
  it("should return error if error is given", () => {
    const errorStream = function(error) {
      assert.strictEqual(error, "sort: No such a file or directory");
    };
    const streams = { errorStream };
    sortForFile.call(streams, { options: [] }, "ENOENT", undefined);
  });
});
