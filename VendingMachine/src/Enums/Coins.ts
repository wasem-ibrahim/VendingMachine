import IMoney, { money } from "../Interfaces/IMoney";

export default class Coins implements IMoney {
  static readonly TEN_CENTS: number = 10;
  static readonly TWENTY_CENTS: number = 20;
  static readonly FIFTY_CENTS: number = 50;
  static readonly ONE_DOLLAR: number = 100;

  get values(): money[] {
    return [
      { name: "ONE_DOLLAR", value: Coins.ONE_DOLLAR },
      { name: "FIFTY_CENTS", value: Coins.FIFTY_CENTS },
      { name: "TWENTY_CENTS", value: Coins.TWENTY_CENTS },
      { name: "TEN_CENTS", value: Coins.TEN_CENTS },
    ];
  }

  getValue(nameOfCoin: string): number {
    switch (nameOfCoin) {
      case "TEN_CENTS":
        return 10;
      case "TWENTY_CENTS":
        return 20;
      case "FIFTY_CENTS":
        return 50;
      case "ONE_DOLLAR":
        return 100;
      default:
        return 0;
    }
  }
}
