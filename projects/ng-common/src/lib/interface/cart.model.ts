import {CartItems} from "./cart-item.model";

export interface Cart {
  _id: string;
  customer: string;
  items: CartItems;
  createdAt: string;
  updatedAt: string;
}
