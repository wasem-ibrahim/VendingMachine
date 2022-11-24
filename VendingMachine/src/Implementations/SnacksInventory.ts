import productsJSON from "../../ExternalData/products.json";
import Product, { product } from "../Entities/Product";
import inventory from "../Interfaces/Inventory";

export default class SnacksInventory implements inventory {
  populate(): product[] {
    let snacksArray = productsJSON.items.map((element) => {
      const { name, stock, price } = element;
      const product = new Product(name, price, stock);
      return product;
    });
    return snacksArray;
  }
}
