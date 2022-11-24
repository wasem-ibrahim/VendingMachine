export enum SIZE {
  ROW = 5,
  COL = 5,
  CELL_SIZE = 10,
}

export default interface IVending {
  start(): void;
  selectProduct(key: string): void;
  putMoney(money: string): void;
  putCard(number: string): void;
}
