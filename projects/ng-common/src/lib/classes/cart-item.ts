import {CartItem} from "../interface/cart-item.model";
import {Product} from "../interface/product.model";
import {ProductsInGeneralCart} from './product';

export class GeneralCartItem {
  private products = ProductsInGeneralCart;

  constructor(
    cartItem: CartItem,
    product: Product
  ) {
    this.products.addCartItemInProducts(cartItem, product);
  }
}
