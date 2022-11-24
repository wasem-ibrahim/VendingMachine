import Product, { product } from "../Entities/Product";
import Coins from "../Enums/Coins";
import ICalculator from "../Interfaces/ICalculator";
import Notes from "../Enums/Notes";
import inventory from "../Interfaces/Inventory";
import IMoney from "../Interfaces/IMoney";
import IVending, { SIZE } from "../Interfaces/IVending";

export default class VendingMachine implements IVending {
  private _snacksInventory: inventory;
  private _cellsMap: Map<string, product>;
  private _changeMoney: Map<string, number>;
  private _calculator: ICalculator;
  private _cardAdapter: any;
  private _chosenItem: product = { name: "", price: 0, stock: 0 };
  private _total: number = 0;
  private _key: string = "";
  private _changeInventory: inventory;
  private spreadedSnacks: product[] = [];
  private _currencyType: string = "$";
  protected Money!: IMoney;
  constructor(Inventory: inventory, calculator: ICalculator, cardAdapter: any) {
    this._snacksInventory = Inventory;
    this._changeInventory = Inventory;
    this._calculator = calculator;
    this._cardAdapter = cardAdapter;

    this._cellsMap = new Map<string, product>();
    this._changeMoney = new Map<string, number>();
  }

  public setLogger(Money: VendingMachine["Money"]): void {
    this.Money = Money;
  }

  set cellsMap(value: Map<string, product>) {
    this._cellsMap = value;
  }

  set changeMoney(value: Map<string, number>) {
    this._changeMoney = value;
  }

  set total(value: number) {
    this._total = value;
  }

  set chosenItem(value: product) {
    this._chosenItem = value;
  }

  start(): void {
    let snacks: product[] = this._snacksInventory.populate();

    snacks.forEach((pro: product) => {
      while (pro.stock > SIZE.CELL_SIZE) {
        pro.stock -= SIZE.CELL_SIZE;
        this.spreadedSnacks.push(new Product(pro.name, pro.price, SIZE.CELL_SIZE));
      }
      this.spreadedSnacks.push(pro);
    });

    let row = "A";
    this.spreadedSnacks.slice(0, SIZE.COL * SIZE.ROW).forEach((pro: product, i: number) => {
      this._cellsMap.set(`${row}${i % 5}`, pro);
      if (i % 5 == 4) {
        row = String.fromCharCode(row.charCodeAt(0) + 1);
      }
    });

    let change = this._changeInventory.populate();
    change.forEach((element: { name: string; remaining: number }) => {
      this._changeMoney.set(element.name, element.remaining);
    });
  }

  selectProduct(key: string): void {
    this._key = key;
    if (this._cellsMap.get(key)) {
      if (this._cellsMap.get(key)!.stock > 0) {
        this._chosenItem = this._cellsMap.get(key)!;
      } else {
        throw new Error("This item is out of stock");
      }
    } else {
      throw new Error("You put a wrong key on the keypad, Please write a right code on the keypad");
    }
  }

  putMoney(money: string): void {
    let currencyChange = this._changeMoney.get(money);
    currencyChange!++;
    this._changeMoney.set(money, currencyChange!);

    if (money.includes("CENTS") || money === "ONE_DOLLAR") {
      this._currencyType = "$";
      this.Money = new Coins();
    } else if (money.includes("DOLLARS")) {
      this._currencyType = "$";
      this.Money = new Notes();
    }
    this._total = this._calculator.calculateTotal(money, this.Money, this._total);
    console.log(`your total untill now is : ${this._total / 100}$`);
  }

  putCard(number: string): void {
    let validOrNot = this._cardAdapter.creditCardType(number, this._chosenItem.price);
    if (validOrNot) {
      this.decrementStock();
      this.dispenseItem();
      this.returnCard();
    } else {
      throw new Error("The card is not legit");
    }
  }

  checkIfEnoughMoney(): void {
    if (this._total / 100 >= this._chosenItem?.price) {
      this.decrementStock();
      this.dispenseItem();
      this.giveChange();
    } else {
      console.log("Not enough money for the item, insert more please");
    }
  }

  decrementStock(): void {
    this._chosenItem.stock--;
    this.fillCells();
  }

  fillCells(): void {
    if (this._cellsMap.get(this._key)!.stock == 0) {
      for (let i = SIZE.ROW * SIZE.COL; i < this.spreadedSnacks.length; i++) {
        let product = this.spreadedSnacks[i];
        if (product.stock > 0) {
          this._cellsMap.set(this._key, product);
          break;
        }
      }
    }
  }

  dispenseItem(): void {
    console.log(`here is your ${this._chosenItem.name}`);
  }

  giveChange(): void {
    let tally = this._calculator.calculateChange(
      this._currencyType,
      this._total,
      this._chosenItem.price,
      this._changeMoney
    );
    console.log(
      `here is your change which is ${
        (this._total - this._chosenItem.price * 100) / 100
      } dollars given to you as:`
    );
    for (let key in tally) {
      if (tally[key] > 0) {
        if (parseInt(key) >= 100) {
          console.log(`${tally[key]} of the: ${parseInt(key) / 100} Dollars`);
        } else {
          console.log(`${tally[key]} of the: ${parseInt(key)} Cents`);
        }
      }
    }
  }

  returnCard(): void {
    console.log("here is your card, you can take it out of the machine ");
  }
}
