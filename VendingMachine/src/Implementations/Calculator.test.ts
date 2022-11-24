import { beforeEach, describe, expect, it, vitest, test } from "vitest";
import Coins from "../Enums/Coins";
import Calculator from "./Calculator";

describe("functions are implemented", () => {
  let calculator: Calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  test("first function is implemented", () => {
    expect(calculator).toBeInstanceOf(Calculator);
    expect(typeof calculator.calculateTotal).toBe("function");
  });

  test("second function is implemented", () => {
    expect(typeof calculator.calculateChange).toBe("function");
  });
});

describe("first function return right values", () => {
  let calculator: Calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("returns a number", () => {
    expect(calculator.calculateTotal("TEN_CENTS", new Coins(), 100)).toBeTypeOf("number");
    expect(calculator.calculateTotal("TEN_CENTS", new Coins(), 100)).toBe(110);
  });

  it("invokes the object and its method", () => {
    Coins.prototype.getValue = vitest.fn().mockImplementationOnce(() => {
      return 10;
    });
    expect(calculator.calculateTotal("TEN_CENTS", new Coins(), 100)).toBeTypeOf("number");
    expect(Coins.prototype.getValue).toHaveBeenCalled();
  });
  vitest.clearAllMocks();
});

describe("second function return right values", () => {
  let calculator: Calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("returns an object", () => {
    expect(calculator.calculateChange("$", 110, 10, new Map())).toBeTypeOf("object");
    const map = new Map([["TEN_CENTS", 10]]);
    expect(calculator.calculateChange("$", 110, 10, map)).toStrictEqual({
      "10": 1,
      "100": 1,
      "20": 0,
      "2000": 2,
      "50": 0,
      "5000": -1,
    });
  });

  it("calls the objects inside", () => {
    const testing = vitest.spyOn(Coins.prototype, "values", "get");
    calculator.calculateChange("$", 110, 10, new Map());
    expect(testing).toHaveBeenCalled();
    testing.mockClear();
  });
});
