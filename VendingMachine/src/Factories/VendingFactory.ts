import CardAdapter from "../Adapters/CardAdapter";
import Calculator from "../Implementations/Calculator";
import SnacksInventory from "../Implementations/SnacksInventory";
import VendingMachine from "../Implementations/VendingMachine";
import IMoney from "../Interfaces/IMoney";

export default class VendingFactory {
  static createVendingMachine(): VendingMachine {
    return new VendingMachine(new SnacksInventory(), new Calculator(), new CardAdapter());
  }
}
