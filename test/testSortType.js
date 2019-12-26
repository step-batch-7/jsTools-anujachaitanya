const { numericSort } = require("../src/sortTypes");
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
