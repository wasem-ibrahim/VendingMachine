import Notes from "../Enums/Notes";
import { beforeEach, describe, expect, it } from "vitest";

describe("All functions are implemented", () => {
  let coin: Notes;
  beforeEach(() => {
    coin = new Notes();
  });

  it("is a function", () => {
    expect(typeof coin.getValue).toBe("function");
  });

  it("is an object", () => {
    expect(typeof coin.values).toBe("object");
  });
});

describe("getting the value for the coin", () => {
  let coin: Notes;
  beforeEach(() => {
    coin = new Notes();
  });

  it("gives the right value with one argument", () => {
    expect(coin.getValue("TWENTY_DOLLARS")).toEqual(2000);
    expect(coin.getValue("FIFTY_DOLLARS")).toEqual(5000);
  });

  it("returns a number", () => {
    expect(coin.getValue("TEN_CENTS")).toBeTypeOf("number");
  });

  it("returns an array", () => {
    expect(Array.isArray(coin.values)).toBe(true);
  });
});
