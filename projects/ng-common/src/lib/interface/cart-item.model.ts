export interface CartItemModel {
  product: string;
  options: {
    color: string;
    size: string;
  };
  quantity: number;
}

export type CartItemsModel = CartItemModel[];
