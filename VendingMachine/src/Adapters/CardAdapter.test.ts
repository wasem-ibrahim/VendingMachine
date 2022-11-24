import { beforeEach, describe, expect, it, vitest } from "vitest";
import CardAdapter from "./CardAdapter";
import BankAPIFactory from "../Factories/BankAPIFactory";
import BankAPI from "../ExternalAPIs/BankAPI";

describe("Making sure credit cards are being acceced", () => {
  let cardAdapter: CardAdapter;
  beforeEach(() => {
    cardAdapter = new CardAdapter();
  });
  it("returns true, false depending if the credit number is right", () => {
    expect(cardAdapter).toBeInstanceOf(CardAdapter);
    expect(cardAdapter.creditCardType("4111111111111111", 2)).toBe(true);
    expect(cardAdapter.creditCardType("4111111111111131", 2)).toBe(true);
    expect(cardAdapter.creditCardType("81112411911s1131", 2)).toBe(false);
  });

  it("should recieve an error", () => {
    BankAPI.prototype.checkAndDecrementAmount = vitest.fn().mockImplementationOnce(() => {
      return new Error("You dont have enough balance to buy");
    });

    const error = cardAdapter.creditCardType("4111111111111111", 2);
    // expect(error.message).toBe("You dont have enough balance to buy");
    expect(BankAPI.prototype.checkAndDecrementAmount).toHaveReturnedWith(error);
    expect(BankAPI.prototype.checkAndDecrementAmount).toHaveBeenCalledWith("4111111111111111", 2);
  });

  it("should call the function inside of the constructor", () => {
    vitest.spyOn(BankAPIFactory, "createBankAPI").mockImplementationOnce(() => {
      return new BankAPI();
    });
    const test = new CardAdapter();
    expect(BankAPIFactory.createBankAPI).toHaveBeenCalled();
  });
});
