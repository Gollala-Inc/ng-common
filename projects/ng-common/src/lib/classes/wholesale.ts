import {Product} from "../interface/product.model";
import {CartItems} from "../interface/cart-item.model";
import {GeneralCart} from "./cart";

interface ProductInGeneralCart {
  productId: string;
  name: string;
  image: string;
  totalPrice: number;
  latestDate: number;
  cartItems: CartItems;
}

interface WholesaleInCart {
  seq: string;
  name: string;
  address: string;
  latestDate?: number;
  cartItems: CartItems;
  products: ProductInGeneralCart[];
}


export class WholesaleInGeneralCart {
  static wholesales: {[key:string]: WholesaleInCart} = {};

  static addProductInWholesales(product: Product, products:{[key: string]: ProductInGeneralCart}) {
    const seq = product.wsSeq;

    if(this.wholesales[seq]) {
      this.wholesales[seq]['products'] = Object.values(products);
      this.wholesales[seq]['cartItems'].push(...products[product.id].cartItems);
    } else {
      this.wholesales[seq] = {
        seq: product.wsSeq,
        name: product.wholesale.name,
        address: `${product.wholesale.building} ${product.wholesale.floor} ${product.wholesale.section}`,
        products: Object.values(products),
        cartItems: [...products[product.id].cartItems]
      }
    }
    const latestDate = this.wholesales[seq].products.reduce((result: number, product) => {
      return result > product.latestDate ? result : product.latestDate;
    }, 0)

    this.wholesales[seq].latestDate = latestDate;
    GeneralCart.setGeneralCart(Object.values(this.wholesales));
  }
}
