import VendingMachine from "./Implementations/VendingMachine";

const vending = new VendingMachine();
vending.start();
vending.selectProduct("A2");
vending.putMoney("TEN_CENTS");
vending.putMoney("TEN_CENTS");
vending.putMoney("FIFTY_CENTS");
vending.putMoney("ONE_DOLLAR");
vending.putMoney("ONE_DOLLAR");

vending.selectProduct("A2");
vending.putCard("4111111111111111");
