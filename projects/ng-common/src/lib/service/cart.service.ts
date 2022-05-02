import {Injectable} from '@angular/core';
import {catchError, mergeMap, throwError, of, tap, map} from 'rxjs';
import {CartInfo, CartItem} from "../interface/cart.model";
import {Observable} from "rxjs";
import {RestService} from './rest.service';
import {BehaviorSubject} from "rxjs";

type TypeNames = 'gollala' | 'store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _customCartId!: string;
  private _cartId!: string;
  private _selectedOrderType: BehaviorSubject<TypeNames> = new BehaviorSubject<TypeNames>('gollala');

  cartInfo$: BehaviorSubject<CartInfo> =  new BehaviorSubject<CartInfo>({
    products: [],
    excels: [],
    productsCnt: 0,
    excelsCnt: 0,
    totalCnt: 0
  });
  cartCounts$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get customCartId() {
    return this._customCartId;
  }

  get cartId() {
    return this._cartId;
  }

  get cartInfo() {
    return this.cartInfo$.getValue();
  }

  get selectedOrderType() {
    return this._selectedOrderType;
  }

  constructor(
    private restService: RestService,
  ) { }

  addCart(body: any): Observable<{_id: string; items: CartItem[]}> {
    return this.restService.POST('https://commerce-api.gollala.org/cart/add', {
      body,
      handleError: true
    });
  }

  subtractCart(body: any): Observable<{_id: string; items: CartItem[]}>  {
    return this.restService.POST('https://commerce-api.gollala.org/cart/subtract', {
      body,
      handleError: true
    });
  }

  getAuthCart() {
    return this.restService.GET('https://commerce-api.gollala.org/customer/auth/cart', {handleError: true});
  }

  getAuthCustomCart() {
    return this.restService.GET('https://commerce-api.gollala.org/custom_cart/auth/me', {handleError: true})
  }

  requestProductList(ids: string[]) {
    const body = {ids};
    return this.restService.POST('/api/product/bo/productListByIds', {body, handleError: true});
  }

  addCustomCart(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/custom_cart/', {
      body,
      handleError: true
    })
  }

  createCustomCart(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/custom_cart/add_from_cart', {
      body,
      handleError: true
    })
  }

  putCustomCart(body: any) {
    return this.restService.PUT('https://commerce-api.gollala.org/custom_cart/', {
      body,
      handleError: true
    })
  }


  getCartCounts() {
    let cartItems:any[] = [];
    let productsCnt = 0;

    return this.getAuthCart().pipe(
      catchError((e) => {
        console.log(e);
        return throwError(e);
      }),
      mergeMap(cartDoc => {
        cartItems = cartDoc.items;
        this._cartId = cartDoc._id;
        const productIds = cartDoc.items.map((cartItem: { product: any; }) => cartItem.product);
        return this.requestProductList(productIds);
      }),
      mergeMap(products => {
        productsCnt = products.length;
        return this.getAuthExcelCart();
      })
    ).subscribe(((customCartInfo: any) => {
      this._customCartId = customCartInfo._id;
      this.cartCounts$.next(productsCnt + customCartInfo.items.length);
    }))
  }


  checkoutCustomCart(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/custom_cart/checkout', {
      body,
      handleError: true
    });
  }


  addBillingAddress(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/customer/auth/billing_address/', {
      body
    }).pipe(mergeMap(({billingAddresses: {secondaries}}) => {
      const {_id} = secondaries.slice(-1)[0];
      return this.restService.POST('https://commerce-api.gollala.org/customer/auth/billing_address/primary', {
        body: {
          _id
        }
      });
    }))
  }

  addAddress(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address', {
      body: body
    }).pipe(
      mergeMap(({addresses: {secondaries}}: any) => {
        const {_id} = secondaries.slice(-1)[0];
        return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address/primary', {
          body: {
            _id
          }
        });
      })
    );
  }

  updateAddress(id: string, body: any) {
    return this.restService.PUT('https://commerce-api.gollala.org/customer/auth/address', {
      body: {
        addressId: id,
        ...body
      },
      handleError: true
    });
  }

  deleteAddress(id: string) {
    return this.restService.DELETE( `https://commerce-api.gollala.org/customer/auth/address/${id}`,
      { handleError: true}).pipe(
      catchError((e) => {
        console.log(e);
        return throwError(e);
      }),
      mergeMap((userInfo) => {
        const { secondaries } = userInfo.addresses;
        if (secondaries.length > 0) {
          const lastId = secondaries.slice(-1)[0]._id;
          return this.setPrimaryAddress(lastId);
        }
        return of(userInfo);
      })
    );
  }

  cartCheckout(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/cart/checkout', {
      body,
      handleError: true
    })
  }


  setPrimaryAddress(id: string) {
    return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address/primary', {
      body: {
        _id: id
      },
      handleError: true
    });
  }

  setPrimaryBillingAddress(id: string) {
    return this.restService.POST('https://commerce-api.gollala.org/customer/auth/billing_address/primary', {
      body: {
        _id: id
      },
      handleError: true
    });
  }
}
