export default class CardAdapter {
  private _BankAPI;

  constructor() {
    this._BankAPI = {};
  }

  private set BankAPI(BankAPI: any) {
    this._BankAPI = BankAPI;
  }

  private get BankAPI() {
    return this._BankAPI;
  }

  creditCardType(creditCard: string, price: number) {}
}
