import Coins from "../Enums/Coins";
import Notes from "../Enums/Notes";
import { tally } from "../Interfaces/ICalculator";
import IMoney from "../Interfaces/IMoney";

export default class Calculator {
  calculateTotal(money: string, object: IMoney, prevTotal: number): number {
    return object.getValue(money) + prevTotal;
  }

  calculateChange(
    currency: string,
    total: number,
    priceOfItem: number,
    changeMoneyMap: any
  ): tally {
    let changeDue = total - priceOfItem * 100;
    let tally: tally = {};

    if (currency === "$") {
      const c = new Coins();
      const n = new Notes();

      n.values.forEach((element: any) => {
        tally = { ...tally, [element.value]: 0 };
      });
      c.values.forEach((element: any) => {
        tally = { ...tally, [element.value]: 0 };
      });

      [...n.values, ...c.values].forEach((elemenet: { name: string; value: number }) => {
        let numOfChange = Math.floor(changeDue / elemenet.value);
        let changeRemaining = changeMoneyMap.get(elemenet.name);
        if (numOfChange > changeRemaining) {
          numOfChange = changeRemaining;
          tally[elemenet.value] += changeRemaining;
          changeMoneyMap.set(elemenet.name, 0);
        } else {
          changeRemaining -= numOfChange;
          tally[elemenet.value] += numOfChange;
          changeMoneyMap.set(elemenet.name, changeRemaining);
        }

        changeDue = changeDue - elemenet.value * numOfChange;
      });
    }
    return tally;
  }
}
