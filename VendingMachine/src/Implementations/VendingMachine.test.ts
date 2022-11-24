import Coins from "../Enums/Coins";
import Notes from "../Enums/Notes";
import CardAdapter from "../Adapters/CardAdapter";
import Calculator from "../Implementations/Calculator";
import SnacksInventory from "../Implementations/SnacksInventory";
import VendingMachine from "../Implementations/VendingMachine";
// import VendingMachine from "./VendingMachine";
import VendingFactory from "../Factories/VendingFactory";
import { beforeEach, describe, expect, it, vitest, test } from "vitest";

describe("functions are implemented", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });
  test("first function is implemented", () => {
    expect(vending).toBeInstanceOf(VendingMachine);
    expect(typeof vending.start).toBe("function");
  });
  test("second function is implemented", () => {
    expect(typeof vending.selectProduct).toBe("function");
  });
  test("third function is implemented", () => {
    expect(typeof vending.putMoney).toBe("function");
  });
  test("fourth function is implemented", () => {
    expect(typeof vending.putCard).toBe("function");
  });
  test("fifth function is implemented", () => {
    expect(typeof vending.checkIfEnoughMoney).toBe("function");
  });
  test("sixth function is implemented", () => {
    expect(typeof vending.decrementStock).toBe("function");
  });
  test("seventh function is implemented", () => {
    expect(typeof vending.fillCells).toBe("function");
  });
  test("eighth function is implemented", () => {
    expect(typeof vending.dispenseItem).toBe("function");
  });
  test("ninth function is implemented", () => {
    expect(typeof vending.giveChange).toBe("function");
  });
  test("tenth function is implemented", () => {
    expect(typeof vending.returnCard).toBe("function");
  });
});

describe("start function is working", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });
  it("functions are being called properly", () => {
    const snacksSpy = vitest.spyOn(SnacksInventory.prototype, "populate");
    const changeSpy = vitest.spyOn(SnacksInventory.prototype, "populate");
    vending.start();
    expect(snacksSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();

    snacksSpy.mockClear();
    changeSpy.mockClear();
  });
  it("changes the value of the snacks inventory", () => {
    vending.start();

    expect(vending["spreadedSnacks"]).toBeDefined();
    expect(vending["spreadedSnacks"][0]).toBeDefined();
  });
  it("changes the value of the change inventory", () => {
    expect(vending["_changeMoney"]).toBeDefined();
  });
});

describe("selecting product", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });

  it("sets the right values or gives error", () => {
    const map = new Map([
      ["A0", { name: "t", price: 2, stock: 2 }],
      ["A2", { name: "t2", price: 2, stock: 0 }],
    ]);
    vending["_cellsMap"] = map;

    vending.selectProduct("A0");
    expect(vending["_chosenItem"]).toStrictEqual({ name: "t", price: 2, stock: 2 });

    expect(() => vending.selectProduct("A1")).toThrowError(
      "You put a wrong key on the keypad, Please write a right code on the keypad"
    );
    expect(() => vending.selectProduct("A2")).toThrowError("This item is out of stock");
  });
});

describe("putting money", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });

  test("increasing the changeMoney map, If statemnets and functions are called", () => {
    const calculator = new Calculator();
    const snacksSpy = vitest.spyOn(Calculator.prototype, "calculateTotal");

    const map = new Map([
      ["TEN_CENTS", 10],
      ["TWENTY_DOLLARS", 1],
    ]);
    vending["_changeMoney"] = map;
    vending.putMoney("TEN_CENTS");
    expect(vending["_changeMoney"].get("TEN_CENTS")).toBe(11);
    expect(vending["_currencyType"]).toBe("$");
    expect(vending["Money"]).toBeInstanceOf(Coins);
    vending.putMoney("TWENTY_DOLLARS");
    expect(vending["_currencyType"]).toBe("$");
    expect(vending["Money"]).toBeInstanceOf(Notes);
    expect(snacksSpy).toHaveBeenCalled();
  });
});

describe("putCard", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });
  test("functions are called and If statement is covered", () => {
    // const snacksSpy = vitest.spyOn(CardAdapter.prototype, "creditCardType");
    const typeSpy = vitest
      .spyOn(CardAdapter.prototype, "creditCardType")
      .mockImplementationOnce(() => {
        return true;
      });
    const stockSpy = vitest
      .spyOn(VendingMachine.prototype, "decrementStock")
      .mockImplementationOnce(() => {
        return true;
      });
    const dispenceSpy = vitest
      .spyOn(VendingMachine.prototype, "dispenseItem")
      .mockImplementationOnce(() => {
        return true;
      });
    const returnSpy = vitest
      .spyOn(VendingMachine.prototype, "returnCard")
      .mockImplementationOnce(() => {
        return true;
      });

    vending.putCard("4111111111111");
    expect(typeSpy).toHaveBeenCalled();
    expect(stockSpy).toHaveBeenCalled();
    expect(dispenceSpy).toHaveBeenCalled();
    expect(returnSpy).toHaveBeenCalled();

    vitest.clearAllMocks();
  });

  test("throwing an error if false", () => {
    const typeSpy = vitest
      .spyOn(CardAdapter.prototype, "creditCardType")
      .mockImplementationOnce(() => {
        return false;
      });

    expect(() => vending.putCard("4111111111111")).toThrowError("The card is not legit");
    vitest.clearAllMocks();
  });
});

describe("Check If Enough Money", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });

  test("functions are called and If statement is covered", () => {
    vending["_total"] = 300;
    vending["_chosenItem"] = { name: "Twix", price: 2, stock: 2 };
    const stockSpy = vitest
      .spyOn(VendingMachine.prototype, "decrementStock")
      .mockImplementationOnce(() => {
        return true;
      });
    const dispenceSpy = vitest
      .spyOn(VendingMachine.prototype, "dispenseItem")
      .mockImplementationOnce(() => {
        return true;
      });
    const changeSpy = vitest
      .spyOn(VendingMachine.prototype, "giveChange")
      .mockImplementationOnce(() => {
        return true;
      });
    vending.checkIfEnoughMoney();
    expect(stockSpy).toHaveBeenCalled();
    expect(dispenceSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
    vitest.clearAllMocks();
  });

  it("console.log that there is not enough money", () => {
    const changeSpy = vitest
      .spyOn(VendingMachine.prototype, "giveChange")
      .mockImplementationOnce(() => {
        return true;
      });

    vending["_total"] = 3;
    vending["_chosenItem"] = { name: "Twix", price: 2, stock: 2 };
    const logSpy = vitest.spyOn(console, "log");
    vending.checkIfEnoughMoney();
    expect(logSpy).toHaveBeenCalledWith("Not enough money for the item, insert more please");
    expect(changeSpy).not.toHaveBeenCalled();
    vitest.clearAllMocks();
    vitest.clearAllMocks();
  });
});

describe("decrement stock", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });

  test("check if the stock is decreased and the funciton is called", () => {
    const fillSpy = vitest
      .spyOn(VendingMachine.prototype, "fillCells")
      .mockImplementationOnce(() => {
        return true;
      });
    vending["_chosenItem"] = { name: "Twix", price: 2, stock: 3 };

    vending.decrementStock();
    expect(vending["_chosenItem"]).toStrictEqual({ name: "Twix", price: 2, stock: 2 });
    expect(fillSpy).toHaveBeenCalled();

    vitest.clearAllMocks();
  });
});

describe("fillCells", () => {
  let vending: VendingMachine;
  beforeEach(() => {
    vending = VendingFactory.createVendingMachine();
  });
  test(" that values are changed and function are called", () => {
    vending.start();
    vending["_cellsMap"]
      .set("A0", { name: "Twix", price: 2, stock: 0 })
      .set("A1", { name: "Twix2", price: 2, stock: 1 });
    vending["_key"] = "A0";
    vending.fillCells();
    expect(vending["_cellsMap"].get("A0")).toBeDefined();
    expect(vending["_cellsMap"].get("A0")).not.toStrictEqual({ name: "Twix", price: 2, stock: 0 });
    expect(vending["_cellsMap"].get("A1")).toStrictEqual({ name: "Twix2", price: 2, stock: 1 });

    vending["_key"] = "A1";
    vending.fillCells();
    expect(vending["_cellsMap"].get("A1")).toStrictEqual({ name: "Twix2", price: 2, stock: 1 });
  });
});
