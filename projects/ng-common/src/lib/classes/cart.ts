import {CartItem} from "../interface/cart-item.model";
import {GeneralCartItem} from "./cart-item";
import {WholesaleInGeneralCart} from "./wholesale";
import {ProductInGeneralCart} from "./product";

type MemoryType = 'cartItems' | 'products' | 'wholesales';
type MemoryContent = GeneralCartItem | ProductInGeneralCart | WholesaleInGeneralCart;

interface Memory {
  cartItems: any;
  products: any;
  wholesales: any;
}

export class Cart {
  private memory: Memory = {
    cartItems: {},
    products: {},
    wholesales: {}
  }

  constructor() {}

  public addMemory(type: MemoryType, content: MemoryContent) {
    const id = content.id as string;
    this.memory[type][id] = content;
  }

  public getMemory(type: MemoryType, id: string) {
    return this.memory[type][id];
  }

  public isSavedInMemory(type: MemoryType, id: string) {
    return !!this.memory[type][id];
  }
}

export const GeneralCart = new Cart();
