import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, mergeMap, throwError} from 'rxjs';
import {forkJoin, of} from "rxjs";
import {
  CartInfo, CartItem, SelectedExcelsInfo, SelectedProductsInfo
} from "../interface/cart.model";
import {Observable} from "rxjs";
import {RestService} from './rest.service';
import {DialogService} from './dialog.service';
import {LoadingService} from './loading.service';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartInfo: CartInfo = {
    products: [],
    excels: [],
    productsCnt: 0,
    excelsCnt: 0,
    totalCnt: 0
  }

  /*
  * 카트 결제 단계
  * pending: 데이터 불러오는 중
  * cart: 데이터가 1개 이상 및 카트 페이지에 있을 때
  * empty: 데이터가 한 개도 없을 떄
  * error: 데이터를 가져오는데 에러가 났을 경우
  * payment: 원스톱 결제 선택 후 결제 페이지에 있는 경우
  * complete-store-order: 매장 주문을 완료했을 경우
  * complete-card-payment: 국내 카드 결제를 완료했을 경우
  * complete-v-account: 가상 계좌 결제를 완료했을 경우
  * */
  private _step: 'pending' | 'cart' | 'empty' | 'error' | 'payment' | 'complete-store-order' | 'complete-card-payment' | 'complete-v-account' = 'pending';

  private _customCartId!: string;
  private _cartId!: string;
  private _customerId!: string;
  private _memoExcelsInfo: any = {};
  private _memoProductsInfo: any = {};
  private _selectedProductsInfo: SelectedProductsInfo = {
    totalPrice: 0,
    num: 0,
    pcs: 0,
    cartIds: {},
    productIds: {}
  };
  private _selectedExcelsInfo: SelectedExcelsInfo = {
    totalPrice: 0,
    noPriceNum: 0,
    num: 0,
    pcs: 0,
    ids: {}
  };

  cartInfo$ =  new BehaviorSubject<CartInfo>(this.cartInfo);
  completedCartItemsOrder: any = null;
  completedOrderInCart: any = null;

  constructor(
    private restService: RestService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) { }

  get step() {
    return this._step;
  }

  get memoExcelsInfo() {
    /*
    * 키[custom cart item id]: 엑셀 아이템 정보를 담고 있음
    * */
    return this._memoExcelsInfo;
  }

  get memoProductsInfo() {
    /*
    * 키[cart item id]: 상품 아이템 정보를 담고 있음
    * */
    return this._memoProductsInfo;
  }

  get selectedProductsInfo() {
    /*
    * 선택된 카트들의 정보를 리턴한다.
    * */
    return this._selectedProductsInfo;
  }

  get selectedExcelsInfo () {
    /*
    * 선택된 엑셀의 정보를 리턴한다.
    * */
    return this._selectedExcelsInfo;
  }


  addCart(items: CartItem[]): Observable<{_id: string; items: CartItem[]}> {
    /*
    * 카트에 상품 추가 (프로덕트 상품만, 엑셀 상품은 추가 못함)
    * */
    const body = {
      _id: this._cartId,
      items
    }

    return this.restService.POST('https://commerce-api.gollala.org/cart/add', {
      body,
      handleError: true
    });
  }

  subtractCart(items: CartItem[]): Observable<{_id: string; items: CartItem[]}>  {
    /*
    * 카트에 상품 뺴기 (프로덕트 상품만, 엑셀 상품은 추가 못함)
    * */
    const body = {
      _id: this._cartId,
      items
    }

    return this.restService.POST('https://commerce-api.gollala.org/cart/subtract', {
      body,
      handleError: true
    });
  }

  setStep(value: 'pending' | 'cart' | 'empty' | 'error' | 'payment' | 'complete-store-order' | 'complete-card-payment' | 'complete-v-account'): void {
    /*
      * 카트 결제 단계
      * pending: 데이터 불러오는 중
      * cart: 데이터가 1개 이상 및 카트 페이지에 있을 때
      * empty: 데이터가 한 개도 없을 떄
      * error: 데이터를 가져오는데 에러가 났을 경우
      * payment: 원스톱 결제 선택 후 결제 페이지에 있는 경우
      * complete-store-order: 매장 주문을 완료했을 경우
      * complete-one-stop: 원스톱 주문을 완료했을 경우
    * */

    this._step = value;
  }

  resetSelectedProductsInfo (): void {
    this._selectedProductsInfo = {
      totalPrice: 0,
      num: 0,
      pcs: 0,
      cartIds: {},
      productIds: {}
    };
  }

  resetSelectedExcelInfo (): void {
    this._selectedExcelsInfo = {
      totalPrice: 0,
      noPriceNum: 0,
      num: 0,
      pcs: 0,
      ids: {}
    }
  }

  getAuthCart() {
    return this.restService.GET('https://commerce-api.gollala.org/customer/auth/cart', {handleError: true});
  }

  getAuthExcelCart() {
    return this.restService.GET('https://commerce-api.gollala.org/custom_cart/auth/me', {handleError: true})
  }

  requestProductList(ids: string[]) {
    const body = {ids};
    return this.restService.POST('/api/product/bo/productListByIds', {body, handleError: true});
  }

  putExcelCart(items: any[]) {
    const body = {
      _id: this._customCartId,
      items
    }
    return this.restService.PUT('https://commerce-api.gollala.org/custom_cart/', {
      body,
      handleError: true
    })
  }


  getCartInfo() {
    let cartItems:any[] = [];
    this.loadingService.start();
    this._step = 'pending';
    this.completedOrderInCart = null;

    this.getAuthCart().pipe(
      catchError((e) => {
        console.log(e);
        return throwError(e);
      }),
      mergeMap(cartDoc => {
        cartItems = cartDoc.items;
        this._customerId = cartDoc.customer;
        this._cartId = cartDoc._id;
        const productIds = cartDoc.items.map((cartItem: { product: any; }) => cartItem.product);

        return this.requestProductList(productIds);
      }),
      mergeMap(products => {
        // 받아온 products 배열을 객체화
        const memoProducts = products.reduce((result: any, product: any) => {
          result[product.id] = product;
          return result;
        }, {});

        /*
        * 하나의 상품(Product Id)에 옵션 하나하나(Cart Item Id)를 넣기 위해
        * */
        let productCart: any = cartItems.reduce((result, cartItem) => {
          const productId = cartItem.product;
          const productInfo = memoProducts[productId];
          const totalProductPrice = cartItem.quantity * productInfo.price;

          /* 카트 아이템에 대한 메모제이션 저장 */
          this._memoProductsInfo[cartItem._id] = {
            ...cartItem,
            product: productInfo
          }

          if(result.hasOwnProperty(productId)) {
            result[productId].totalPrice += totalProductPrice;

            if (result[productId].options[cartItem._id]){
              // 같은 옵션이 있는경우,
              result[productId].options[cartItem._id].quantity += cartItem.quantity;
              result[productId].options[cartItem._id].quantity += totalProductPrice;
            } else {
              const option = {
                cartItemId: cartItem._id,
                color: cartItem.options.color,
                size: cartItem.options.size,
                quantity: cartItem.quantity,
                totalPrice: totalProductPrice
              };
              result[productId].options[cartItem._id] = option;
            }
          } else {
            const {wholesale: {name, building, floor, section}} = productInfo;
            const option = {
              cartItemId: cartItem._id,
              color: cartItem.options.color,
              size: cartItem.options.size,
              quantity: cartItem.quantity,
              price: productInfo.price,
              totalPrice: totalProductPrice
            };

            result[productId] = {
              name: cartItem.productName,
              productId,
              wholesaleName: `${name}(${building} ${floor}층 ${section})`,
              options: {
                [cartItem._id]: option
              },
              imagePath: productInfo.imgPaths[0],
              price: productInfo.price,
              totalPrice: totalProductPrice
            }
          }

          return result;
        }, {});

        productCart = Object.values(productCart).map((cartItem: any) => {
          cartItem.options = Object.values(cartItem.options);
          return cartItem;
        });

        this.cartInfo.products = productCart;
        this.cartInfo.productsCnt = products.length;
        return this.getAuthExcelCart();
      })
    ).subscribe(
      (customCartInfo) => {
        this._customCartId = customCartInfo._id;
        this.cartInfo.excels = customCartInfo.items;
        this.cartInfo.excelsCnt = customCartInfo.items.length;
        this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;
        this._step = this.cartInfo.totalCnt > 0 ? 'cart' : 'empty';

        /* 엑셀 주문(CustomCart) 메모제이션 생성 */
        this._memoExcelsInfo = customCartInfo.items.reduce((result: any, item: any) => {
          result[item._id] = item;
          return result;
        }, {});

        this.loadingService.stop();
        this.cartInfo$.next(this.cartInfo);
      },
      (error) => {
        console.log(error);
        this.dialogService.alert('[에러] 상품 정보를 가져오는데 실패하였습니다.').subscribe(() => {
          this._step = 'error';
        });
      }
    );
  }

  deleteProductInCart(isPayment?: boolean) {
    const items: any[] = Object.keys(this._selectedProductsInfo.cartIds).map((id) => {
      const cartItem = this._memoProductsInfo[id];
      return {
        product: cartItem.product.id,
        options: cartItem.options,
        quantity: cartItem.quantity
      }
    });


    this.subtractCart(items).subscribe(
      () => {
          // 1. memoCartItems의 상품 아이디 키 값 삭제
          // 2. selectedCarts 초기화
          // 3. productCarts 삭제
          // 4. productCnt, totalCnt 업데이트
          // 5 cartInfo next
          this.cleanProductCart();
        },
  (error: any) => {
          console.log(error);
          this.dialogService.alert('[에러] 상품 삭제에 실패하였습니다.');
        }
      )
  }

  deleteProductOption(hasOneOption: boolean, cartItemId: string) {
    const {
      productName,
      options,
      product: { id: product},
      quantity,
      _id
    } = this._memoProductsInfo[cartItemId];

    const cartItem = {
      _id,
      productName,
      options,
      quantity,
      product
    };

    if (hasOneOption) {
      // 상품을 삭제한다.
      this.subtractCart([cartItem]).subscribe(
    () => {
            const index = this.cartInfo.products.findIndex((cart: any) => cart.productId === product);
            const products = this.cartInfo.products as any;
            const { totalPrice, quantity: pcs } = products[index].options[0];


            products.splice(index, 1);

            delete this._memoProductsInfo[cartItemId];

            if (this._selectedProductsInfo.cartIds[cartItemId]) {
              this._selectedProductsInfo.totalPrice -= totalPrice;
              this._selectedProductsInfo.pcs -= pcs;
            }

            this.cartInfo.productsCnt -= 1;
            this.cartInfo.totalCnt -= 1;

            this.cartInfo$.next({...this.cartInfo});
          },
    (error: any) => {
              console.log(error);
              this.dialogService.alert('[에러] 상품 삭제에 실패하였습니다.');
          }
        )
    } else {
      // 옵션만 삭제한다.
      this.subtractCart([cartItem]).subscribe(
        () => {
            const index = this.cartInfo.products.findIndex((cart: any) => cart.productId === product);
            const productCart = this.cartInfo.products[index] as any;
            const oIndex = productCart.options.findIndex((option: any) => option.cartItemId === cartItemId);
            const { totalPrice, quantity: pcs } = productCart.options[oIndex];

            productCart.options.splice(oIndex, 1);

            delete this._memoProductsInfo[cartItemId];

            if (this._selectedProductsInfo.cartIds[cartItemId]) {
              this._selectedProductsInfo.totalPrice -= totalPrice;
              this._selectedProductsInfo.pcs -= pcs;
            }
            this.cartInfo$.next({...this.cartInfo});
          },
          (error: any) => {
            console.log(error);
            this.dialogService.alert('[에러] 상품 옵션 삭제에 실패하였습니다.');
          }
      )
    }
  }

  deleteProductsAfterPayment(step: 'complete-card-payment' | 'complete-v-account') {
    /*
    * 카드 결제 후, 상품을 삭제하는 함수
    * */
    const items: any[] = Object.keys(this.selectedProductsInfo.cartIds).map((id) => {
      const cartItem = this.memoProductsInfo[id];
      return {
        product: cartItem.product.id,
        options: cartItem.options,
        quantity: cartItem.quantity
      }
    });

    return this.subtractCart(items).pipe(
      tap(() => {
        const firstKey =  Object.keys(this.selectedProductsInfo.cartIds)[0];
        const firstSelectCart = this.memoProductsInfo[firstKey];
        this.completedOrderInCart = {
          cartOrders: firstSelectCart
        };
        this.setStep(step);
        this.cleanProductCart(true);
      }));
  }

  deleteExcelCart() {
    const memo  = {...this._memoExcelsInfo};
    const ids = Object.keys(this._selectedExcelsInfo.ids);

    for(let i=0; i<ids.length; i++) {
      const id = ids[i];
      if(this._selectedExcelsInfo.ids[id]) {
        delete memo[id];
      }
    }

    const toDeleteItems = Object.values(memo);

    this.putExcelCart(toDeleteItems).subscribe(
      (customCartInfo) => {
              this._customCartId = customCartInfo._id;
              this.cartInfo.excels = customCartInfo.items;
              this.cartInfo.excelsCnt = customCartInfo.items.length;
              this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;

              this._memoExcelsInfo = customCartInfo.items.reduce((result: any, item: any) => {
                result[item._id] = item;
                return result;
              }, {});

              this._step = this.cartInfo.totalCnt > 0 ? 'cart' : 'empty';

              this._selectedExcelsInfo = {
                totalPrice: 0,
                noPriceNum: 0,
                num: 0,
                pcs: 0,
                ids: {}
              };

              this.cartInfo$.next({...this.cartInfo});
            },
          (error) => {
              console.log(error);
              this.dialogService.alert('[에러] 엑셀 상품 삭제에 실패하였습니다.');
          });
  }

  orderToStore(phone: string) {
    const idsInCartItems = Object.keys(this._selectedProductsInfo.cartIds);
    const idsInCustomCartItems = Object.keys(this._selectedExcelsInfo.ids).filter((id) => !!this._memoExcelsInfo[id].quantity);
    const cartItems = idsInCartItems.map((id) => {
      const {options, product, productName, quantity} = this._memoProductsInfo[id];
      return {
        wholesaleName: product.wholesale.name,
        wholesale: {
          type: '',
          id: product.wholesaleStoreId,
          name: product.wholesale.name
        },
        building: product.wholesale.building,
        floor: product.wholesale.floor,
        room: product.wholesale.section,
        address: `${product.wholesale.building}, ${product.wholesale.floor}, ${product.wholesale.section}`,
        phone: product.wholesale.phone,
        productName: productName,
        color: options.color,
        size: options.size,
        options: `${options.color} / ${options.size} / ${quantity}개`,
        price: `${product.price}`,
        quantity: `${quantity}`
      }
    });


    forkJoin(this.createCustomOrderUsingCartItems(cartItems, phone), this.createCustomCartOrder(idsInCustomCartItems, phone)).subscribe(
      (response) => {
        this.cleanProductCart();

        /*
        * 매장 주문 후, 생성된 주문 데이터를 저장하기 위해
        * */
        this.completedOrderInCart = {
          cartOrders: this.completedCartItemsOrder || null,
          customOrders: response[1] || null
        };

        this._step = 'complete-store-order';
        this.cartInfo$.next({...this.cartInfo});
      },
      (error: any) => {
        console.log(error);
        this.dialogService.alert('[에러] 매장 주문에 실패하였습니다.');
      }
    )
  }

  private createCustomCartOrder(items: any[], phone: string) {
    if(items.length === 0) return of(null);

    const body = {
      _id: this._customCartId,
      customer: this._customerId,
      type: 'general',
      unclePhone: phone,
      items
    }

    return this.restService.POST('https://commerce-api.gollala.org/custom_cart/checkout', {
      body,
      handleError: true
    });
  }


  private createCustomOrderUsingCartItems(items: any[], phone: string) {
    if(items.length === 0) return of(null);

    const idsInCartItems = Object.keys(this._selectedProductsInfo.cartIds);
    const body = {
      _id: this._customCartId,
      customer: this._customerId,
      type: 'general',
      unclePhone: phone,
      items
    }

    return this.restService.POST('https://commerce-api.gollala.org/custom_order/', {
      body: {
        ...body,
        items
      }
    }).pipe(
      mergeMap((response) => {
        const items = idsInCartItems.map((id) => {
          return {
            ...this._memoProductsInfo[id],
            product: this._memoProductsInfo[id].product.id
          }
        });

        this.completedCartItemsOrder = response;

        return this.restService.POST('https://commerce-api.gollala.org/cart/subtract', {
          body: {
            _id: this._cartId,
            items
          },
          handleError: true
        })
      })
    )
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
      body: {
        cartId: this._cartId,
        ...body
      },
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

  private cleanProductCart(isPayment?: boolean) {
    const deletedIds = Object.keys(this._selectedProductsInfo.cartIds);

    for(let i=0; i < deletedIds.length; i++) {
      const deletedCartId = deletedIds[i];
      const deletedProductId: any = this._memoProductsInfo[deletedCartId].product.id;
      const index = this.cartInfo.products.findIndex((item: any) => item.productId === deletedProductId);

      this.cartInfo.products.splice(index, 1);
      delete this._memoProductsInfo[deletedCartId];
    }

    this._selectedProductsInfo =  {
      totalPrice: 0,
      num: 0,
      pcs: 0,
      cartIds: {},
      productIds: {}
    }

    this.cartInfo.productsCnt = this.cartInfo.products.length;
    this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;

    if (!isPayment) {
      this._step = this.cartInfo.totalCnt > 0 ? 'cart' : 'empty';
    }

    this.cartInfo$.next({...this.cartInfo});
  }
}
