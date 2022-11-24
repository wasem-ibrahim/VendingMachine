import { product } from "../Entities/Product";

export default interface inventory {
  populate(): product[] | any[];
}
