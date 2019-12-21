const assert = require("chai").assert;
const { sort } = require("../src/sortLib");

describe("formatLines", () => {
  it("should sort the given lines on the basis of ascii values", () => {
    const expected = ["a", "c", "d", "e"];
    const actual = sort(["a", "e", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort the given lines if one or more lines starts with special characters", () => {
    const expected = ["*a", "a*", "c", "d"];
    const actual = sort(["a*", "*a", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort given lines if one or more lines starts with space", () => {
    const expected = [" a", "*a", "c", "d"];
    const actual = sort([" a", "*a", "c", "d"]);
    assert.deepStrictEqual(actual, expected);
  });
});
