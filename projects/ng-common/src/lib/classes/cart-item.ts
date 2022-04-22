import {CartItem} from "../interface/cart-item.model";
import {Product} from "../interface/product.model";
import {ProductInGeneralCart} from './product';
import {GeneralCart} from "./cart";

export class GeneralCartItem {
  private generalCart: any = GeneralCart;
  public id: string | null = null;

  constructor(
    private cartItem: CartItem,
    private product: Product
  ) {
    this.id = cartItem._id;

    if(!this.cartItemisSavedInMemory()) {
      this.addCartItemInMemory();
      this.addCartItemInProduct();
    }
  }

  public getCartItem() {
    return this.cartItem;
  }

  public getProduct() {
    return this.product;
  }

  private cartItemisSavedInMemory(): boolean {
    return this.generalCart.isSavedInMemory('cartItems', this.id);
  }

  private ProductIsSavedInMemory(): boolean {
    return this.generalCart.isSavedInMemory('products', this.product.id);
  }

  private addCartItemInMemory() {
    this.generalCart.addMemory('cartItems', this);
  }

  private addProductInMemory(productInGeneralCart: ProductInGeneralCart) {
    this.generalCart.addMemory('products', productInGeneralCart);
  }

  private addCartItemInProduct() {
    if(this.ProductIsSavedInMemory()) {
      const productInGeneralCart = this.generalCart.getMemory('products', this.product.id);
      productInGeneralCart.addChildren(this);
    } else {
      const newProductInGeneralCart = new ProductInGeneralCart(this);
      this.addProductInMemory(newProductInGeneralCart);
    }
  }
}
