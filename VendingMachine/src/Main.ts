import VendingFactory from "./Factories/VendingFactory";

const vending = VendingFactory.createVendingMachine();
vending.start();
vending.selectProduct("A2");
// vending.putMoney("TWENTY_DOLLARS");
vending.putMoney("TEN_CENTS");
vending.putMoney("TEN_CENTS");
vending.putMoney("FIFTY_CENTS");
// vending.putMoney("FIFTY_CENTS");
vending.putMoney("ONE_DOLLAR");
vending.putMoney("ONE_DOLLAR");

vending.checkIfEnoughMoney();
// vending.selectProduct("A0");
vending.selectProduct("A2");
vending.putCard("4111111111111111");
