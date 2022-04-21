import {CartItem, CartItems} from "../interface/cart-item.model";
import {Product} from "../interface/product.model";
import {WholesaleInGeneralCart} from "./wholesale";

interface ProductInGeneralCart {
  productId: string;
  name: string;
  image: string;
  totalPrice: number;
  latestDate: number;
  cartItems: CartItems;
}

export class ProductsInGeneralCart {
  static products: {
    [key: string]: ProductInGeneralCart
  } = {};

  static addCartItemInProducts(cartItem: CartItem, product: Product) {
    const productId = cartItem.product;
    const option = {
      cartItemId: cartItem._id,
      name: `${cartItem.options.color} / ${cartItem.options.size}`,
      price: product.price,
      quantity: cartItem.quantity,
      totalPrice: cartItem.quantity * product.price,
      createdAt: +new Date(cartItem.createdAt)
    }


    if(this.products[productId]) {
      this.products[productId]['totalPrice'] += option.totalPrice;
      this.products[productId]['latestDate'] = this.products[productId]['latestDate'] >= option.createdAt ? this.products[productId]['latestDate'] : option.createdAt;
      this.products[productId]['cartItems'].push(cartItem);
    } else {
      this.products[productId] = {
        productId: productId,
        name: product.name,
        image: product.imgPaths[0],
        totalPrice: option.totalPrice,
        cartItems: [cartItem],
        latestDate: option.createdAt
      };
    }

    WholesaleInGeneralCart.addProductInWholesales(product, this.products);
  }

  static getCartItems() {
    return this.products;
  }
}
