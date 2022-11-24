import { beforeEach, describe, expect, it, vitest } from "vitest";
import ChangeInventory from "./ChangeInventory";

describe("functions are implemented", () => {
  let changeInventory: ChangeInventory;
  beforeEach(() => {
    changeInventory = new ChangeInventory();
  });

  it("is implemented", () => {
    expect(changeInventory).toBeInstanceOf(ChangeInventory);
    expect(typeof changeInventory.populate).toBe("function");
  });

  it("returns right values", () => {
    expect(changeInventory.populate()).toBeDefined();
    expect(Array.isArray(changeInventory.populate())).toBe(true);
    expect(changeInventory.populate()[0]).toBeDefined();
  });
});
