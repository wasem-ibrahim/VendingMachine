export default class BankAPI {
  checkAndDecrementAmount(cc: string, price: number) {
    //for the sake of this project we put random value in the balanace. However,
    //in real life this is already known and set

    let balance = Math.random() * 1000;
    let newBalanace = balance - price;
    if (newBalanace < 0) throw new Error("You dont have enough balance to buy");
    else return true;
  }
}
