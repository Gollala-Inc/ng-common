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
  private _orderNumInStore: number = 0;

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

  get orderNumInStore(): number {
    return this._orderNumInStore;
  }

  getOrders(params?: {limit?: number; page?:number; sort?: string; populate?: boolean}) {
    return this.restService.GET('https://commerce-api.gollala.org/customer/auth/order', {
      params,
      handleError: true
    }).pipe(
      tap((orders) => {
        this._orders = orders;
      })
    );
  }

  getOrder(id: string) {
    return this.restService.GET(`https://commerce-api.gollala.org/order/${id}`, {handleError: true});
  }

  getOrderItem(id: string) {
    return this.restService.GET(`https://commerce-api.gollala.org/order_item/${id}`, {
      handleError: true
    });
  }

  getCustomOrders(params?: {populate?: boolean}) {
    return this.restService.GET('https://commerce-api.gollala.org/custom_order/auth/me', {params, handleError: true}).pipe(
      tap((orders: CustomOrder[]) => {
          this._customOrders = orders;
          if (orders.length) {
            this._latestUnclePhone = orders.slice(-1)[0].unclePhone;
          }
        }
      )
    )
  }

  getCustomOrder(id: string) {
    return this.restService.GET(`https://commerce-api.gollala.org/custom_order/${id}`, {handleError: true});
  }

  getCustomOrderItem(id: string) {
    return this.restService.GET(`https://commerce-api.gollala.org/custom_order_item/${id}`, {
      handleError: true
    });
  }

  setOrderNumInStore(num: number) {
    this._orderNumInStore = num;
  }
}
