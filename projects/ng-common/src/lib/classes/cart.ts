import {CartItem} from "../interface/cart-item.model";
interface ProductInGeneralCart {
  productId: string;
  name: string;
  image: string;
  totalPrice: number;
  latestDate: number;
}

interface WholesaleInCart {
  seq: string;
  name: string;
  address: string;
  latestDate?: number;
  products: ProductInGeneralCart[];
}

export class Cart {
  cart: {
    general: WholesaleInCart[]
  } = {
    general: []
  };

  public setGeneralCart(wholesales: WholesaleInCart[]) {
    this.cart.general = wholesales.sort((a,b) => {
      const aLatestDate = a.latestDate as number;
      const bLatestDate = b.latestDate as number;

      if(aLatestDate > bLatestDate) return 1;
      if(bLatestDate === bLatestDate) return 0;
      return -1;
    });
  }
}

export const GeneralCart = new Cart();
