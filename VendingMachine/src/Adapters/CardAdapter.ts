import BankAPI from "../ExternalAPIs/BankAPI";
import BankAPIFactory from "../Factories/BankAPIFactory";

export default class CardAdapter {
  private _BankAPI: BankAPI;

  constructor() {
    this._BankAPI = BankAPIFactory.createBankAPI();
  }

  private set BankAPI(BankAPI: any) {
    this._BankAPI = BankAPI;
  }

  private get BankAPI() {
    return this._BankAPI;
  }

  creditCardType(creditCard: string, price: number) {
    let amex = new RegExp("^3[47][0-9]{13}$");
    let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    let cup1 = new RegExp("^62[0-9]{14}[0-9]*$");
    let cup2 = new RegExp("^81[0-9]{14}[0-9]*$");

    let mastercard = new RegExp("^5[1-5][0-9]{14}$");
    let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

    let disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
    let disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
    let disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

    let diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
    let jcb = new RegExp("^35[0-9]{14}[0-9]*$");

    if (visa.test(creditCard)) {
      //cal the bank api for "VISA"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
      //   return "VISA";
    }
    if (amex.test(creditCard)) {
      //cal the bank api for "AMEX"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    if (mastercard.test(creditCard) || mastercard2.test(creditCard)) {
      //cal the bank api for "MASTERCARD"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    if (disco1.test(creditCard) || disco2.test(creditCard) || disco3.test(creditCard)) {
      //cal the bank api for "DISCOVER"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    if (diners.test(creditCard)) {
      //cal the bank api for "DINERS"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    if (jcb.test(creditCard)) {
      //cal the bank api for "JCB"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    if (cup1.test(creditCard) || cup2.test(creditCard)) {
      //cal the bank api for "CHINA_UNION_PAY"
      let result = this._BankAPI.checkAndDecrementAmount(creditCard, price);
      return result;
    }
    return false;
  }
}
