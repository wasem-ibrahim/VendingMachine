import IMoney from "./IMoney";

export type tally = {
  [key: number]: number;
};

export default interface ICalculator {
  calculateTotal(money: string, instance: IMoney, prevTotal: number): number;
  calculateChange(currency: string, total: number, priceOfItem: number, changeMoney: any): tally;
}
