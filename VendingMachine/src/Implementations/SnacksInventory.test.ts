import { beforeEach, describe, expect, it, vitest } from "vitest";
import Product from "../Entities/Product";
import SnacksInventory from "./SnacksInventory";

describe("functions are implemented", () => {
  let snacksInventory: SnacksInventory;
  beforeEach(() => {
    snacksInventory = new SnacksInventory();
  });

  it("is implemented", () => {
    expect(snacksInventory).toBeInstanceOf(SnacksInventory);
    expect(typeof snacksInventory.populate).toBe("function");
  });

  it("returns right values", () => {
    expect(snacksInventory.populate()).toBeDefined();
    expect(Array.isArray(snacksInventory.populate())).toBe(true);
    expect(snacksInventory.populate()[0]).toBeDefined();
  });

  it("calls the right objects", () => {
    vitest.mock("../Entities/Product");
    expect(Product).toHaveBeenCalled();
  });
});
