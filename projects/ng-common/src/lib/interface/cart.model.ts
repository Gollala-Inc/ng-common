export interface CustomOrderItem {
  _id: string;
  wholesaleName?: string;
  wholesale?:	{
    description: string;
    type:	string;
    id:	string;
    name:	string;
  }
  address?: string;
  phone?: string;
  productName?: string;
  options?: string;
  price?: number;
  quantity?: number;
  others?: string;
  comment?: string;
  building?:	string;
  floor?:	string;
  room?:	string;
  retailProductName?:	string;
  color?:	string;
  size?:	string;
  createdAt?:string;
  updatedAt?: string;
}

interface CartItemOptions {
  color: string;
  size: string;
}

export interface CartItem {
  product: string;
  options: CartItemOptions;
  quantity: number;
}

export interface CartInfo {
  products: CartItem[];
  excels: CustomOrderItem[];
  productsCnt: number;
  excelsCnt: number;
  totalCnt: number;
}

export interface ProductItemInCart {
  _id: string;
  product: string;
  productName: string;
  options: CartItemOptions;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}


export interface SelectedProductsInfo {
  totalPrice: number;
  num: number;
  pcs: number;
  cartIds: {[key:string]: boolean | null};
  productIds: {[key: string]: boolean | null};
}

export interface SelectedExcelsInfo {
  totalPrice: number;
  noPriceNum: number;
  num: number;
  pcs: number;
  ids: {[key:string]: boolean | null};
}


export interface ProductCartInfo {
  _id: string;
  customer: string;
  items: ProductItemInCart[];
  discount: {
    cart: {
      coupon: string;
      discounts: string[];
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CustomOrderItem {
  _id: string;
  wholesaleName?: string;
  wholesale?:	{
    description: string;
    type:	string;
    id:	string;
    name:	string;
  }
  address?: string;
  phone?: string;
  productName?: string;
  options?: string;
  price?: number;
  quantity?: number;
  others?: string;
  comment?: string;
  building?:	string;
  floor?:	string;
  room?:	string;
  retailProductName?:	string;
  color?:	string;
  size?:	string;
  createdAt?:string;
  updatedAt?: string;
}

export interface CustomerCart {
  _id: string;
  customer: string;
  items: CustomOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}


