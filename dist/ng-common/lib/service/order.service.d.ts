import { RestService } from "./rest.service";
import * as i0 from "@angular/core";
export interface CustomOrder {
    customer: string;
    done: boolean;
    items: string[];
    type: 'general' | 'excel';
    unclePhone: string;
    _id: string;
}
export declare class OrderService {
    private restService;
    private _orders;
    private _latestUnclePhone;
    constructor(restService: RestService);
    get orders(): CustomOrder[];
    get latestUnclePhone(): string | null;
    getOrderInfo(): void;
    getOrderItem(id: string): import("rxjs").Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderService>;
}
