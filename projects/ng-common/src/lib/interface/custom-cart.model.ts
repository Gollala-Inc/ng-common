import {CustomCartItems} from "./custom-cart-item.model";

export interface CustomCart {
  _id: string;
  customer: string;
  items: CustomCartItems;
  createdAt: string;
  updatedAt: string;
}
