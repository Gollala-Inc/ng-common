import {CartItem, CartItems} from "../interface/cart-item.model";
import {Product, Products} from "../interface/product.model";
import {WholesaleInGeneralCart} from "./wholesale";
import {GeneralCartItem} from "./cart-item";
import {GeneralCart} from "./cart";

export class ProductInGeneralCart {
  public id: string | null = null;
  private generalCart = GeneralCart;
  private children: {[key: string]: GeneralCartItem} = {};
  private detail: Product | null = null;

  get cartItems(): CartItems {
    return Object.values(this.children).reduce((result: any[], c) => [...result, c?.getCartItem()], []);
  }

  get latestDate(): number {
    return this.cartItems.reduce((result, c) => Math.max(result, +new Date(c.createdAt)), 0);
  }

  constructor(
    generalCartItem: GeneralCartItem,
  ) {
    this.id = generalCartItem.getProduct().id;
    this.detail = generalCartItem.getProduct();

    if(!this.ProductIsSavedInMemory()) {
      this.addChildren(generalCartItem);
      this.addProductInWholesale();
    }
  }

  public getDetail() {
    return this.detail;
  }

  public addChildren(generalCartItem: GeneralCartItem) {
    const cartItemId = generalCartItem.getCartItem()._id;
    this.children[cartItemId] = generalCartItem;
  }

  public addProductItemInMemory() {
    this.generalCart.addMemory('products', this);
  }

  private ProductIsSavedInMemory(): boolean {
    return this.generalCart.isSavedInMemory('products', this.id!);
  }

  private WholeSaleisSavedInMemory(): boolean {
    return this.generalCart.isSavedInMemory('wholesales', this.detail!.wsSeq);
  }

  private addProductInWholesale() {
    if(this.WholeSaleisSavedInMemory()) {
      const wholesaleInGeneralCart = this.generalCart.getMemory('wholesales', this.detail!.wsSeq);
      wholesaleInGeneralCart.addChildren(this);
    } else {
      const newWholesaleInGeneralCart = new WholesaleInGeneralCart(this);
      newWholesaleInGeneralCart.addWholesaleItemInMemory();
    }
  }
}
