import Coins from "../Enums/Coins";
import { beforeEach, describe, expect, it } from "vitest";

describe("All functions are implemented", () => {
  let coin: Coins;
  beforeEach(() => {
    coin = new Coins();
  });

  it("is a function", () => {
    expect(coin).toBeInstanceOf(Coins);
    expect(typeof coin.getValue).toBe("function");
  });

  it("is an object", () => {
    expect(typeof coin.values).toBe("object");
  });
});

describe("getting the value for the coin", () => {
  let coin: Coins;
  beforeEach(() => {
    coin = new Coins();
  });

  it("gives the right value with one argument", () => {
    expect(coin.getValue("TEN_CENTS")).toEqual(10);
    expect(coin.getValue("ONE_DOLLAR")).toEqual(100);
    expect(coin.getValue("TEST")).toEqual(0);
    expect(coin.getValue("TEST")).toBeDefined();
  });

  it("returns a number", () => {
    expect(coin.getValue("TEN_CENTS")).toBeTypeOf("number");
  });

  it("returns an array", () => {
    expect(coin.values).toBeDefined();
    expect(Array.isArray(coin.values)).toBe(true);
  });
});
