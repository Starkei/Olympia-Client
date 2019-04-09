import { Product } from "./models/product";
import { User } from "./auth";

export interface ConvertedAdware {
  id?: string;
  product?: Product;
  user?: User;
}
