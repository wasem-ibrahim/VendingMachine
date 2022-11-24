export default class Product {
  private _name: string;
  private _price: number;
  private _stock: number;

  constructor(name: string, price: number, stock: number) {
    this._name = name;
    this._price = price;
    this._stock = stock;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set price(price: number) {
    this._price = price;
  }

  get price(): number {
    return this._price;
  }

  set stock(stock: number) {
    this._stock = stock;
  }

  get stock(): number {
    return this._stock;
  }
}
