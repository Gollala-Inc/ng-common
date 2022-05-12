import {Injectable} from '@angular/core';
import {catchError, mergeMap, throwError, of, tap} from 'rxjs';
import {TotalCartsModel} from "../interface/cart.model";
import {Observable} from "rxjs";
import {RestService} from './rest.service';
import {BehaviorSubject} from "rxjs";
import {CartItemsModel} from "../interface/cart-item.model";

type TypeNames = 'gollala' | 'store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _customCartId!: string;
  private _cartId!: string;
  private _selectedOrderType: BehaviorSubject<TypeNames> = new BehaviorSubject<TypeNames>('gollala');
  private _lalaCounts: number = 0;
  private _storeCounts: number = 0;
  cartCounts$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get customCartId() {
    return this._customCartId;
  }

  get cartId() {
    return this._cartId;
  }

  get lalaCounts() {
    return this._lalaCounts;
  }

  get storeCounts() {
    return this._storeCounts;
  }

  get selectedOrderType() {
    return this._selectedOrderType;
  }

  constructor(
    private restService: RestService,
  ) { }

  addCart(body: any): Observable<{_id: string; items: CartItemsModel}> {
    return this.restService.POST('https://commerce-api.gollala.org/cart/add', {
      body,
      handleError: true
    });
  }

  updateCart(cartItemId: string, body: any) {
    return this.restService.PATCH(`https://commerce-api.gollala.org/cart/${this._cartId}/${cartItemId}`, {
      body,
      handleErorr: true
    });
  }

  updateCartItems(body: any) {
    return this.restService.PATCH(`https://commerce-api.gollala.org/cart/${this._cartId}`, {
      body,
      handleError: true
    })
  }

  subtractCart(body: any): Observable<{_id: string; items: CartItemsModel}>  {
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

  setCardId(id: string) {
    this._cartId = id;
  }

  setCustomCardId(id: string) {
    this._customCartId = id;
  }

  requestProductList(ids: string[]) {
    const body = {ids};
    return this.restService.POST('/api/product/bo/productListByIds', {body, handleError: true});
  }

  requestPopulatedProduct(ids: string[]) {
    const body = ids;
    return this.restService.POST('/api/brand/product/populate', {body, handleError: true});
  }

  addCustomCart(body: any) {
    return this.restService.POST('https://commerce-api.gollala.org/custom_cart/', {
      body,
      handleError: true
    })
  }

  updateCustomCart(customCartItemId: string, body: any) {
    return this.restService.PATCH(`https://commerce-api.gollala.org/custom_cart/${this._customCartId}/${customCartItemId}`, {
      body,
      handleError: true
    });
  }

  updateCustomCartItems(body: any) {
    return this.restService.PATCH(`https://commerce-api.gollala.org/custom_cart/${this._customCartId}`, {
      body,
      handleError: true
    });
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

  getAllCarts() {
    return this.restService.GET('https://commerce-api.gollala.org/customer/auth/carts', {handleError: true});
  }


  getCartCounts() {
    this.getAllCarts().subscribe(({cartItemsCount, customCartItemsCount, cart, customCart}: TotalCartsModel) => {
      this._lalaCounts = cartItemsCount;
      this._storeCounts = customCartItemsCount;
      this._customCartId = cart._id;
      this._customCartId = customCart._id;
      this.cartCounts$.next(this._lalaCounts + this._storeCounts);
    });
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
