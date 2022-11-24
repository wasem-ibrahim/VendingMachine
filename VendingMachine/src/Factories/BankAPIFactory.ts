import BankAPI from "../ExternalAPIs/BankAPI";

export default class BankAPIFactory {
  static createBankAPI(): BankAPI {
    return new BankAPI();
  }
}
