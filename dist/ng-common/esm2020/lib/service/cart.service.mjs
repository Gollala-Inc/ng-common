import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, mergeMap, throwError } from 'rxjs';
import { forkJoin, of } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "@gollala/ng-common";
export class CartService {
    constructor(restService, dialogService, loadingService) {
        this.restService = restService;
        this.dialogService = dialogService;
        this.loadingService = loadingService;
        this.cartInfo = {
            products: [],
            excels: [],
            productsCnt: 0,
            excelsCnt: 0,
            totalCnt: 0
        };
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
        this._step = 'pending';
        this._memoExcelsInfo = {};
        this._memoProductsInfo = {};
        this._selectedProductsInfo = {
            totalPrice: 0,
            num: 0,
            pcs: 0,
            cartIds: {},
            productIds: {}
        };
        this._selectedExcelsInfo = {
            totalPrice: 0,
            noPriceNum: 0,
            num: 0,
            pcs: 0,
            ids: {}
        };
        this.cartInfo$ = new BehaviorSubject(this.cartInfo);
        this.completedCartItemsOrder = null;
        this.completedOrderInCart = null;
    }
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
    get selectedExcelsInfo() {
        /*
        * 선택된 엑셀의 정보를 리턴한다.
        * */
        return this._selectedExcelsInfo;
    }
    addCart(items) {
        /*
        * 카트에 상품 추가 (프로덕트 상품만, 엑셀 상품은 추가 못함)
        * */
        const body = {
            _id: this._cartId,
            items
        };
        return this.restService.POST('https://commerce-api.gollala.org/cart/add', {
            body,
            handleError: true
        });
    }
    subtractCart(items) {
        /*
        * 카트에 상품 뺴기 (프로덕트 상품만, 엑셀 상품은 추가 못함)
        * */
        const body = {
            _id: this._cartId,
            items
        };
        return this.restService.POST('https://commerce-api.gollala.org/cart/subtract', {
            body,
            handleError: true
        });
    }
    setStep(value) {
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
    resetSelectedProductsInfo() {
        this._selectedProductsInfo = {
            totalPrice: 0,
            num: 0,
            pcs: 0,
            cartIds: {},
            productIds: {}
        };
    }
    resetSelectedExcelInfo() {
        this._selectedExcelsInfo = {
            totalPrice: 0,
            noPriceNum: 0,
            num: 0,
            pcs: 0,
            ids: {}
        };
    }
    getAuthCart() {
        return this.restService.GET('https://commerce-api.gollala.org/customer/auth/cart', { handleError: true });
    }
    getAuthExcelCart() {
        return this.restService.GET('https://commerce-api.gollala.org/custom_cart/auth/me', { handleError: true });
    }
    requestProductList(ids) {
        const body = { ids };
        return this.restService.POST('/api/product/bo/productListByIds', { body, handleError: true });
    }
    putExcelCart(items) {
        const body = {
            _id: this._customCartId,
            items
        };
        return this.restService.PUT('https://commerce-api.gollala.org/custom_cart/', {
            body,
            handleError: true
        });
    }
    getCartInfo() {
        let cartItems = [];
        this.loadingService.start();
        this._step = 'pending';
        this.completedOrderInCart = null;
        this.getAuthCart().pipe(catchError((e) => {
            console.log(e);
            return throwError(e);
        }), mergeMap(cartDoc => {
            cartItems = cartDoc.items;
            this._customerId = cartDoc.customer;
            this._cartId = cartDoc._id;
            const productIds = cartDoc.items.map((cartItem) => cartItem.product);
            return this.requestProductList(productIds);
        }), mergeMap(products => {
            // 받아온 products 배열을 객체화
            const memoProducts = products.reduce((result, product) => {
                result[product.id] = product;
                return result;
            }, {});
            /*
            * 하나의 상품(Product Id)에 옵션 하나하나(Cart Item Id)를 넣기 위해
            * */
            let productCart = cartItems.reduce((result, cartItem) => {
                const productId = cartItem.product;
                const productInfo = memoProducts[productId];
                const totalProductPrice = cartItem.quantity * productInfo.price;
                /* 카트 아이템에 대한 메모제이션 저장 */
                this._memoProductsInfo[cartItem._id] = {
                    ...cartItem,
                    product: productInfo
                };
                if (result.hasOwnProperty(productId)) {
                    result[productId].totalPrice += totalProductPrice;
                    if (result[productId].options[cartItem._id]) {
                        // 같은 옵션이 있는경우,
                        result[productId].options[cartItem._id].quantity += cartItem.quantity;
                        result[productId].options[cartItem._id].quantity += totalProductPrice;
                    }
                    else {
                        const option = {
                            cartItemId: cartItem._id,
                            color: cartItem.options.color,
                            size: cartItem.options.size,
                            quantity: cartItem.quantity,
                            totalPrice: totalProductPrice
                        };
                        result[productId].options[cartItem._id] = option;
                    }
                }
                else {
                    const { wholesale: { name, building, floor, section } } = productInfo;
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
                    };
                }
                return result;
            }, {});
            productCart = Object.values(productCart).map((cartItem) => {
                cartItem.options = Object.values(cartItem.options);
                return cartItem;
            });
            this.cartInfo.products = productCart;
            this.cartInfo.productsCnt = products.length;
            return this.getAuthExcelCart();
        })).subscribe((customCartInfo) => {
            this._customCartId = customCartInfo._id;
            this.cartInfo.excels = customCartInfo.items;
            this.cartInfo.excelsCnt = customCartInfo.items.length;
            this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;
            this._step = this.cartInfo.totalCnt > 0 ? 'cart' : 'empty';
            /* 엑셀 주문(CustomCart) 메모제이션 생성 */
            this._memoExcelsInfo = customCartInfo.items.reduce((result, item) => {
                result[item._id] = item;
                return result;
            }, {});
            this.loadingService.stop();
            this.cartInfo$.next(this.cartInfo);
        }, (error) => {
            console.log(error);
            this.dialogService.alert('[에러] 상품 정보를 가져오는데 실패하였습니다.').subscribe(() => {
                this._step = 'error';
            });
        });
    }
    deleteProductInCart() {
        const items = Object.keys(this._selectedProductsInfo.cartIds).map((id) => {
            const cartItem = this._memoProductsInfo[id];
            return {
                product: cartItem.product.id,
                options: cartItem.options,
                quantity: cartItem.quantity
            };
        });
        this.subtractCart(items).subscribe(() => {
            // 1. memoCartItems의 상품 아이디 키 값 삭제
            // 2. selectedCarts 초기화
            // 3. productCarts 삭제
            // 4. productCnt, totalCnt 업데이트
            // 5 cartInfo next
            this.cleanProductCart();
        }, (error) => {
            console.log(error);
            this.dialogService.alert('[에러] 상품 삭제에 실패하였습니다.');
        });
    }
    deleteProductOption(hasOneOption, cartItemId) {
        const { productName, options, product: { id: product }, quantity, _id } = this._memoProductsInfo[cartItemId];
        const cartItem = {
            _id,
            productName,
            options,
            quantity,
            product
        };
        const body = {
            _id: this._cartId,
            items: [cartItem]
        };
        if (hasOneOption) {
            // 상품을 삭제한다.
            this.subtractCart([cartItem]).subscribe(() => {
                this.cleanProductCart();
            }, (error) => {
                console.log(error);
                this.dialogService.alert('[에러] 상품 삭제에 실패하였습니다.');
            });
        }
        else {
            // 옵션만 삭제한다.
            this.subtractCart([cartItem]).subscribe(() => {
                const index = this.cartInfo.products.findIndex((cart) => cart.productId === product);
                const productCart = this.cartInfo.products[index];
                const oIndex = productCart.options.findIndex((option) => option.cartItemId === cartItemId);
                const { totalPrice, quantity: pcs } = productCart.options[oIndex];
                productCart.options.splice(oIndex, 1);
                delete this._memoProductsInfo[cartItemId];
                if (this._selectedProductsInfo.cartIds[cartItemId]) {
                    this._selectedProductsInfo.totalPrice -= totalPrice;
                    this._selectedProductsInfo.pcs -= pcs;
                }
                this.cartInfo$.next({ ...this.cartInfo });
            }, (error) => {
                console.log(error);
                this.dialogService.alert('[에러] 상품 옵션 삭제에 실패하였습니다.');
            });
        }
    }
    deleteExcelCart() {
        const memo = { ...this._memoExcelsInfo };
        const ids = Object.keys(this._selectedExcelsInfo.ids);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            if (this._selectedExcelsInfo.ids[id]) {
                delete memo[id];
            }
        }
        const toDeleteItems = Object.values(memo);
        this.putExcelCart(toDeleteItems).subscribe((customCartInfo) => {
            this._customCartId = customCartInfo._id;
            this.cartInfo.excels = customCartInfo.items;
            this.cartInfo.excelsCnt = customCartInfo.items.length;
            this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;
            this._memoExcelsInfo = customCartInfo.items.reduce((result, item) => {
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
            this.cartInfo$.next({ ...this.cartInfo });
        }, (error) => {
            console.log(error);
            this.dialogService.alert('[에러] 엑셀 상품 삭제에 실패하였습니다.');
        });
    }
    orderToStore(phone) {
        const idsInCartItems = Object.keys(this._selectedProductsInfo.cartIds);
        const idsInCustomCartItems = Object.keys(this._selectedExcelsInfo.ids).filter((id) => !!this._memoExcelsInfo[id].quantity);
        const cartItems = idsInCartItems.map((id) => {
            const { options, product, productName, quantity } = this._memoProductsInfo[id];
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
            };
        });
        forkJoin(this.createCustomOrderUsingCartItems(cartItems, phone), this.createCustomCartOrder(idsInCustomCartItems, phone)).subscribe((response) => {
            this.cleanProductCart();
            /*
            * 매장 주문 후, 생성된 주문 데이터를 저장하기 위해
            * */
            this.completedOrderInCart = {
                cartOrders: this.completedCartItemsOrder || null,
                customOrders: response[1] || null
            };
            this._step = 'complete-store-order';
            this.cartInfo$.next({ ...this.cartInfo });
        }, (error) => {
            console.log(error);
            this.dialogService.alert('[에러] 매장 주문에 실패하였습니다.');
        });
    }
    createCustomCartOrder(items, phone) {
        if (items.length === 0)
            return of(null);
        const body = {
            _id: this._customCartId,
            customer: this._customerId,
            type: 'general',
            unclePhone: phone,
            items
        };
        return this.restService.POST('https://commerce-api.gollala.org/custom_cart/checkout', {
            body,
            handleError: true
        });
    }
    createCustomOrderUsingCartItems(items, phone) {
        if (items.length === 0)
            return of(null);
        const idsInCartItems = Object.keys(this._selectedProductsInfo.cartIds);
        const body = {
            _id: this._customCartId,
            customer: this._customerId,
            type: 'general',
            unclePhone: phone,
            items
        };
        return this.restService.POST('https://commerce-api.gollala.org/custom_order/', {
            body: {
                ...body,
                items
            }
        }).pipe(mergeMap((response) => {
            const items = idsInCartItems.map((id) => {
                return {
                    ...this._memoProductsInfo[id],
                    product: this._memoProductsInfo[id].product.id
                };
            });
            this.completedCartItemsOrder = response;
            return this.restService.POST('https://commerce-api.gollala.org/cart/subtract', {
                body: {
                    _id: this._cartId,
                    items
                },
                handleError: true
            });
        }));
    }
    addAddress(body) {
        return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address', {
            body: body
        }).pipe(mergeMap(({ addresses: { secondaries } }) => {
            const { _id } = secondaries.slice(-1)[0];
            return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address/primary', {
                body: {
                    _id
                }
            });
        }));
    }
    updateAddress(id, body) {
        return this.restService.PUT('https://commerce-api.gollala.org/customer/auth/address', {
            body: {
                addressId: id,
                ...body
            },
            handleError: true
        });
    }
    deleteAddress(id) {
        return this.restService.DELETE(`https://commerce-api.gollala.org/customer/auth/address/${id}`, { handleError: true }).pipe(catchError((e) => {
            console.log(e);
            return throwError(e);
        }), mergeMap((userInfo) => {
            const { secondaries } = userInfo.addresses;
            if (secondaries.length > 0) {
                const lastId = secondaries.slice(-1)[0]._id;
                return this.setPrimaryAddress(lastId);
            }
            return of(userInfo);
        }));
    }
    cartCheckout(body) {
        return this.restService.POST('https://commerce-api.gollala.org/cart/checkout', {
            body: {
                cartId: this._cartId,
                ...body
            },
            handleError: true
        });
    }
    setPrimaryAddress(id) {
        return this.restService.POST('https://commerce-api.gollala.org/customer/auth/address/primary', {
            body: {
                _id: id
            },
            handleError: true
        });
    }
    cleanProductCart() {
        const deletedIds = Object.keys(this._selectedProductsInfo.cartIds);
        for (let i = 0; i < deletedIds.length; i++) {
            const deletedCartId = deletedIds[i];
            const deletedProductId = this._memoProductsInfo[deletedCartId].product.id;
            const index = this.cartInfo.products.findIndex((item) => item.productId === deletedProductId);
            this.cartInfo.products.splice(index, 1);
            delete this._memoProductsInfo[deletedCartId];
        }
        this._selectedProductsInfo = {
            totalPrice: 0,
            num: 0,
            pcs: 0,
            cartIds: {},
            productIds: {}
        };
        this.cartInfo.productsCnt = this.cartInfo.products.length;
        this.cartInfo.totalCnt = this.cartInfo.excelsCnt + this.cartInfo.productsCnt;
        this._step = this.cartInfo.totalCnt > 0 ? 'cart' : 'empty';
        this.cartInfo$.next({ ...this.cartInfo });
    }
}
CartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CartService, deps: [{ token: i1.RestService }, { token: i1.DialogService }, { token: i1.LoadingService }], target: i0.ɵɵFactoryTarget.Injectable });
CartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CartService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.RestService }, { type: i1.DialogService }, { type: i1.LoadingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTbEMsTUFBTSxPQUFPLFdBQVc7SUE4Q3RCLFlBQ1UsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0N4QyxhQUFRLEdBQWE7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFRDs7Ozs7Ozs7O1lBU0k7UUFDSSxVQUFLLEdBQXNHLFNBQVMsQ0FBQztRQUtySCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQXlCO1lBQ3BELFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ00sd0JBQW1CLEdBQXVCO1lBQ2hELFVBQVUsRUFBRSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FB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JztcclxuaW1wb3J0IHtEaWFsb2dTZXJ2aWNlLCBMb2FkaW5nU2VydmljZSwgUmVzdFNlcnZpY2V9IGZyb20gJ0Bnb2xsYWxhL25nLWNvbW1vbic7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Zm9ya0pvaW4sIG9mfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQge1xyXG4gIENhcnRJbmZvLCBDYXJ0SXRlbSwgU2VsZWN0ZWRFeGNlbHNJbmZvLCBTZWxlY3RlZFByb2R1Y3RzSW5mb1xyXG59IGZyb20gXCIuLi9pbnRlcmZhY2UvY2FydC5tb2RlbFwiO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJ0U2VydmljZSB7XHJcblxyXG4gIGNhcnRJbmZvOiBDYXJ0SW5mbyA9IHtcclxuICAgIHByb2R1Y3RzOiBbXSxcclxuICAgIGV4Y2VsczogW10sXHJcbiAgICBwcm9kdWN0c0NudDogMCxcclxuICAgIGV4Y2Vsc0NudDogMCxcclxuICAgIHRvdGFsQ250OiAwXHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICog7Lm07Yq4IOqysOygnCDri6jqs4RcclxuICAqIHBlbmRpbmc6IOuNsOydtO2EsCDrtojrn6zsmKTripQg7KSRXHJcbiAgKiBjYXJ0OiDrjbDsnbTthLDqsIAgMeqwnCDsnbTsg4Eg67CPIOy5tO2KuCDtjpjsnbTsp4Dsl5Ag7J6I7J2EIOuVjFxyXG4gICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcclxuICAqIGVycm9yOiDrjbDsnbTthLDrpbwg6rCA7KC47Jik64qU642wIOyXkOufrOqwgCDrgqzsnYQg6rK97JqwXHJcbiAgKiBwYXltZW50OiDsm5DsiqTthrEg6rKw7KCcIOyEoO2DnSDtm4Qg6rKw7KCcIO2OmOydtOyngOyXkCDsnojripQg6rK97JqwXHJcbiAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXHJcbiAgKiBjb21wbGV0ZS1vbmUtc3RvcDog7JuQ7Iqk7YaxIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXHJcbiAgKiAqL1xyXG4gIHByaXZhdGUgX3N0ZXA6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcgPSAncGVuZGluZyc7XHJcblxyXG4gIHByaXZhdGUgX2N1c3RvbUNhcnRJZCE6IHN0cmluZztcclxuICBwcml2YXRlIF9jYXJ0SWQhOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfY3VzdG9tZXJJZCE6IHN0cmluZztcclxuICBwcml2YXRlIF9tZW1vRXhjZWxzSW5mbzogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBfbWVtb1Byb2R1Y3RzSW5mbzogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQcm9kdWN0c0luZm86IFNlbGVjdGVkUHJvZHVjdHNJbmZvID0ge1xyXG4gICAgdG90YWxQcmljZTogMCxcclxuICAgIG51bTogMCxcclxuICAgIHBjczogMCxcclxuICAgIGNhcnRJZHM6IHt9LFxyXG4gICAgcHJvZHVjdElkczoge31cclxuICB9O1xyXG4gIHByaXZhdGUgX3NlbGVjdGVkRXhjZWxzSW5mbzogU2VsZWN0ZWRFeGNlbHNJbmZvID0ge1xyXG4gICAgdG90YWxQcmljZTogMCxcclxuICAgIG5vUHJpY2VOdW06IDAsXHJcbiAgICBudW06IDAsXHJcbiAgICBwY3M6IDAsXHJcbiAgICBpZHM6IHt9XHJcbiAgfTtcclxuXHJcbiAgY2FydEluZm8kID0gIG5ldyBCZWhhdmlvclN1YmplY3Q8Q2FydEluZm8+KHRoaXMuY2FydEluZm8pO1xyXG4gIGNvbXBsZXRlZENhcnRJdGVtc09yZGVyOiBhbnkgPSBudWxsO1xyXG4gIGNvbXBsZXRlZE9yZGVySW5DYXJ0OiBhbnkgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzdFNlcnZpY2U6IFJlc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBnZXQgc3RlcCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1lbW9FeGNlbHNJbmZvKCkge1xyXG4gICAgLypcclxuICAgICog7YKkW2N1c3RvbSBjYXJ0IGl0ZW0gaWRdOiDsl5HshYAg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXHJcbiAgICAqICovXHJcbiAgICByZXR1cm4gdGhpcy5fbWVtb0V4Y2Vsc0luZm87XHJcbiAgfVxyXG5cclxuICBnZXQgbWVtb1Byb2R1Y3RzSW5mbygpIHtcclxuICAgIC8qXHJcbiAgICAqIO2CpFtjYXJ0IGl0ZW0gaWRdOiDsg4Htkogg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXHJcbiAgICAqICovXHJcbiAgICByZXR1cm4gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mbztcclxuICB9XHJcblxyXG4gIGdldCBzZWxlY3RlZFByb2R1Y3RzSW5mbygpIHtcclxuICAgIC8qXHJcbiAgICAqIOyEoO2DneuQnCDsubTtirjrk6TsnZgg7KCV67O066W8IOumrO2EtO2VnOuLpC5cclxuICAgICogKi9cclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbztcclxuICB9XHJcblxyXG4gIGdldCBzZWxlY3RlZEV4Y2Vsc0luZm8gKCkge1xyXG4gICAgLypcclxuICAgICog7ISg7YOd65CcIOyXkeyFgOydmCDsoJXrs7Trpbwg66as7YS07ZWc64ukLlxyXG4gICAgKiAqL1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mbztcclxuICB9XHJcblxyXG5cclxuICBhZGRDYXJ0KGl0ZW1zOiBDYXJ0SXRlbVtdKTogT2JzZXJ2YWJsZTx7X2lkOiBzdHJpbmc7IGl0ZW1zOiBDYXJ0SXRlbVtdfT4ge1xyXG4gICAgLypcclxuICAgICog7Lm07Yq47JeQIOyDge2SiCDstpTqsIAgKO2UhOuhnOuNle2KuCDsg4Htkojrp4wsIOyXkeyFgCDsg4HtkojsnYAg7LaU6rCAIOuqu+2VqClcclxuICAgICogKi9cclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIF9pZDogdGhpcy5fY2FydElkLFxyXG4gICAgICBpdGVtc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvYWRkJywge1xyXG4gICAgICBib2R5LFxyXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdWJ0cmFjdENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiAge1xyXG4gICAgLypcclxuICAgICog7Lm07Yq47JeQIOyDge2SiCDrurTquLAgKO2UhOuhnOuNle2KuCDsg4Htkojrp4wsIOyXkeyFgCDsg4HtkojsnYAg7LaU6rCAIOuqu+2VqClcclxuICAgICogKi9cclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIF9pZDogdGhpcy5fY2FydElkLFxyXG4gICAgICBpdGVtc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvc3VidHJhY3QnLCB7XHJcbiAgICAgIGJvZHksXHJcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFN0ZXAodmFsdWU6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcpOiB2b2lkIHtcclxuICAgIC8qXHJcbiAgICAgICog7Lm07Yq4IOqysOygnCDri6jqs4RcclxuICAgICAgKiBwZW5kaW5nOiDrjbDsnbTthLAg67aI65+s7Jik64qUIOykkVxyXG4gICAgICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXHJcbiAgICAgICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcclxuICAgICAgKiBlcnJvcjog642w7J207YSw66W8IOqwgOyguOyYpOuKlOuNsCDsl5Drn6zqsIAg64Ks7J2EIOqyveyasFxyXG4gICAgICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcclxuICAgICAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXHJcbiAgICAgICogY29tcGxldGUtb25lLXN0b3A6IOybkOyKpO2GsSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxyXG4gICAgKiAqL1xyXG5cclxuICAgIHRoaXMuX3N0ZXAgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJlc2V0U2VsZWN0ZWRQcm9kdWN0c0luZm8gKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8gPSB7XHJcbiAgICAgIHRvdGFsUHJpY2U6IDAsXHJcbiAgICAgIG51bTogMCxcclxuICAgICAgcGNzOiAwLFxyXG4gICAgICBjYXJ0SWRzOiB7fSxcclxuICAgICAgcHJvZHVjdElkczoge31cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXNldFNlbGVjdGVkRXhjZWxJbmZvICgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mbyA9IHtcclxuICAgICAgdG90YWxQcmljZTogMCxcclxuICAgICAgbm9QcmljZU51bTogMCxcclxuICAgICAgbnVtOiAwLFxyXG4gICAgICBwY3M6IDAsXHJcbiAgICAgIGlkczoge31cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEF1dGhDYXJ0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuR0VUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2NhcnQnLCB7aGFuZGxlRXJyb3I6IHRydWV9KTtcclxuICB9XHJcblxyXG4gIGdldEF1dGhFeGNlbENhcnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0L2F1dGgvbWUnLCB7aGFuZGxlRXJyb3I6IHRydWV9KVxyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFByb2R1Y3RMaXN0KGlkczogc3RyaW5nW10pIHtcclxuICAgIGNvbnN0IGJvZHkgPSB7aWRzfTtcclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJy9hcGkvcHJvZHVjdC9iby9wcm9kdWN0TGlzdEJ5SWRzJywge2JvZHksIGhhbmRsZUVycm9yOiB0cnVlfSk7XHJcbiAgfVxyXG5cclxuICBwdXRFeGNlbENhcnQoaXRlbXM6IGFueVtdKSB7XHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICBfaWQ6IHRoaXMuX2N1c3RvbUNhcnRJZCxcclxuICAgICAgaXRlbXNcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBVVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX2NhcnQvJywge1xyXG4gICAgICBib2R5LFxyXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICBnZXRDYXJ0SW5mbygpIHtcclxuICAgIGxldCBjYXJ0SXRlbXM6YW55W10gPSBbXTtcclxuICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RhcnQoKTtcclxuICAgIHRoaXMuX3N0ZXAgPSAncGVuZGluZyc7XHJcbiAgICB0aGlzLmNvbXBsZXRlZE9yZGVySW5DYXJ0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmdldEF1dGhDYXJ0KCkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xyXG4gICAgICB9KSxcclxuICAgICAgbWVyZ2VNYXAoY2FydERvYyA9PiB7XHJcbiAgICAgICAgY2FydEl0ZW1zID0gY2FydERvYy5pdGVtcztcclxuICAgICAgICB0aGlzLl9jdXN0b21lcklkID0gY2FydERvYy5jdXN0b21lcjtcclxuICAgICAgICB0aGlzLl9jYXJ0SWQgPSBjYXJ0RG9jLl9pZDtcclxuICAgICAgICBjb25zdCBwcm9kdWN0SWRzID0gY2FydERvYy5pdGVtcy5tYXAoKGNhcnRJdGVtOiB7IHByb2R1Y3Q6IGFueTsgfSkgPT4gY2FydEl0ZW0ucHJvZHVjdCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RQcm9kdWN0TGlzdChwcm9kdWN0SWRzKTtcclxuICAgICAgfSksXHJcbiAgICAgIG1lcmdlTWFwKHByb2R1Y3RzID0+IHtcclxuICAgICAgICAvLyDrsJvslYTsmKggcHJvZHVjdHMg67Cw7Je07J2EIOqwneyytO2ZlFxyXG4gICAgICAgIGNvbnN0IG1lbW9Qcm9kdWN0cyA9IHByb2R1Y3RzLnJlZHVjZSgocmVzdWx0OiBhbnksIHByb2R1Y3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmVzdWx0W3Byb2R1Y3QuaWRdID0gcHJvZHVjdDtcclxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICog7ZWY64KY7J2YIOyDge2SiChQcm9kdWN0IElkKeyXkCDsmLXshZgg7ZWY64KY7ZWY64KYKENhcnQgSXRlbSBJZCnrpbwg64Sj6riwIOychO2VtFxyXG4gICAgICAgICogKi9cclxuICAgICAgICBsZXQgcHJvZHVjdENhcnQ6IGFueSA9IGNhcnRJdGVtcy5yZWR1Y2UoKHJlc3VsdCwgY2FydEl0ZW0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IGNhcnRJdGVtLnByb2R1Y3Q7XHJcbiAgICAgICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IG1lbW9Qcm9kdWN0c1twcm9kdWN0SWRdO1xyXG4gICAgICAgICAgY29uc3QgdG90YWxQcm9kdWN0UHJpY2UgPSBjYXJ0SXRlbS5xdWFudGl0eSAqIHByb2R1Y3RJbmZvLnByaWNlO1xyXG5cclxuICAgICAgICAgIC8qIOy5tO2KuCDslYTsnbTthZzsl5Ag64yA7ZWcIOuplOuqqOygnOydtOyFmCDsoIDsnqUgKi9cclxuICAgICAgICAgIHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bY2FydEl0ZW0uX2lkXSA9IHtcclxuICAgICAgICAgICAgLi4uY2FydEl0ZW0sXHJcbiAgICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3RJbmZvXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYocmVzdWx0Lmhhc093blByb3BlcnR5KHByb2R1Y3RJZCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0udG90YWxQcmljZSArPSB0b3RhbFByb2R1Y3RQcmljZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0pe1xyXG4gICAgICAgICAgICAgIC8vIOqwmeydgCDsmLXshZjsnbQg7J6I64qU6rK97JqwLFxyXG4gICAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLm9wdGlvbnNbY2FydEl0ZW0uX2lkXS5xdWFudGl0eSArPSBjYXJ0SXRlbS5xdWFudGl0eTtcclxuICAgICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0ucXVhbnRpdHkgKz0gdG90YWxQcm9kdWN0UHJpY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgY2FydEl0ZW1JZDogY2FydEl0ZW0uX2lkLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IGNhcnRJdGVtLm9wdGlvbnMuY29sb3IsXHJcbiAgICAgICAgICAgICAgICBzaXplOiBjYXJ0SXRlbS5vcHRpb25zLnNpemUsXHJcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdID0gb3B0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB7d2hvbGVzYWxlOiB7bmFtZSwgYnVpbGRpbmcsIGZsb29yLCBzZWN0aW9ufX0gPSBwcm9kdWN0SW5mbztcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgIGNhcnRJdGVtSWQ6IGNhcnRJdGVtLl9pZCxcclxuICAgICAgICAgICAgICBjb2xvcjogY2FydEl0ZW0ub3B0aW9ucy5jb2xvcixcclxuICAgICAgICAgICAgICBzaXplOiBjYXJ0SXRlbS5vcHRpb25zLnNpemUsXHJcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IGNhcnRJdGVtLnF1YW50aXR5LFxyXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcclxuICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0gPSB7XHJcbiAgICAgICAgICAgICAgbmFtZTogY2FydEl0ZW0ucHJvZHVjdE5hbWUsXHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIHdob2xlc2FsZU5hbWU6IGAke25hbWV9KCR7YnVpbGRpbmd9ICR7Zmxvb3J97Li1ICR7c2VjdGlvbn0pYCxcclxuICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBbY2FydEl0ZW0uX2lkXTogb3B0aW9uXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBpbWFnZVBhdGg6IHByb2R1Y3RJbmZvLmltZ1BhdGhzWzBdLFxyXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcclxuICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIHByb2R1Y3RDYXJ0ID0gT2JqZWN0LnZhbHVlcyhwcm9kdWN0Q2FydCkubWFwKChjYXJ0SXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICBjYXJ0SXRlbS5vcHRpb25zID0gT2JqZWN0LnZhbHVlcyhjYXJ0SXRlbS5vcHRpb25zKTtcclxuICAgICAgICAgIHJldHVybiBjYXJ0SXRlbTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0cyA9IHByb2R1Y3RDYXJ0O1xyXG4gICAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQgPSBwcm9kdWN0cy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXV0aEV4Y2VsQ2FydCgpO1xyXG4gICAgICB9KVxyXG4gICAgKS5zdWJzY3JpYmUoXHJcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbUNhcnRJZCA9IGN1c3RvbUNhcnRJbmZvLl9pZDtcclxuICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2VscyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zO1xyXG4gICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuY2FydEluZm8udG90YWxDbnQgPSB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCArIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQ7XHJcbiAgICAgICAgdGhpcy5fc3RlcCA9IHRoaXMuY2FydEluZm8udG90YWxDbnQgPiAwID8gJ2NhcnQnIDogJ2VtcHR5JztcclxuXHJcbiAgICAgICAgLyog7JeR7IWAIOyjvOusuChDdXN0b21DYXJ0KSDrqZTrqqjsoJzsnbTshZgg7IOd7ISxICovXHJcbiAgICAgICAgdGhpcy5fbWVtb0V4Y2Vsc0luZm8gPSBjdXN0b21DYXJ0SW5mby5pdGVtcy5yZWR1Y2UoKHJlc3VsdDogYW55LCBpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlc3VsdFtpdGVtLl9pZF0gPSBpdGVtO1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQodGhpcy5jYXJ0SW5mbyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsoJXrs7Trpbwg6rCA7KC47Jik64qU642wIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fc3RlcCA9ICdlcnJvcic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQcm9kdWN0SW5DYXJ0KCkge1xyXG4gICAgY29uc3QgaXRlbXM6IGFueVtdID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcykubWFwKChpZCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJ0SXRlbSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2R1Y3Q6IGNhcnRJdGVtLnByb2R1Y3QuaWQsXHJcbiAgICAgICAgb3B0aW9uczogY2FydEl0ZW0ub3B0aW9ucyxcclxuICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHRoaXMuc3VidHJhY3RDYXJ0KGl0ZW1zKS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICAgIC8vIDEuIG1lbW9DYXJ0SXRlbXPsnZgg7IOB7ZKIIOyVhOydtOuUlCDtgqQg6rCSIOyCreygnFxyXG4gICAgICAgICAgLy8gMi4gc2VsZWN0ZWRDYXJ0cyDstIjquLDtmZRcclxuICAgICAgICAgIC8vIDMuIHByb2R1Y3RDYXJ0cyDsgq3soJxcclxuICAgICAgICAgIC8vIDQuIHByb2R1Y3RDbnQsIHRvdGFsQ250IOyXheuNsOydtO2KuFxyXG4gICAgICAgICAgLy8gNSBjYXJ0SW5mbyBuZXh0XHJcbiAgICAgICAgICB0aGlzLmNsZWFuUHJvZHVjdENhcnQoKTtcclxuICAgICAgICB9LFxyXG4gIChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlUHJvZHVjdE9wdGlvbihoYXNPbmVPcHRpb246IGJvb2xlYW4sIGNhcnRJdGVtSWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBwcm9kdWN0TmFtZSxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgcHJvZHVjdDogeyBpZDogcHJvZHVjdH0sXHJcbiAgICAgIHF1YW50aXR5LFxyXG4gICAgICBfaWRcclxuICAgIH0gPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2NhcnRJdGVtSWRdO1xyXG5cclxuICAgIGNvbnN0IGNhcnRJdGVtID0ge1xyXG4gICAgICBfaWQsXHJcbiAgICAgIHByb2R1Y3ROYW1lLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBxdWFudGl0eSxcclxuICAgICAgcHJvZHVjdFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcclxuICAgICAgaXRlbXM6IFtjYXJ0SXRlbV1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFzT25lT3B0aW9uKSB7XHJcbiAgICAgIC8vIOyDge2SiOydhCDsgq3soJztlZzri6QuXHJcbiAgICAgIHRoaXMuc3VidHJhY3RDYXJ0KFtjYXJ0SXRlbV0pLnN1YnNjcmliZShcclxuICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7IKt7KCc7JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDsmLXshZjrp4wg7IKt7KCc7ZWc64ukLlxyXG4gICAgICB0aGlzLnN1YnRyYWN0Q2FydChbY2FydEl0ZW1dKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHMuZmluZEluZGV4KChjYXJ0OiBhbnkpID0+IGNhcnQucHJvZHVjdElkID09PSBwcm9kdWN0KTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdENhcnQgPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzW2luZGV4XSBhcyBhbnk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9JbmRleCA9IHByb2R1Y3RDYXJ0Lm9wdGlvbnMuZmluZEluZGV4KChvcHRpb246IGFueSkgPT4gb3B0aW9uLmNhcnRJdGVtSWQgPT09IGNhcnRJdGVtSWQpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHRvdGFsUHJpY2UsIHF1YW50aXR5OiBwY3MgfSA9IHByb2R1Y3RDYXJ0Lm9wdGlvbnNbb0luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIHByb2R1Y3RDYXJ0Lm9wdGlvbnMuc3BsaWNlKG9JbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tjYXJ0SXRlbUlkXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzW2NhcnRJdGVtSWRdKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8udG90YWxQcmljZSAtPSB0b3RhbFByaWNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLnBjcyAtPSBwY3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7Ji17IWYIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZUV4Y2VsQ2FydCgpIHtcclxuICAgIGNvbnN0IG1lbW8gID0gey4uLnRoaXMuX21lbW9FeGNlbHNJbmZvfTtcclxuICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHMpO1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpZCA9IGlkc1tpXTtcclxuICAgICAgaWYodGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvLmlkc1tpZF0pIHtcclxuICAgICAgICBkZWxldGUgbWVtb1tpZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b0RlbGV0ZUl0ZW1zID0gT2JqZWN0LnZhbHVlcyhtZW1vKTtcclxuXHJcbiAgICB0aGlzLnB1dEV4Y2VsQ2FydCh0b0RlbGV0ZUl0ZW1zKS5zdWJzY3JpYmUoXHJcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUNhcnRJZCA9IGN1c3RvbUNhcnRJbmZvLl9pZDtcclxuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2VscyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8udG90YWxDbnQgPSB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCArIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQ7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMuX21lbW9FeGNlbHNJbmZvID0gY3VzdG9tQ2FydEluZm8uaXRlbXMucmVkdWNlKChyZXN1bHQ6IGFueSwgaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaXRlbS5faWRdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9zdGVwID0gdGhpcy5jYXJ0SW5mby50b3RhbENudCA+IDAgPyAnY2FydCcgOiAnZW1wdHknO1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlOiAwLFxyXG4gICAgICAgICAgICAgICAgbm9QcmljZU51bTogMCxcclxuICAgICAgICAgICAgICAgIG51bTogMCxcclxuICAgICAgICAgICAgICAgIHBjczogMCxcclxuICAgICAgICAgICAgICAgIGlkczoge31cclxuICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsl5HshYAg7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIG9yZGVyVG9TdG9yZShwaG9uZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpZHNJbkNhcnRJdGVtcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHMpO1xyXG4gICAgY29uc3QgaWRzSW5DdXN0b21DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8uaWRzKS5maWx0ZXIoKGlkKSA9PiAhIXRoaXMuX21lbW9FeGNlbHNJbmZvW2lkXS5xdWFudGl0eSk7XHJcbiAgICBjb25zdCBjYXJ0SXRlbXMgPSBpZHNJbkNhcnRJdGVtcy5tYXAoKGlkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHtvcHRpb25zLCBwcm9kdWN0LCBwcm9kdWN0TmFtZSwgcXVhbnRpdHl9ID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF07XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd2hvbGVzYWxlTmFtZTogcHJvZHVjdC53aG9sZXNhbGUubmFtZSxcclxuICAgICAgICB3aG9sZXNhbGU6IHtcclxuICAgICAgICAgIHR5cGU6ICcnLFxyXG4gICAgICAgICAgaWQ6IHByb2R1Y3Qud2hvbGVzYWxlU3RvcmVJZCxcclxuICAgICAgICAgIG5hbWU6IHByb2R1Y3Qud2hvbGVzYWxlLm5hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1aWxkaW5nOiBwcm9kdWN0Lndob2xlc2FsZS5idWlsZGluZyxcclxuICAgICAgICBmbG9vcjogcHJvZHVjdC53aG9sZXNhbGUuZmxvb3IsXHJcbiAgICAgICAgcm9vbTogcHJvZHVjdC53aG9sZXNhbGUuc2VjdGlvbixcclxuICAgICAgICBhZGRyZXNzOiBgJHtwcm9kdWN0Lndob2xlc2FsZS5idWlsZGluZ30sICR7cHJvZHVjdC53aG9sZXNhbGUuZmxvb3J9LCAke3Byb2R1Y3Qud2hvbGVzYWxlLnNlY3Rpb259YCxcclxuICAgICAgICBwaG9uZTogcHJvZHVjdC53aG9sZXNhbGUucGhvbmUsXHJcbiAgICAgICAgcHJvZHVjdE5hbWU6IHByb2R1Y3ROYW1lLFxyXG4gICAgICAgIGNvbG9yOiBvcHRpb25zLmNvbG9yLFxyXG4gICAgICAgIHNpemU6IG9wdGlvbnMuc2l6ZSxcclxuICAgICAgICBvcHRpb25zOiBgJHtvcHRpb25zLmNvbG9yfSAvICR7b3B0aW9ucy5zaXplfSAvICR7cXVhbnRpdHl96rCcYCxcclxuICAgICAgICBwcmljZTogYCR7cHJvZHVjdC5wcmljZX1gLFxyXG4gICAgICAgIHF1YW50aXR5OiBgJHtxdWFudGl0eX1gXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBmb3JrSm9pbih0aGlzLmNyZWF0ZUN1c3RvbU9yZGVyVXNpbmdDYXJ0SXRlbXMoY2FydEl0ZW1zLCBwaG9uZSksIHRoaXMuY3JlYXRlQ3VzdG9tQ2FydE9yZGVyKGlkc0luQ3VzdG9tQ2FydEl0ZW1zLCBwaG9uZSkpLnN1YnNjcmliZShcclxuICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiDrp6TsnqUg7KO866y4IO2bhCwg7IOd7ISx65CcIOyjvOusuCDrjbDsnbTthLDrpbwg7KCA7J6l7ZWY6riwIOychO2VtFxyXG4gICAgICAgICogKi9cclxuICAgICAgICB0aGlzLmNvbXBsZXRlZE9yZGVySW5DYXJ0ID0ge1xyXG4gICAgICAgICAgY2FydE9yZGVyczogdGhpcy5jb21wbGV0ZWRDYXJ0SXRlbXNPcmRlciB8fCBudWxsLFxyXG4gICAgICAgICAgY3VzdG9tT3JkZXJzOiByZXNwb25zZVsxXSB8fCBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RlcCA9ICdjb21wbGV0ZS1zdG9yZS1vcmRlcic7XHJcbiAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOunpOyepSDso7zrrLjsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUN1c3RvbUNhcnRPcmRlcihpdGVtczogYW55W10sIHBob25lOiBzdHJpbmcpIHtcclxuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgIF9pZDogdGhpcy5fY3VzdG9tQ2FydElkLFxyXG4gICAgICBjdXN0b21lcjogdGhpcy5fY3VzdG9tZXJJZCxcclxuICAgICAgdHlwZTogJ2dlbmVyYWwnLFxyXG4gICAgICB1bmNsZVBob25lOiBwaG9uZSxcclxuICAgICAgaXRlbXNcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fY2FydC9jaGVja291dCcsIHtcclxuICAgICAgYm9keSxcclxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlQ3VzdG9tT3JkZXJVc2luZ0NhcnRJdGVtcyhpdGVtczogYW55W10sIHBob25lOiBzdHJpbmcpIHtcclxuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xyXG5cclxuICAgIGNvbnN0IGlkc0luQ2FydEl0ZW1zID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICBfaWQ6IHRoaXMuX2N1c3RvbUNhcnRJZCxcclxuICAgICAgY3VzdG9tZXI6IHRoaXMuX2N1c3RvbWVySWQsXHJcbiAgICAgIHR5cGU6ICdnZW5lcmFsJyxcclxuICAgICAgdW5jbGVQaG9uZTogcGhvbmUsXHJcbiAgICAgIGl0ZW1zXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX29yZGVyLycsIHtcclxuICAgICAgYm9keToge1xyXG4gICAgICAgIC4uLmJvZHksXHJcbiAgICAgICAgaXRlbXNcclxuICAgICAgfVxyXG4gICAgfSkucGlwZShcclxuICAgICAgbWVyZ2VNYXAoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSBpZHNJbkNhcnRJdGVtcy5tYXAoKGlkKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi50aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXSxcclxuICAgICAgICAgICAgcHJvZHVjdDogdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF0ucHJvZHVjdC5pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBsZXRlZENhcnRJdGVtc09yZGVyID0gcmVzcG9uc2U7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvc3VidHJhY3QnLCB7XHJcbiAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgIF9pZDogdGhpcy5fY2FydElkLFxyXG4gICAgICAgICAgICBpdGVtc1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhhbmRsZUVycm9yOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIGFkZEFkZHJlc3MoYm9keTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MnLCB7XHJcbiAgICAgIGJvZHk6IGJvZHlcclxuICAgIH0pLnBpcGUoXHJcbiAgICAgIG1lcmdlTWFwKCh7YWRkcmVzc2VzOiB7c2Vjb25kYXJpZXN9fTogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge19pZH0gPSBzZWNvbmRhcmllcy5zbGljZSgtMSlbMF07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzL3ByaW1hcnknLCB7XHJcbiAgICAgICAgICBib2R5OiB7XHJcbiAgICAgICAgICAgIF9pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUFkZHJlc3MoaWQ6IHN0cmluZywgYm9keTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QVVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcycsIHtcclxuICAgICAgYm9keToge1xyXG4gICAgICAgIGFkZHJlc3NJZDogaWQsXHJcbiAgICAgICAgLi4uYm9keVxyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBZGRyZXNzKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLkRFTEVURSggYGh0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy8ke2lkfWAsXHJcbiAgICAgIHsgaGFuZGxlRXJyb3I6IHRydWV9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBtZXJnZU1hcCgodXNlckluZm8pID0+IHtcclxuICAgICAgICBjb25zdCB7IHNlY29uZGFyaWVzIH0gPSB1c2VySW5mby5hZGRyZXNzZXM7XHJcbiAgICAgICAgaWYgKHNlY29uZGFyaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGxhc3RJZCA9IHNlY29uZGFyaWVzLnNsaWNlKC0xKVswXS5faWQ7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRQcmltYXJ5QWRkcmVzcyhsYXN0SWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2YodXNlckluZm8pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNhcnRDaGVja291dChib2R5OiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvY2hlY2tvdXQnLCB7XHJcbiAgICAgIGJvZHk6IHtcclxuICAgICAgICBjYXJ0SWQ6IHRoaXMuX2NhcnRJZCxcclxuICAgICAgICAuLi5ib2R5XHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIHNldFByaW1hcnlBZGRyZXNzKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy9wcmltYXJ5Jywge1xyXG4gICAgICBib2R5OiB7XHJcbiAgICAgICAgX2lkOiBpZFxyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFuUHJvZHVjdENhcnQoKSB7XHJcbiAgICBjb25zdCBkZWxldGVkSWRzID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XHJcblxyXG4gICAgZm9yKGxldCBpPTA7IGkgPCBkZWxldGVkSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZWRDYXJ0SWQgPSBkZWxldGVkSWRzW2ldO1xyXG4gICAgICBjb25zdCBkZWxldGVkUHJvZHVjdElkOiBhbnkgPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2RlbGV0ZWRDYXJ0SWRdLnByb2R1Y3QuaWQ7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5maW5kSW5kZXgoKGl0ZW06IGFueSkgPT4gaXRlbS5wcm9kdWN0SWQgPT09IGRlbGV0ZWRQcm9kdWN0SWQpO1xyXG5cclxuICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICBkZWxldGUgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tkZWxldGVkQ2FydElkXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbyA9ICB7XHJcbiAgICAgIHRvdGFsUHJpY2U6IDAsXHJcbiAgICAgIG51bTogMCxcclxuICAgICAgcGNzOiAwLFxyXG4gICAgICBjYXJ0SWRzOiB7fSxcclxuICAgICAgcHJvZHVjdElkczoge31cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5sZW5ndGg7XHJcbiAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xyXG4gICAgdGhpcy5fc3RlcCA9IHRoaXMuY2FydEluZm8udG90YWxDbnQgPiAwID8gJ2NhcnQnIDogJ2VtcHR5JztcclxuICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcclxuICB9XHJcbn1cclxuIl19