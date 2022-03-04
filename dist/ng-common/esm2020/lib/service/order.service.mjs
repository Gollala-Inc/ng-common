import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./rest.service";
export class OrderService {
    constructor(restService) {
        this.restService = restService;
        this._orders = [];
        this._latestUnclePhone = null;
    }
    get orders() {
        return this._orders;
    }
    get latestUnclePhone() {
        return this._latestUnclePhone;
    }
    getOrderInfo() {
        this.restService.GET('https://commerce-api.gollala.org/custom_order/auth/me').subscribe((orders) => {
            this._orders = orders;
            if (orders.length) {
                this._latestUnclePhone = orders.slice(-1)[0].unclePhone;
            }
        });
    }
    getOrderItem(id) {
        return this.restService.GET(`https://commerce-api.gollala.org/custom_order_item/${id}`);
    }
}
OrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: OrderService, deps: [{ token: i1.RestService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: OrderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: OrderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RestService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL3NlcnZpY2Uvb3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFlM0MsTUFBTSxPQUFPLFlBQVk7SUFJdkIsWUFDVSxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUoxQixZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUM1QixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO0lBSTVDLENBQUM7SUFFTCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFxQixFQUFFLEVBQUU7WUFDaEgsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzthQUN6RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxFQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsc0RBQXNELEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7eUdBM0JVLFlBQVk7NkdBQVosWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Jlc3RTZXJ2aWNlfSBmcm9tIFwiLi9yZXN0LnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21PcmRlciB7XG4gIGN1c3RvbWVyOiBzdHJpbmc7XG4gIGRvbmU6IGJvb2xlYW47XG4gIGl0ZW1zOiBzdHJpbmdbXTtcbiAgdHlwZTogJ2dlbmVyYWwnIHwgJ2V4Y2VsJztcbiAgdW5jbGVQaG9uZTogc3RyaW5nO1xuICBfaWQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfb3JkZXJzOiBDdXN0b21PcmRlcltdID0gW107XG4gIHByaXZhdGUgX2xhdGVzdFVuY2xlUGhvbmU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzdFNlcnZpY2U6IFJlc3RTZXJ2aWNlXG4gICkgeyB9XG5cbiAgZ2V0IG9yZGVycygpOiBDdXN0b21PcmRlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fb3JkZXJzO1xuICB9XG5cbiAgZ2V0IGxhdGVzdFVuY2xlUGhvbmUoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2xhdGVzdFVuY2xlUGhvbmU7XG4gIH1cblxuICBnZXRPcmRlckluZm8oKSB7XG4gICAgdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9vcmRlci9hdXRoL21lJykuc3Vic2NyaWJlKChvcmRlcnM6IEN1c3RvbU9yZGVyW10pID0+IHtcbiAgICAgIHRoaXMuX29yZGVycyA9IG9yZGVycztcbiAgICAgIGlmIChvcmRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2xhdGVzdFVuY2xlUGhvbmUgPSBvcmRlcnMuc2xpY2UoLTEpWzBdLnVuY2xlUGhvbmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRPcmRlckl0ZW0oaWQ6c3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuR0VUKGBodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fb3JkZXJfaXRlbS8ke2lkfWApO1xuICB9XG59XG4iXX0=