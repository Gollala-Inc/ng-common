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

interface Cart {
  data: WholesaleInCart[];
}

export class GeneralCart {
  static cart: Cart = {
    data: []
  };

  static setGeneralCart(data: WholesaleInCart[]) {
    this.cart.data = data.sort((a,b) => {
      const aLatestDate = a.latestDate as number;
      const bLatestDate = b.latestDate as number;

      if(aLatestDate > bLatestDate) return 1;
      if(bLatestDate === bLatestDate) return 0;
      return -1;
    });

    console.log(this.cart.data);
  }
}
