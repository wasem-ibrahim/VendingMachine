import IVending from "../Interfaces/IVending";

export default class VendingMachine implements IVending {
  constructor() {}

  start(): void {}

  selectProduct(key: string): void {}

  putMoney(money: string): void {}

  putCard(number: string): void {}
}
