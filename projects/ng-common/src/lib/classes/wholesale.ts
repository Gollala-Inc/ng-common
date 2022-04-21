import {Product} from "../interface/product.model";
import {CartItems} from "../interface/cart-item.model";
import {GeneralCart} from "./cart";
import {ProductsInGeneralCart} from './product';

interface ProductInGeneralCart {
  productId: string;
  name: string;
  image: string;
  totalPrice: number;
  latestDate: number;
  cartItems: CartItems;
  detail: Product;
}

interface WholesaleInCart {
  seq: string;
  name: string;
  address: string;
  cartItems: CartItems;
  products: ProductInGeneralCart[];
  latestDate?: number;
}

class Wholesales {
  private wholesales: {[key:string]: WholesaleInCart} = {};
  private generalCart = GeneralCart;

  public addProductInWholesales(products:{[key: string]: ProductInGeneralCart}) {
    for(const productId in products) {
      const product = products[productId];
      const detail = product.detail;
      const seq = detail.wsSeq;

      if(this.wholesales[seq]) {
        this.wholesales[seq]['products'].push(product);
        this.wholesales[seq]['cartItems'].push(...product.cartItems);
      } else {
        this.wholesales[seq] = {
          seq: detail.wsSeq,
          name: detail.wholesale.name,
          address: `${detail.wholesale.building} ${detail.wholesale.floor} ${detail.wholesale.section}`,
          products: [product],
          cartItems: [...product.cartItems]
        }
      }

      const latestDate = this.wholesales[seq].products.reduce((result: number, product) => {
        return result > product.latestDate ? result : product.latestDate;
      }, 0);
      this.wholesales[seq]['latestDate'] = latestDate;
    }
  }

  public getWholesales() {
    return this.wholesales;
  }

  public addWholesalesInCart() {
    const wholesales = Object.values(this.wholesales);
    this.generalCart.setGeneralCart(wholesales);
  }
  // static wholesales: {[key:string]: WholesaleInCart} = {};
  //
}

export const WholesaleInGeneralCart = new Wholesales();
