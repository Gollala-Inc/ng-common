import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {tap} from "rxjs/operators";

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
  private _orders: any[] = [];
  private _customOrders: CustomOrder[] = [];
  private _latestUnclePhone: string | null = null;

  constructor(
    private restService: RestService
  ) { }

  get orders(): any {
    return this._orders;
  }

  get customOrders(): CustomOrder[] {
    return this._customOrders;
  }

  get latestUnclePhone(): string | null {
    return this._latestUnclePhone;
  }

  getOrders() {
    return this.restService.GET('https://commerce-api.gollala.org/customer/auth/order?limit=12&page=1&sort=-createdAt').pipe(
      tap((orders) => {
        this._orders = orders;
      })
    );
  }

  getOrderItem(params?: {limit?: number; page?: number; sort?: string}) {
    this.restService.GET(`https://commerce-api.gollala.org/customer/auth/order-item`, {
      params
    });
  }

  getCustomOrders() {
    return this.restService.GET('https://commerce-api.gollala.org/custom_order/auth/me').pipe(
      tap((orders: CustomOrder[]) => {
          this._customOrders = orders;
          if (orders.length) {
            this._latestUnclePhone = orders.slice(-1)[0].unclePhone;
          }
        }
      )
    )
  }

  getCustomOrderItem(id:string) {
    return this.restService.GET(`https://commerce-api.gollala.org/custom_order_item/${id}`);
  }


}
