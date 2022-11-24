export type money = {
  name: string;
  value: number;
};

export default interface IMoney {
  values: any;
  getValue(nameOfCoin: string): number;
}
