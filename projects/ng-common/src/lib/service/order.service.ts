import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";

export interface CustomOrder {
  customer: string;
  done: boolean;
  items: string[];
  type: 'general' | 'excel';
  unclePhone: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orders: CustomOrder[] = [];
  private _latestUnclePhone: string | null = null;

  constructor(
    private restService: RestService
  ) { }

  get orders(): CustomOrder[] {
    return this._orders;
  }

  get latestUnclePhone(): string | null {
    return this._latestUnclePhone;
  }

  getOrderInfo() {
    this.restService.GET('https://commerce-api.gollala.org/custom_order/auth/me').subscribe((orders: CustomOrder[]) => {
      this._orders = orders;
      if (orders.length) {
        this._latestUnclePhone = orders.slice(-1)[0].unclePhone;
      }
    });
  }

  getOrderItem(id:string) {
    return this.restService.GET(`https://commerce-api.gollala.org/custom_order_item/${id}`);
  }
}
