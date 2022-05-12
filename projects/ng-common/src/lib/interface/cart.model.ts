import {CartItemsModel} from "./cart-item.model";
import {CustomCartItemsModel} from "./custom-cart-item.model";

export interface CartModel {
  _id: string;
  customer: string;
  items: CartItemsModel;
  createdAt: string;
  updatedAt: string;
}

export interface CustomCartModel {
  _id: string;
  customer: string;
  items: CustomCartItemsModel;
  createdAt: string;
  updatedAt: string;
}

export interface TotalCartsModel {
  cart: CartModel;
  cartItemsCount: number;
  customCart: CustomCartModel;
  customCartItemsCount: number;
}


