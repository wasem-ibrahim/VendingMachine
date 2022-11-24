import productsJSON from "../../ExternalData/products.json";
import inventory from "../Interfaces/Inventory";

export default class ChangeInventory implements inventory {
  populate(): any {
    let changeArray = productsJSON.change.map((element) => {
      return element;
    });
    return changeArray;
  }
}
