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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTbEMsTUFBTSxPQUFPLFdBQVc7SUE4Q3RCLFlBQ1UsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0N4QyxhQUFRLEdBQWE7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFRDs7Ozs7Ozs7O1lBU0k7UUFDSSxVQUFLLEdBQXNHLFNBQVMsQ0FBQztRQUtySCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQXlCO1lBQ3BELFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ00sd0JBQW1CLEdBQXVCO1lBQ2hELFVBQVUsRUFBRSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FB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Q0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBSTtZQUM1QixVQUFVLEVBQUUsQ0FBQztZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQTtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUM3RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O3dHQS9sQlUsV0FBVzs0R0FBWCxXQUFXLGNBRlYsTUFBTTsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2UsIExvYWRpbmdTZXJ2aWNlLCBSZXN0U2VydmljZX0gZnJvbSAnQGdvbGxhbGEvbmctY29tbW9uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIENhcnRJbmZvLCBDYXJ0SXRlbSwgU2VsZWN0ZWRFeGNlbHNJbmZvLCBTZWxlY3RlZFByb2R1Y3RzSW5mb1xufSBmcm9tIFwiLi4vaW50ZXJmYWNlL2NhcnQubW9kZWxcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFNlcnZpY2Uge1xuXG4gIGNhcnRJbmZvOiBDYXJ0SW5mbyA9IHtcbiAgICBwcm9kdWN0czogW10sXG4gICAgZXhjZWxzOiBbXSxcbiAgICBwcm9kdWN0c0NudDogMCxcbiAgICBleGNlbHNDbnQ6IDAsXG4gICAgdG90YWxDbnQ6IDBcbiAgfVxuXG4gIC8qXG4gICog7Lm07Yq4IOqysOygnCDri6jqs4RcbiAgKiBwZW5kaW5nOiDrjbDsnbTthLAg67aI65+s7Jik64qUIOykkVxuICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXG4gICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcbiAgKiBlcnJvcjog642w7J207YSw66W8IOqwgOyguOyYpOuKlOuNsCDsl5Drn6zqsIAg64Ks7J2EIOqyveyasFxuICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcbiAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICogY29tcGxldGUtb25lLXN0b3A6IOybkOyKpO2GsSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAqICovXG4gIHByaXZhdGUgX3N0ZXA6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcgPSAncGVuZGluZyc7XG5cbiAgcHJpdmF0ZSBfY3VzdG9tQ2FydElkITogc3RyaW5nO1xuICBwcml2YXRlIF9jYXJ0SWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX2N1c3RvbWVySWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX21lbW9FeGNlbHNJbmZvOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfbWVtb1Byb2R1Y3RzSW5mbzogYW55ID0ge307XG4gIHByaXZhdGUgX3NlbGVjdGVkUHJvZHVjdHNJbmZvOiBTZWxlY3RlZFByb2R1Y3RzSW5mbyA9IHtcbiAgICB0b3RhbFByaWNlOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgY2FydElkczoge30sXG4gICAgcHJvZHVjdElkczoge31cbiAgfTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFeGNlbHNJbmZvOiBTZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XG4gICAgdG90YWxQcmljZTogMCxcbiAgICBub1ByaWNlTnVtOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgaWRzOiB7fVxuICB9O1xuXG4gIGNhcnRJbmZvJCA9ICBuZXcgQmVoYXZpb3JTdWJqZWN0PENhcnRJbmZvPih0aGlzLmNhcnRJbmZvKTtcbiAgY29tcGxldGVkQ2FydEl0ZW1zT3JkZXI6IGFueSA9IG51bGw7XG4gIGNvbXBsZXRlZE9yZGVySW5DYXJ0OiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzdFNlcnZpY2U6IFJlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgZ2V0IG1lbW9FeGNlbHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDtgqRbY3VzdG9tIGNhcnQgaXRlbSBpZF06IOyXkeyFgCDslYTsnbTthZwg7KCV67O066W8IOuLtOqzoCDsnojsnYxcbiAgICAqICovXG4gICAgcmV0dXJuIHRoaXMuX21lbW9FeGNlbHNJbmZvO1xuICB9XG5cbiAgZ2V0IG1lbW9Qcm9kdWN0c0luZm8oKSB7XG4gICAgLypcbiAgICAqIO2CpFtjYXJ0IGl0ZW0gaWRdOiDsg4Htkogg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkUHJvZHVjdHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7Lm07Yq465Ok7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbztcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEV4Y2Vsc0luZm8gKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7JeR7IWA7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm87XG4gIH1cblxuXG4gIGFkZENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiB7XG4gICAgLypcbiAgICAqIOy5tO2KuOyXkCDsg4Htkogg7LaU6rCAICjtlITroZzrjZXtirgg7IOB7ZKI66eMLCDsl5HshYAg7IOB7ZKI7J2AIOy2lOqwgCDrqrvtlagpXG4gICAgKiAqL1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY2FydC9hZGQnLCB7XG4gICAgICBib2R5LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHN1YnRyYWN0Q2FydChpdGVtczogQ2FydEl0ZW1bXSk6IE9ic2VydmFibGU8e19pZDogc3RyaW5nOyBpdGVtczogQ2FydEl0ZW1bXX0+ICB7XG4gICAgLypcbiAgICAqIOy5tO2KuOyXkCDsg4Htkogg67q06riwICjtlITroZzrjZXtirgg7IOB7ZKI66eMLCDsl5HshYAg7IOB7ZKI7J2AIOy2lOqwgCDrqrvtlagpXG4gICAgKiAqL1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY2FydC9zdWJ0cmFjdCcsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgc2V0U3RlcCh2YWx1ZTogJ3BlbmRpbmcnIHwgJ2NhcnQnIHwgJ2VtcHR5JyB8ICdlcnJvcicgfCAncGF5bWVudCcgfCAnY29tcGxldGUtc3RvcmUtb3JkZXInIHwgJ2NvbXBsZXRlLW9uZS1zdG9wJyk6IHZvaWQge1xuICAgIC8qXG4gICAgICAqIOy5tO2KuCDqsrDsoJwg64uo6rOEXG4gICAgICAqIHBlbmRpbmc6IOuNsOydtO2EsCDrtojrn6zsmKTripQg7KSRXG4gICAgICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXG4gICAgICAqIGVtcHR5OiDrjbDsnbTthLDqsIAg7ZWcIOqwnOuPhCDsl4bsnYQg65aEXG4gICAgICAqIGVycm9yOiDrjbDsnbTthLDrpbwg6rCA7KC47Jik64qU642wIOyXkOufrOqwgCDrgqzsnYQg6rK97JqwXG4gICAgICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcbiAgICAgICogY29tcGxldGUtc3RvcmUtb3JkZXI6IOunpOyepSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAgICAgKiBjb21wbGV0ZS1vbmUtc3RvcDog7JuQ7Iqk7YaxIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICAgKiAqL1xuXG4gICAgdGhpcy5fc3RlcCA9IHZhbHVlO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RlZFByb2R1Y3RzSW5mbyAoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8gPSB7XG4gICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgbnVtOiAwLFxuICAgICAgcGNzOiAwLFxuICAgICAgY2FydElkczoge30sXG4gICAgICBwcm9kdWN0SWRzOiB7fVxuICAgIH07XG4gIH1cblxuICByZXNldFNlbGVjdGVkRXhjZWxJbmZvICgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XG4gICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgbm9QcmljZU51bTogMCxcbiAgICAgIG51bTogMCxcbiAgICAgIHBjczogMCxcbiAgICAgIGlkczoge31cbiAgICB9XG4gIH1cblxuICBnZXRBdXRoQ2FydCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvY2FydCcsIHtoYW5kbGVFcnJvcjogdHJ1ZX0pO1xuICB9XG5cbiAgZ2V0QXV0aEV4Y2VsQ2FydCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0L2F1dGgvbWUnLCB7aGFuZGxlRXJyb3I6IHRydWV9KVxuICB9XG5cbiAgcmVxdWVzdFByb2R1Y3RMaXN0KGlkczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBib2R5ID0ge2lkc307XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnL2FwaS9wcm9kdWN0L2JvL3Byb2R1Y3RMaXN0QnlJZHMnLCB7Ym9keSwgaGFuZGxlRXJyb3I6IHRydWV9KTtcbiAgfVxuXG4gIHB1dEV4Y2VsQ2FydChpdGVtczogYW55W10pIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBpdGVtc1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QVVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0LycsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pXG4gIH1cblxuXG4gIGdldENhcnRJbmZvKCkge1xuICAgIGxldCBjYXJ0SXRlbXM6YW55W10gPSBbXTtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnN0YXJ0KCk7XG4gICAgdGhpcy5fc3RlcCA9ICdwZW5kaW5nJztcbiAgICB0aGlzLmNvbXBsZXRlZE9yZGVySW5DYXJ0ID0gbnVsbDtcblxuICAgIHRoaXMuZ2V0QXV0aENhcnQoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZSk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKGNhcnREb2MgPT4ge1xuICAgICAgICBjYXJ0SXRlbXMgPSBjYXJ0RG9jLml0ZW1zO1xuICAgICAgICB0aGlzLl9jdXN0b21lcklkID0gY2FydERvYy5jdXN0b21lcjtcbiAgICAgICAgdGhpcy5fY2FydElkID0gY2FydERvYy5faWQ7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZHMgPSBjYXJ0RG9jLml0ZW1zLm1hcCgoY2FydEl0ZW06IHsgcHJvZHVjdDogYW55OyB9KSA9PiBjYXJ0SXRlbS5wcm9kdWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0UHJvZHVjdExpc3QocHJvZHVjdElkcyk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKHByb2R1Y3RzID0+IHtcbiAgICAgICAgLy8g67Cb7JWE7JioIHByb2R1Y3RzIOuwsOyXtOydhCDqsJ3ssrTtmZRcbiAgICAgICAgY29uc3QgbWVtb1Byb2R1Y3RzID0gcHJvZHVjdHMucmVkdWNlKChyZXN1bHQ6IGFueSwgcHJvZHVjdDogYW55KSA9PiB7XG4gICAgICAgICAgcmVzdWx0W3Byb2R1Y3QuaWRdID0gcHJvZHVjdDtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgLypcbiAgICAgICAgKiDtlZjrgpjsnZgg7IOB7ZKIKFByb2R1Y3QgSWQp7JeQIOyYteyFmCDtlZjrgpjtlZjrgpgoQ2FydCBJdGVtIElkKeulvCDrhKPquLAg7JyE7ZW0XG4gICAgICAgICogKi9cbiAgICAgICAgbGV0IHByb2R1Y3RDYXJ0OiBhbnkgPSBjYXJ0SXRlbXMucmVkdWNlKChyZXN1bHQsIGNhcnRJdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gY2FydEl0ZW0ucHJvZHVjdDtcbiAgICAgICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IG1lbW9Qcm9kdWN0c1twcm9kdWN0SWRdO1xuICAgICAgICAgIGNvbnN0IHRvdGFsUHJvZHVjdFByaWNlID0gY2FydEl0ZW0ucXVhbnRpdHkgKiBwcm9kdWN0SW5mby5wcmljZTtcblxuICAgICAgICAgIC8qIOy5tO2KuCDslYTsnbTthZzsl5Ag64yA7ZWcIOuplOuqqOygnOydtOyFmCDsoIDsnqUgKi9cbiAgICAgICAgICB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2NhcnRJdGVtLl9pZF0gPSB7XG4gICAgICAgICAgICAuLi5jYXJ0SXRlbSxcbiAgICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3RJbmZvXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYocmVzdWx0Lmhhc093blByb3BlcnR5KHByb2R1Y3RJZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLnRvdGFsUHJpY2UgKz0gdG90YWxQcm9kdWN0UHJpY2U7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0pe1xuICAgICAgICAgICAgICAvLyDqsJnsnYAg7Ji17IWY7J20IOyeiOuKlOqyveyasCxcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdLnF1YW50aXR5ICs9IGNhcnRJdGVtLnF1YW50aXR5O1xuICAgICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0ucXVhbnRpdHkgKz0gdG90YWxQcm9kdWN0UHJpY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgY2FydEl0ZW1JZDogY2FydEl0ZW0uX2lkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYXJ0SXRlbS5vcHRpb25zLmNvbG9yLFxuICAgICAgICAgICAgICAgIHNpemU6IGNhcnRJdGVtLm9wdGlvbnMuc2l6ZSxcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdID0gb3B0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7d2hvbGVzYWxlOiB7bmFtZSwgYnVpbGRpbmcsIGZsb29yLCBzZWN0aW9ufX0gPSBwcm9kdWN0SW5mbztcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgY2FydEl0ZW1JZDogY2FydEl0ZW0uX2lkLFxuICAgICAgICAgICAgICBjb2xvcjogY2FydEl0ZW0ub3B0aW9ucy5jb2xvcixcbiAgICAgICAgICAgICAgc2l6ZTogY2FydEl0ZW0ub3B0aW9ucy5zaXplLFxuICAgICAgICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcbiAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdID0ge1xuICAgICAgICAgICAgICBuYW1lOiBjYXJ0SXRlbS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB3aG9sZXNhbGVOYW1lOiBgJHtuYW1lfSgke2J1aWxkaW5nfSAke2Zsb29yfey4tSAke3NlY3Rpb259KWAsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBbY2FydEl0ZW0uX2lkXTogb3B0aW9uXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGltYWdlUGF0aDogcHJvZHVjdEluZm8uaW1nUGF0aHNbMF0sXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcbiAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcHJvZHVjdENhcnQgPSBPYmplY3QudmFsdWVzKHByb2R1Y3RDYXJ0KS5tYXAoKGNhcnRJdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICBjYXJ0SXRlbS5vcHRpb25zID0gT2JqZWN0LnZhbHVlcyhjYXJ0SXRlbS5vcHRpb25zKTtcbiAgICAgICAgICByZXR1cm4gY2FydEl0ZW07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHMgPSBwcm9kdWN0Q2FydDtcbiAgICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudCA9IHByb2R1Y3RzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXV0aEV4Y2VsQ2FydCgpO1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZShcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xuICAgICAgICB0aGlzLl9jdXN0b21DYXJ0SWQgPSBjdXN0b21DYXJ0SW5mby5faWQ7XG4gICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzID0gY3VzdG9tQ2FydEluZm8uaXRlbXM7XG4gICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuICAgICAgICB0aGlzLl9zdGVwID0gdGhpcy5jYXJ0SW5mby50b3RhbENudCA+IDAgPyAnY2FydCcgOiAnZW1wdHknO1xuXG4gICAgICAgIC8qIOyXkeyFgCDso7zrrLgoQ3VzdG9tQ2FydCkg66mU66qo7KCc7J207IWYIOyDneyEsSAqL1xuICAgICAgICB0aGlzLl9tZW1vRXhjZWxzSW5mbyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zLnJlZHVjZSgocmVzdWx0OiBhbnksIGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIHJlc3VsdFtpdGVtLl9pZF0gPSBpdGVtO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnN0b3AoKTtcbiAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh0aGlzLmNhcnRJbmZvKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsoJXrs7Trpbwg6rCA7KC47Jik64qU642wIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0ZXAgPSAnZXJyb3InO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZGVsZXRlUHJvZHVjdEluQ2FydCgpIHtcbiAgICBjb25zdCBpdGVtczogYW55W10gPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKS5tYXAoKGlkKSA9PiB7XG4gICAgICBjb25zdCBjYXJ0SXRlbSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdDogY2FydEl0ZW0ucHJvZHVjdC5pZCxcbiAgICAgICAgb3B0aW9uczogY2FydEl0ZW0ub3B0aW9ucyxcbiAgICAgICAgcXVhbnRpdHk6IGNhcnRJdGVtLnF1YW50aXR5XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIHRoaXMuc3VidHJhY3RDYXJ0KGl0ZW1zKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gMS4gbWVtb0NhcnRJdGVtc+ydmCDsg4Htkogg7JWE7J2065SUIO2CpCDqsJIg7IKt7KCcXG4gICAgICAgICAgLy8gMi4gc2VsZWN0ZWRDYXJ0cyDstIjquLDtmZRcbiAgICAgICAgICAvLyAzLiBwcm9kdWN0Q2FydHMg7IKt7KCcXG4gICAgICAgICAgLy8gNC4gcHJvZHVjdENudCwgdG90YWxDbnQg7JeF642w7J207Yq4XG4gICAgICAgICAgLy8gNSBjYXJ0SW5mbyBuZXh0XG4gICAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG4gICAgICAgIH0sXG4gIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIGRlbGV0ZVByb2R1Y3RPcHRpb24oaGFzT25lT3B0aW9uOiBib29sZWFuLCBjYXJ0SXRlbUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9kdWN0TmFtZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBwcm9kdWN0OiB7IGlkOiBwcm9kdWN0fSxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgX2lkXG4gICAgfSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bY2FydEl0ZW1JZF07XG5cbiAgICBjb25zdCBjYXJ0SXRlbSA9IHtcbiAgICAgIF9pZCxcbiAgICAgIHByb2R1Y3ROYW1lLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgcHJvZHVjdFxuICAgIH07XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICBpdGVtczogW2NhcnRJdGVtXVxuICAgIH1cblxuICAgIGlmIChoYXNPbmVPcHRpb24pIHtcbiAgICAgIC8vIOyDge2SiOydhCDsgq3soJztlZzri6QuXG4gICAgICB0aGlzLnN1YnRyYWN0Q2FydChbY2FydEl0ZW1dKS5zdWJzY3JpYmUoXG4gICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG4gICAgICAgICAgfSxcbiAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyYteyFmOunjCDsgq3soJztlZzri6QuXG4gICAgICB0aGlzLnN1YnRyYWN0Q2FydChbY2FydEl0ZW1dKS5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5maW5kSW5kZXgoKGNhcnQ6IGFueSkgPT4gY2FydC5wcm9kdWN0SWQgPT09IHByb2R1Y3QpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdENhcnQgPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzW2luZGV4XSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBvSW5kZXggPSBwcm9kdWN0Q2FydC5vcHRpb25zLmZpbmRJbmRleCgob3B0aW9uOiBhbnkpID0+IG9wdGlvbi5jYXJ0SXRlbUlkID09PSBjYXJ0SXRlbUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHsgdG90YWxQcmljZSwgcXVhbnRpdHk6IHBjcyB9ID0gcHJvZHVjdENhcnQub3B0aW9uc1tvSW5kZXhdO1xuXG4gICAgICAgICAgICBwcm9kdWN0Q2FydC5vcHRpb25zLnNwbGljZShvSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tjYXJ0SXRlbUlkXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHNbY2FydEl0ZW1JZF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8udG90YWxQcmljZSAtPSB0b3RhbFByaWNlO1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5wY3MgLT0gcGNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyYteyFmCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBkZWxldGVFeGNlbENhcnQoKSB7XG4gICAgY29uc3QgbWVtbyAgPSB7Li4udGhpcy5fbWVtb0V4Y2Vsc0luZm99O1xuICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHMpO1xuXG4gICAgZm9yKGxldCBpPTA7IGk8aWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpZCA9IGlkc1tpXTtcbiAgICAgIGlmKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHNbaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBtZW1vW2lkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0b0RlbGV0ZUl0ZW1zID0gT2JqZWN0LnZhbHVlcyhtZW1vKTtcblxuICAgIHRoaXMucHV0RXhjZWxDYXJ0KHRvRGVsZXRlSXRlbXMpLnN1YnNjcmliZShcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXN0b21DYXJ0SWQgPSBjdXN0b21DYXJ0SW5mby5faWQ7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzID0gY3VzdG9tQ2FydEluZm8uaXRlbXM7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuXG4gICAgICAgICAgICAgIHRoaXMuX21lbW9FeGNlbHNJbmZvID0gY3VzdG9tQ2FydEluZm8uaXRlbXMucmVkdWNlKChyZXN1bHQ6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2l0ZW0uX2lkXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID4gMCA/ICdjYXJ0JyA6ICdlbXB0eSc7XG5cbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvID0ge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICAgICAgICAgICAgbm9QcmljZU51bTogMCxcbiAgICAgICAgICAgICAgICBudW06IDAsXG4gICAgICAgICAgICAgICAgcGNzOiAwLFxuICAgICAgICAgICAgICAgIGlkczoge31cbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7JeR7IWAIOyDge2SiCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgb3JkZXJUb1N0b3JlKHBob25lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpZHNJbkNhcnRJdGVtcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHMpO1xuICAgIGNvbnN0IGlkc0luQ3VzdG9tQ2FydEl0ZW1zID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvLmlkcykuZmlsdGVyKChpZCkgPT4gISF0aGlzLl9tZW1vRXhjZWxzSW5mb1tpZF0ucXVhbnRpdHkpO1xuICAgIGNvbnN0IGNhcnRJdGVtcyA9IGlkc0luQ2FydEl0ZW1zLm1hcCgoaWQpID0+IHtcbiAgICAgIGNvbnN0IHtvcHRpb25zLCBwcm9kdWN0LCBwcm9kdWN0TmFtZSwgcXVhbnRpdHl9ID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3aG9sZXNhbGVOYW1lOiBwcm9kdWN0Lndob2xlc2FsZS5uYW1lLFxuICAgICAgICB3aG9sZXNhbGU6IHtcbiAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICBpZDogcHJvZHVjdC53aG9sZXNhbGVTdG9yZUlkLFxuICAgICAgICAgIG5hbWU6IHByb2R1Y3Qud2hvbGVzYWxlLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRpbmc6IHByb2R1Y3Qud2hvbGVzYWxlLmJ1aWxkaW5nLFxuICAgICAgICBmbG9vcjogcHJvZHVjdC53aG9sZXNhbGUuZmxvb3IsXG4gICAgICAgIHJvb206IHByb2R1Y3Qud2hvbGVzYWxlLnNlY3Rpb24sXG4gICAgICAgIGFkZHJlc3M6IGAke3Byb2R1Y3Qud2hvbGVzYWxlLmJ1aWxkaW5nfSwgJHtwcm9kdWN0Lndob2xlc2FsZS5mbG9vcn0sICR7cHJvZHVjdC53aG9sZXNhbGUuc2VjdGlvbn1gLFxuICAgICAgICBwaG9uZTogcHJvZHVjdC53aG9sZXNhbGUucGhvbmUsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kdWN0TmFtZSxcbiAgICAgICAgY29sb3I6IG9wdGlvbnMuY29sb3IsXG4gICAgICAgIHNpemU6IG9wdGlvbnMuc2l6ZSxcbiAgICAgICAgb3B0aW9uczogYCR7b3B0aW9ucy5jb2xvcn0gLyAke29wdGlvbnMuc2l6ZX0gLyAke3F1YW50aXR5feqwnGAsXG4gICAgICAgIHByaWNlOiBgJHtwcm9kdWN0LnByaWNlfWAsXG4gICAgICAgIHF1YW50aXR5OiBgJHtxdWFudGl0eX1gXG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGZvcmtKb2luKHRoaXMuY3JlYXRlQ3VzdG9tT3JkZXJVc2luZ0NhcnRJdGVtcyhjYXJ0SXRlbXMsIHBob25lKSwgdGhpcy5jcmVhdGVDdXN0b21DYXJ0T3JkZXIoaWRzSW5DdXN0b21DYXJ0SXRlbXMsIHBob25lKSkuc3Vic2NyaWJlKFxuICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYW5Qcm9kdWN0Q2FydCgpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICog66ek7J6lIOyjvOusuCDtm4QsIOyDneyEseuQnCDso7zrrLgg642w7J207YSw66W8IOyggOyepe2VmOq4sCDsnITtlbRcbiAgICAgICAgKiAqL1xuICAgICAgICB0aGlzLmNvbXBsZXRlZE9yZGVySW5DYXJ0ID0ge1xuICAgICAgICAgIGNhcnRPcmRlcnM6IHRoaXMuY29tcGxldGVkQ2FydEl0ZW1zT3JkZXIgfHwgbnVsbCxcbiAgICAgICAgICBjdXN0b21PcmRlcnM6IHJlc3BvbnNlWzFdIHx8IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zdGVwID0gJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJztcbiAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xuICAgICAgfSxcbiAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDrp6TsnqUg7KO866y47JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUN1c3RvbUNhcnRPcmRlcihpdGVtczogYW55W10sIHBob25lOiBzdHJpbmcpIHtcbiAgICBpZihpdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBvZihudWxsKTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2N1c3RvbUNhcnRJZCxcbiAgICAgIGN1c3RvbWVyOiB0aGlzLl9jdXN0b21lcklkLFxuICAgICAgdHlwZTogJ2dlbmVyYWwnLFxuICAgICAgdW5jbGVQaG9uZTogcGhvbmUsXG4gICAgICBpdGVtc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0L2NoZWNrb3V0Jywge1xuICAgICAgYm9keSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgY3JlYXRlQ3VzdG9tT3JkZXJVc2luZ0NhcnRJdGVtcyhpdGVtczogYW55W10sIHBob25lOiBzdHJpbmcpIHtcbiAgICBpZihpdGVtcy5sZW5ndGggPT09IDApIHJldHVybiBvZihudWxsKTtcblxuICAgIGNvbnN0IGlkc0luQ2FydEl0ZW1zID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY3VzdG9tQ2FydElkLFxuICAgICAgY3VzdG9tZXI6IHRoaXMuX2N1c3RvbWVySWQsXG4gICAgICB0eXBlOiAnZ2VuZXJhbCcsXG4gICAgICB1bmNsZVBob25lOiBwaG9uZSxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX29yZGVyLycsIHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgLi4uYm9keSxcbiAgICAgICAgaXRlbXNcbiAgICAgIH1cbiAgICB9KS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gaWRzSW5DYXJ0SXRlbXMubWFwKChpZCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXSxcbiAgICAgICAgICAgIHByb2R1Y3Q6IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdLnByb2R1Y3QuaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29tcGxldGVkQ2FydEl0ZW1zT3JkZXIgPSByZXNwb25zZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jYXJ0L3N1YnRyYWN0Jywge1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIF9pZDogdGhpcy5fY2FydElkLFxuICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGFkZEFkZHJlc3MoYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzJywge1xuICAgICAgYm9keTogYm9keVxuICAgIH0pLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoe2FkZHJlc3Nlczoge3NlY29uZGFyaWVzfX06IGFueSkgPT4ge1xuICAgICAgICBjb25zdCB7X2lkfSA9IHNlY29uZGFyaWVzLnNsaWNlKC0xKVswXTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzL3ByaW1hcnknLCB7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgX2lkXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZUFkZHJlc3MoaWQ6IHN0cmluZywgYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUFVUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MnLCB7XG4gICAgICBib2R5OiB7XG4gICAgICAgIGFkZHJlc3NJZDogaWQsXG4gICAgICAgIC4uLmJvZHlcbiAgICAgIH0sXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlQWRkcmVzcyhpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuREVMRVRFKCBgaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzLyR7aWR9YCxcbiAgICAgIHsgaGFuZGxlRXJyb3I6IHRydWV9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZSk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKCh1c2VySW5mbykgPT4ge1xuICAgICAgICBjb25zdCB7IHNlY29uZGFyaWVzIH0gPSB1c2VySW5mby5hZGRyZXNzZXM7XG4gICAgICAgIGlmIChzZWNvbmRhcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgbGFzdElkID0gc2Vjb25kYXJpZXMuc2xpY2UoLTEpWzBdLl9pZDtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXRQcmltYXJ5QWRkcmVzcyhsYXN0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZih1c2VySW5mbyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuXG4gIHNldFByaW1hcnlBZGRyZXNzKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MvcHJpbWFyeScsIHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgX2lkOiBpZFxuICAgICAgfSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuUHJvZHVjdENhcnQoKSB7XG4gICAgY29uc3QgZGVsZXRlZElkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHMpO1xuXG4gICAgZm9yKGxldCBpPTA7IGkgPCBkZWxldGVkSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBkZWxldGVkQ2FydElkID0gZGVsZXRlZElkc1tpXTtcbiAgICAgIGNvbnN0IGRlbGV0ZWRQcm9kdWN0SWQ6IGFueSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bZGVsZXRlZENhcnRJZF0ucHJvZHVjdC5pZDtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5maW5kSW5kZXgoKGl0ZW06IGFueSkgPT4gaXRlbS5wcm9kdWN0SWQgPT09IGRlbGV0ZWRQcm9kdWN0SWQpO1xuXG4gICAgICB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkZWxldGUgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tkZWxldGVkQ2FydElkXTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbyA9ICB7XG4gICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgbnVtOiAwLFxuICAgICAgcGNzOiAwLFxuICAgICAgY2FydElkczoge30sXG4gICAgICBwcm9kdWN0SWRzOiB7fVxuICAgIH1cblxuICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQgPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzLmxlbmd0aDtcbiAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuICAgIHRoaXMuX3N0ZXAgPSB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID4gMCA/ICdjYXJ0JyA6ICdlbXB0eSc7XG4gICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xuICB9XG59XG4iXX0=