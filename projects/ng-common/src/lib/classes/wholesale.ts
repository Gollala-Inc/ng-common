import {Product} from "../interface/product.model";
import {CartItems} from "../interface/cart-item.model";
import {GeneralCartItem} from "./cart-item";
import {ProductInGeneralCart} from "./product";
import {GeneralCart} from "./cart";

export class WholesaleInGeneralCart {
  public id: string | null = null;
  private generalCart = GeneralCart;
  private children: {[key: string]: ProductInGeneralCart} = {};

  get cartItems(): CartItems {
    return Object.values(this.children).reduce((result: any[], p) => [...result, ...p?.cartItems], []);
  }

  get latestDate(): number {
    return this.cartItems.reduce((result, c) => Math.max(result, +new Date(c.createdAt)), 0);
  }

  constructor(
    productInGeneralCart: ProductInGeneralCart
  ) {
    this.id = productInGeneralCart.getDetail()!.wsSeq;
    if(!this.WholeSaleisSavedInMemory()) {
      this.addChildren(productInGeneralCart);
    }
  }

  public addChildren(productInGeneralCart: ProductInGeneralCart) {
    this.children[productInGeneralCart.id!] = productInGeneralCart;
  }

  public addWholesaleItemInMemory() {
    this.generalCart.addMemory('wholesales', this);
  }

  private WholeSaleisSavedInMemory(): boolean {
    return this.generalCart.isSavedInMemory('wholesales', this.id!);
  }
}
