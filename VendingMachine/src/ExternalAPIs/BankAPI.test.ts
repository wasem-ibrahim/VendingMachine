import { beforeEach, describe, expect, it } from "vitest";
import BankAPI from "./BankAPI";

describe("the function is implemented", () => {
  let bankAPI: BankAPI;
  beforeEach(() => {
    bankAPI = new BankAPI();
  });
  it("defines the function", () => {
    expect(bankAPI).toBeInstanceOf(BankAPI);
    expect(typeof bankAPI.checkAndDecrementAmount).toBe("function");
  });

  it("returns the right output", () => {
    expect(bankAPI.checkAndDecrementAmount("4111111111111", 12)).toBe(true);
    expect(() => {
      bankAPI.checkAndDecrementAmount("4111111111111", 1200);
    }).toThrowError("You dont have enough balance to buy");
  });
});
