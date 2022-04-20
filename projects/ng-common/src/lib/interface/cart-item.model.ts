interface CartItemOption {
  color: string;
  size: string;
}

export interface CartItem {
  _id: string;
  product: string;
  productName: string;
  options: CartItemOption;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type CartItems = CartItem[];
