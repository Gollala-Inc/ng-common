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
        return this.restService.POST('https://dev-commerce-api.gollala.org/cart/add', {
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
        return this.restService.POST('https://dev-commerce-api.gollala.org/cart/subtract', {
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
            if (this._memoExcelsInfo.ids[id]) {
                delete memo[id];
            }
        }
        const toDeleteItems = Object.values(memo);
        const body = {
            _id: this._customCartId,
            items: toDeleteItems
        };
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
            this._memoExcelsInfo = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTbEMsTUFBTSxPQUFPLFdBQVc7SUE4Q3RCLFlBQ1UsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0N4QyxhQUFRLEdBQWE7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFRDs7Ozs7Ozs7O1lBU0k7UUFDSSxVQUFLLEdBQXNHLFNBQVMsQ0FBQztRQUtySCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQXlCO1lBQ3BELFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ00sd0JBQW1CLEdBQXVCO1lBQ2hELFVBQVUsRUFBRSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FB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QixDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBSTtZQUM1QixVQUFVLEVBQUUsQ0FBQztZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQTtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUM3RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O3dHQXBtQlUsV0FBVzs0R0FBWCxXQUFXLGNBRlYsTUFBTTsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2UsIExvYWRpbmdTZXJ2aWNlLCBSZXN0U2VydmljZX0gZnJvbSAnQGdvbGxhbGEvbmctY29tbW9uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIENhcnRJbmZvLCBDYXJ0SXRlbSwgU2VsZWN0ZWRFeGNlbHNJbmZvLCBTZWxlY3RlZFByb2R1Y3RzSW5mb1xufSBmcm9tIFwiLi4vaW50ZXJmYWNlL2NhcnQubW9kZWxcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFNlcnZpY2Uge1xuXG4gIGNhcnRJbmZvOiBDYXJ0SW5mbyA9IHtcbiAgICBwcm9kdWN0czogW10sXG4gICAgZXhjZWxzOiBbXSxcbiAgICBwcm9kdWN0c0NudDogMCxcbiAgICBleGNlbHNDbnQ6IDAsXG4gICAgdG90YWxDbnQ6IDBcbiAgfVxuXG4gIC8qXG4gICog7Lm07Yq4IOqysOygnCDri6jqs4RcbiAgKiBwZW5kaW5nOiDrjbDsnbTthLAg67aI65+s7Jik64qUIOykkVxuICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXG4gICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcbiAgKiBlcnJvcjog642w7J207YSw66W8IOqwgOyguOyYpOuKlOuNsCDsl5Drn6zqsIAg64Ks7J2EIOqyveyasFxuICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcbiAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICogY29tcGxldGUtb25lLXN0b3A6IOybkOyKpO2GsSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAqICovXG4gIHByaXZhdGUgX3N0ZXA6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcgPSAncGVuZGluZyc7XG5cbiAgcHJpdmF0ZSBfY3VzdG9tQ2FydElkITogc3RyaW5nO1xuICBwcml2YXRlIF9jYXJ0SWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX2N1c3RvbWVySWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX21lbW9FeGNlbHNJbmZvOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfbWVtb1Byb2R1Y3RzSW5mbzogYW55ID0ge307XG4gIHByaXZhdGUgX3NlbGVjdGVkUHJvZHVjdHNJbmZvOiBTZWxlY3RlZFByb2R1Y3RzSW5mbyA9IHtcbiAgICB0b3RhbFByaWNlOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgY2FydElkczoge30sXG4gICAgcHJvZHVjdElkczoge31cbiAgfTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFeGNlbHNJbmZvOiBTZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XG4gICAgdG90YWxQcmljZTogMCxcbiAgICBub1ByaWNlTnVtOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgaWRzOiB7fVxuICB9O1xuXG4gIGNhcnRJbmZvJCA9ICBuZXcgQmVoYXZpb3JTdWJqZWN0PENhcnRJbmZvPih0aGlzLmNhcnRJbmZvKTtcbiAgY29tcGxldGVkQ2FydEl0ZW1zT3JkZXI6IGFueSA9IG51bGw7XG4gIGNvbXBsZXRlZE9yZGVySW5DYXJ0OiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzdFNlcnZpY2U6IFJlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgZ2V0IG1lbW9FeGNlbHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDtgqRbY3VzdG9tIGNhcnQgaXRlbSBpZF06IOyXkeyFgCDslYTsnbTthZwg7KCV67O066W8IOuLtOqzoCDsnojsnYxcbiAgICAqICovXG4gICAgcmV0dXJuIHRoaXMuX21lbW9FeGNlbHNJbmZvO1xuICB9XG5cbiAgZ2V0IG1lbW9Qcm9kdWN0c0luZm8oKSB7XG4gICAgLypcbiAgICAqIO2CpFtjYXJ0IGl0ZW0gaWRdOiDsg4Htkogg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkUHJvZHVjdHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7Lm07Yq465Ok7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbztcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEV4Y2Vsc0luZm8gKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7JeR7IWA7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm87XG4gIH1cblxuXG4gIGFkZENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiB7XG4gICAgLypcbiAgICAqIOy5tO2KuOyXkCDsg4Htkogg7LaU6rCAICjtlITroZzrjZXtirgg7IOB7ZKI66eMLCDsl5HshYAg7IOB7ZKI7J2AIOy2lOqwgCDrqrvtlagpXG4gICAgKiAqL1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9kZXYtY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvYWRkJywge1xuICAgICAgYm9keSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBzdWJ0cmFjdENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiAge1xuICAgIC8qXG4gICAgKiDsubTtirjsl5Ag7IOB7ZKIIOu6tOq4sCAo7ZSE66Gc642V7Yq4IOyDge2SiOunjCwg7JeR7IWAIOyDge2SiOydgCDstpTqsIAg66q77ZWoKVxuICAgICogKi9cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICBpdGVtc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vZGV2LWNvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jYXJ0L3N1YnRyYWN0Jywge1xuICAgICAgYm9keSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBzZXRTdGVwKHZhbHVlOiAncGVuZGluZycgfCAnY2FydCcgfCAnZW1wdHknIHwgJ2Vycm9yJyB8ICdwYXltZW50JyB8ICdjb21wbGV0ZS1zdG9yZS1vcmRlcicgfCAnY29tcGxldGUtb25lLXN0b3AnKTogdm9pZCB7XG4gICAgLypcbiAgICAgICog7Lm07Yq4IOqysOygnCDri6jqs4RcbiAgICAgICogcGVuZGluZzog642w7J207YSwIOu2iOufrOyYpOuKlCDspJFcbiAgICAgICogY2FydDog642w7J207YSw6rCAIDHqsJwg7J207IOBIOuwjyDsubTtirgg7Y6Y7J207KeA7JeQIOyeiOydhCDrlYxcbiAgICAgICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcbiAgICAgICogZXJyb3I6IOuNsOydtO2EsOulvCDqsIDsoLjsmKTripTrjbAg7JeQ65+s6rCAIOuCrOydhCDqsr3smrBcbiAgICAgICogcGF5bWVudDog7JuQ7Iqk7YaxIOqysOygnCDshKDtg50g7ZuEIOqysOygnCDtjpjsnbTsp4Dsl5Ag7J6I64qUIOqyveyasFxuICAgICAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICAgICAqIGNvbXBsZXRlLW9uZS1zdG9wOiDsm5DsiqTthrEg7KO866y47J2EIOyZhOujjO2WiOydhCDqsr3smrBcbiAgICAqICovXG5cbiAgICB0aGlzLl9zdGVwID0gdmFsdWU7XG4gIH1cblxuICByZXNldFNlbGVjdGVkUHJvZHVjdHNJbmZvICgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbyA9IHtcbiAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICBudW06IDAsXG4gICAgICBwY3M6IDAsXG4gICAgICBjYXJ0SWRzOiB7fSxcbiAgICAgIHByb2R1Y3RJZHM6IHt9XG4gICAgfTtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0ZWRFeGNlbEluZm8gKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mbyA9IHtcbiAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICBub1ByaWNlTnVtOiAwLFxuICAgICAgbnVtOiAwLFxuICAgICAgcGNzOiAwLFxuICAgICAgaWRzOiB7fVxuICAgIH1cbiAgfVxuXG4gIGdldEF1dGhDYXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLkdFVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9jYXJ0Jywge2hhbmRsZUVycm9yOiB0cnVlfSk7XG4gIH1cblxuICBnZXRBdXRoRXhjZWxDYXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLkdFVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX2NhcnQvYXV0aC9tZScsIHtoYW5kbGVFcnJvcjogdHJ1ZX0pXG4gIH1cblxuICByZXF1ZXN0UHJvZHVjdExpc3QoaWRzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IGJvZHkgPSB7aWRzfTtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCcvYXBpL3Byb2R1Y3QvYm8vcHJvZHVjdExpc3RCeUlkcycsIHtib2R5LCBoYW5kbGVFcnJvcjogdHJ1ZX0pO1xuICB9XG5cbiAgcHV0RXhjZWxDYXJ0KGl0ZW1zOiBhbnlbXSkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2N1c3RvbUNhcnRJZCxcbiAgICAgIGl0ZW1zXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBVVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX2NhcnQvJywge1xuICAgICAgYm9keSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSlcbiAgfVxuXG5cbiAgZ2V0Q2FydEluZm8oKSB7XG4gICAgbGV0IGNhcnRJdGVtczphbnlbXSA9IFtdO1xuICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RhcnQoKTtcbiAgICB0aGlzLl9zdGVwID0gJ3BlbmRpbmcnO1xuICAgIHRoaXMuY29tcGxldGVkT3JkZXJJbkNhcnQgPSBudWxsO1xuXG4gICAgdGhpcy5nZXRBdXRoQ2FydCgpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoY2FydERvYyA9PiB7XG4gICAgICAgIGNhcnRJdGVtcyA9IGNhcnREb2MuaXRlbXM7XG4gICAgICAgIHRoaXMuX2N1c3RvbWVySWQgPSBjYXJ0RG9jLmN1c3RvbWVyO1xuICAgICAgICB0aGlzLl9jYXJ0SWQgPSBjYXJ0RG9jLl9pZDtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkcyA9IGNhcnREb2MuaXRlbXMubWFwKChjYXJ0SXRlbTogeyBwcm9kdWN0OiBhbnk7IH0pID0+IGNhcnRJdGVtLnByb2R1Y3QpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RQcm9kdWN0TGlzdChwcm9kdWN0SWRzKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAocHJvZHVjdHMgPT4ge1xuICAgICAgICAvLyDrsJvslYTsmKggcHJvZHVjdHMg67Cw7Je07J2EIOqwneyytO2ZlFxuICAgICAgICBjb25zdCBtZW1vUHJvZHVjdHMgPSBwcm9kdWN0cy5yZWR1Y2UoKHJlc3VsdDogYW55LCBwcm9kdWN0OiBhbnkpID0+IHtcbiAgICAgICAgICByZXN1bHRbcHJvZHVjdC5pZF0gPSBwcm9kdWN0O1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICAvKlxuICAgICAgICAqIO2VmOuCmOydmCDsg4HtkogoUHJvZHVjdCBJZCnsl5Ag7Ji17IWYIO2VmOuCmO2VmOuCmChDYXJ0IEl0ZW0gSWQp66W8IOuEo+q4sCDsnITtlbRcbiAgICAgICAgKiAqL1xuICAgICAgICBsZXQgcHJvZHVjdENhcnQ6IGFueSA9IGNhcnRJdGVtcy5yZWR1Y2UoKHJlc3VsdCwgY2FydEl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSBjYXJ0SXRlbS5wcm9kdWN0O1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RJbmZvID0gbWVtb1Byb2R1Y3RzW3Byb2R1Y3RJZF07XG4gICAgICAgICAgY29uc3QgdG90YWxQcm9kdWN0UHJpY2UgPSBjYXJ0SXRlbS5xdWFudGl0eSAqIHByb2R1Y3RJbmZvLnByaWNlO1xuXG4gICAgICAgICAgLyog7Lm07Yq4IOyVhOydtO2FnOyXkCDrjIDtlZwg66mU66qo7KCc7J207IWYIOyggOyepSAqL1xuICAgICAgICAgIHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bY2FydEl0ZW0uX2lkXSA9IHtcbiAgICAgICAgICAgIC4uLmNhcnRJdGVtLFxuICAgICAgICAgICAgcHJvZHVjdDogcHJvZHVjdEluZm9cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihyZXN1bHQuaGFzT3duUHJvcGVydHkocHJvZHVjdElkKSkge1xuICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0udG90YWxQcmljZSArPSB0b3RhbFByb2R1Y3RQcmljZTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdFtwcm9kdWN0SWRdLm9wdGlvbnNbY2FydEl0ZW0uX2lkXSl7XG4gICAgICAgICAgICAgIC8vIOqwmeydgCDsmLXshZjsnbQg7J6I64qU6rK97JqwLFxuICAgICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0ucXVhbnRpdHkgKz0gY2FydEl0ZW0ucXVhbnRpdHk7XG4gICAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLm9wdGlvbnNbY2FydEl0ZW0uX2lkXS5xdWFudGl0eSArPSB0b3RhbFByb2R1Y3RQcmljZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBjYXJ0SXRlbUlkOiBjYXJ0SXRlbS5faWQsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNhcnRJdGVtLm9wdGlvbnMuY29sb3IsXG4gICAgICAgICAgICAgICAgc2l6ZTogY2FydEl0ZW0ub3B0aW9ucy5zaXplLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiBjYXJ0SXRlbS5xdWFudGl0eSxcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0gPSBvcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHt3aG9sZXNhbGU6IHtuYW1lLCBidWlsZGluZywgZmxvb3IsIHNlY3Rpb259fSA9IHByb2R1Y3RJbmZvO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuICAgICAgICAgICAgICBjYXJ0SXRlbUlkOiBjYXJ0SXRlbS5faWQsXG4gICAgICAgICAgICAgIGNvbG9yOiBjYXJ0SXRlbS5vcHRpb25zLmNvbG9yLFxuICAgICAgICAgICAgICBzaXplOiBjYXJ0SXRlbS5vcHRpb25zLnNpemUsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiBjYXJ0SXRlbS5xdWFudGl0eSxcbiAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RJbmZvLnByaWNlLFxuICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGNhcnRJdGVtLnByb2R1Y3ROYW1lLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIHdob2xlc2FsZU5hbWU6IGAke25hbWV9KCR7YnVpbGRpbmd9ICR7Zmxvb3J97Li1ICR7c2VjdGlvbn0pYCxcbiAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIFtjYXJ0SXRlbS5faWRdOiBvcHRpb25cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW1hZ2VQYXRoOiBwcm9kdWN0SW5mby5pbWdQYXRoc1swXSxcbiAgICAgICAgICAgICAgcHJpY2U6IHByb2R1Y3RJbmZvLnByaWNlLFxuICAgICAgICAgICAgICB0b3RhbFByaWNlOiB0b3RhbFByb2R1Y3RQcmljZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICBwcm9kdWN0Q2FydCA9IE9iamVjdC52YWx1ZXMocHJvZHVjdENhcnQpLm1hcCgoY2FydEl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIGNhcnRJdGVtLm9wdGlvbnMgPSBPYmplY3QudmFsdWVzKGNhcnRJdGVtLm9wdGlvbnMpO1xuICAgICAgICAgIHJldHVybiBjYXJ0SXRlbTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0cyA9IHByb2R1Y3RDYXJ0O1xuICAgICAgICB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250ID0gcHJvZHVjdHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdXRoRXhjZWxDYXJ0KCk7XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKFxuICAgICAgKGN1c3RvbUNhcnRJbmZvKSA9PiB7XG4gICAgICAgIHRoaXMuX2N1c3RvbUNhcnRJZCA9IGN1c3RvbUNhcnRJbmZvLl9pZDtcbiAgICAgICAgdGhpcy5jYXJ0SW5mby5leGNlbHMgPSBjdXN0b21DYXJ0SW5mby5pdGVtcztcbiAgICAgICAgdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgPSBjdXN0b21DYXJ0SW5mby5pdGVtcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuY2FydEluZm8udG90YWxDbnQgPSB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCArIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQ7XG4gICAgICAgIHRoaXMuX3N0ZXAgPSB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID4gMCA/ICdjYXJ0JyA6ICdlbXB0eSc7XG5cbiAgICAgICAgLyog7JeR7IWAIOyjvOusuChDdXN0b21DYXJ0KSDrqZTrqqjsoJzsnbTshZgg7IOd7ISxICovXG4gICAgICAgIHRoaXMuX21lbW9FeGNlbHNJbmZvID0gY3VzdG9tQ2FydEluZm8uaXRlbXMucmVkdWNlKChyZXN1bHQ6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgcmVzdWx0W2l0ZW0uX2lkXSA9IGl0ZW07XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RvcCgpO1xuICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHRoaXMuY2FydEluZm8pO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOygleuztOulvCDqsIDsoLjsmKTripTrjbAg7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc3RlcCA9ICdlcnJvcic7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBkZWxldGVQcm9kdWN0SW5DYXJ0KCkge1xuICAgIGNvbnN0IGl0ZW1zOiBhbnlbXSA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHMpLm1hcCgoaWQpID0+IHtcbiAgICAgIGNvbnN0IGNhcnRJdGVtID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9kdWN0OiBjYXJ0SXRlbS5wcm9kdWN0LmlkLFxuICAgICAgICBvcHRpb25zOiBjYXJ0SXRlbS5vcHRpb25zLFxuICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHlcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgdGhpcy5zdWJ0cmFjdENhcnQoaXRlbXMpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyAxLiBtZW1vQ2FydEl0ZW1z7J2YIOyDge2SiCDslYTsnbTrlJQg7YKkIOqwkiDsgq3soJxcbiAgICAgICAgICAvLyAyLiBzZWxlY3RlZENhcnRzIOy0iOq4sO2ZlFxuICAgICAgICAgIC8vIDMuIHByb2R1Y3RDYXJ0cyDsgq3soJxcbiAgICAgICAgICAvLyA0LiBwcm9kdWN0Q250LCB0b3RhbENudCDsl4XrjbDsnbTtirhcbiAgICAgICAgICAvLyA1IGNhcnRJbmZvIG5leHRcbiAgICAgICAgICB0aGlzLmNsZWFuUHJvZHVjdENhcnQoKTtcbiAgICAgICAgfSxcbiAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7IKt7KCc7JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcbiAgICAgICAgfVxuICAgICAgKVxuICB9XG5cbiAgZGVsZXRlUHJvZHVjdE9wdGlvbihoYXNPbmVPcHRpb246IGJvb2xlYW4sIGNhcnRJdGVtSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb2R1Y3ROYW1lLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHByb2R1Y3Q6IHsgaWQ6IHByb2R1Y3R9LFxuICAgICAgcXVhbnRpdHksXG4gICAgICBfaWRcbiAgICB9ID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tjYXJ0SXRlbUlkXTtcblxuICAgIGNvbnN0IGNhcnRJdGVtID0ge1xuICAgICAgX2lkLFxuICAgICAgcHJvZHVjdE5hbWUsXG4gICAgICBvcHRpb25zLFxuICAgICAgcXVhbnRpdHksXG4gICAgICBwcm9kdWN0XG4gICAgfTtcblxuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgIGl0ZW1zOiBbY2FydEl0ZW1dXG4gICAgfVxuXG4gICAgaWYgKGhhc09uZU9wdGlvbikge1xuICAgICAgLy8g7IOB7ZKI7J2EIOyCreygnO2VnOuLpC5cbiAgICAgIHRoaXMuc3VidHJhY3RDYXJ0KFtjYXJ0SXRlbV0pLnN1YnNjcmliZShcbiAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsZWFuUHJvZHVjdENhcnQoKTtcbiAgICAgICAgICB9LFxuICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7IKt7KCc7JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g7Ji17IWY66eMIOyCreygnO2VnOuLpC5cbiAgICAgIHRoaXMuc3VidHJhY3RDYXJ0KFtjYXJ0SXRlbV0pLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzLmZpbmRJbmRleCgoY2FydDogYW55KSA9PiBjYXJ0LnByb2R1Y3RJZCA9PT0gcHJvZHVjdCk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0Q2FydCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHNbaW5kZXhdIGFzIGFueTtcbiAgICAgICAgICAgIGNvbnN0IG9JbmRleCA9IHByb2R1Y3RDYXJ0Lm9wdGlvbnMuZmluZEluZGV4KChvcHRpb246IGFueSkgPT4gb3B0aW9uLmNhcnRJdGVtSWQgPT09IGNhcnRJdGVtSWQpO1xuICAgICAgICAgICAgY29uc3QgeyB0b3RhbFByaWNlLCBxdWFudGl0eTogcGNzIH0gPSBwcm9kdWN0Q2FydC5vcHRpb25zW29JbmRleF07XG5cbiAgICAgICAgICAgIHByb2R1Y3RDYXJ0Lm9wdGlvbnMuc3BsaWNlKG9JbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2NhcnRJdGVtSWRdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkc1tjYXJ0SXRlbUlkXSkge1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby50b3RhbFByaWNlIC09IHRvdGFsUHJpY2U7XG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLnBjcyAtPSBwY3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7Ji17IWYIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUV4Y2VsQ2FydCgpIHtcbiAgICBjb25zdCBtZW1vICA9IHsuLi50aGlzLl9tZW1vRXhjZWxzSW5mb307XG4gICAgY29uc3QgaWRzID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvLmlkcyk7XG5cbiAgICBmb3IobGV0IGk9MDsgaTxpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlkID0gaWRzW2ldO1xuICAgICAgaWYodGhpcy5fbWVtb0V4Y2Vsc0luZm8uaWRzW2lkXSkge1xuICAgICAgICBkZWxldGUgbWVtb1tpZF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdG9EZWxldGVJdGVtcyA9IE9iamVjdC52YWx1ZXMobWVtbyk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBpdGVtczogdG9EZWxldGVJdGVtc1xuICAgIH1cblxuICAgIHRoaXMucHV0RXhjZWxDYXJ0KHRvRGVsZXRlSXRlbXMpLnN1YnNjcmliZShcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXN0b21DYXJ0SWQgPSBjdXN0b21DYXJ0SW5mby5faWQ7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzID0gY3VzdG9tQ2FydEluZm8uaXRlbXM7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuXG4gICAgICAgICAgICAgIHRoaXMuX21lbW9FeGNlbHNJbmZvID0gY3VzdG9tQ2FydEluZm8uaXRlbXMucmVkdWNlKChyZXN1bHQ6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2l0ZW0uX2lkXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID4gMCA/ICdjYXJ0JyA6ICdlbXB0eSc7XG5cbiAgICAgICAgICAgICAgdGhpcy5fbWVtb0V4Y2Vsc0luZm8gPSB7XG4gICAgICAgICAgICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgICAgICAgICAgICBub1ByaWNlTnVtOiAwLFxuICAgICAgICAgICAgICAgIG51bTogMCxcbiAgICAgICAgICAgICAgICBwY3M6IDAsXG4gICAgICAgICAgICAgICAgaWRzOiB7fVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsl5HshYAg7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBvcmRlclRvU3RvcmUocGhvbmU6IHN0cmluZykge1xuICAgIGNvbnN0IGlkc0luQ2FydEl0ZW1zID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XG4gICAgY29uc3QgaWRzSW5DdXN0b21DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8uaWRzKS5maWx0ZXIoKGlkKSA9PiAhIXRoaXMuX21lbW9FeGNlbHNJbmZvW2lkXS5xdWFudGl0eSk7XG4gICAgY29uc3QgY2FydEl0ZW1zID0gaWRzSW5DYXJ0SXRlbXMubWFwKChpZCkgPT4ge1xuICAgICAgY29uc3Qge29wdGlvbnMsIHByb2R1Y3QsIHByb2R1Y3ROYW1lLCBxdWFudGl0eX0gPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdob2xlc2FsZU5hbWU6IHByb2R1Y3Qud2hvbGVzYWxlLm5hbWUsXG4gICAgICAgIHdob2xlc2FsZToge1xuICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgIGlkOiBwcm9kdWN0Lndob2xlc2FsZVN0b3JlSWQsXG4gICAgICAgICAgbmFtZTogcHJvZHVjdC53aG9sZXNhbGUubmFtZVxuICAgICAgICB9LFxuICAgICAgICBidWlsZGluZzogcHJvZHVjdC53aG9sZXNhbGUuYnVpbGRpbmcsXG4gICAgICAgIGZsb29yOiBwcm9kdWN0Lndob2xlc2FsZS5mbG9vcixcbiAgICAgICAgcm9vbTogcHJvZHVjdC53aG9sZXNhbGUuc2VjdGlvbixcbiAgICAgICAgYWRkcmVzczogYCR7cHJvZHVjdC53aG9sZXNhbGUuYnVpbGRpbmd9LCAke3Byb2R1Y3Qud2hvbGVzYWxlLmZsb29yfSwgJHtwcm9kdWN0Lndob2xlc2FsZS5zZWN0aW9ufWAsXG4gICAgICAgIHBob25lOiBwcm9kdWN0Lndob2xlc2FsZS5waG9uZSxcbiAgICAgICAgcHJvZHVjdE5hbWU6IHByb2R1Y3ROYW1lLFxuICAgICAgICBjb2xvcjogb3B0aW9ucy5jb2xvcixcbiAgICAgICAgc2l6ZTogb3B0aW9ucy5zaXplLFxuICAgICAgICBvcHRpb25zOiBgJHtvcHRpb25zLmNvbG9yfSAvICR7b3B0aW9ucy5zaXplfSAvICR7cXVhbnRpdHl96rCcYCxcbiAgICAgICAgcHJpY2U6IGAke3Byb2R1Y3QucHJpY2V9YCxcbiAgICAgICAgcXVhbnRpdHk6IGAke3F1YW50aXR5fWBcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZm9ya0pvaW4odGhpcy5jcmVhdGVDdXN0b21PcmRlclVzaW5nQ2FydEl0ZW1zKGNhcnRJdGVtcywgcGhvbmUpLCB0aGlzLmNyZWF0ZUN1c3RvbUNhcnRPcmRlcihpZHNJbkN1c3RvbUNhcnRJdGVtcywgcGhvbmUpKS5zdWJzY3JpYmUoXG4gICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgKiDrp6TsnqUg7KO866y4IO2bhCwg7IOd7ISx65CcIOyjvOusuCDrjbDsnbTthLDrpbwg7KCA7J6l7ZWY6riwIOychO2VtFxuICAgICAgICAqICovXG4gICAgICAgIHRoaXMuY29tcGxldGVkT3JkZXJJbkNhcnQgPSB7XG4gICAgICAgICAgY2FydE9yZGVyczogdGhpcy5jb21wbGV0ZWRDYXJ0SXRlbXNPcmRlciB8fCBudWxsLFxuICAgICAgICAgIGN1c3RvbU9yZGVyczogcmVzcG9uc2VbMV0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3N0ZXAgPSAnY29tcGxldGUtc3RvcmUtb3JkZXInO1xuICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOunpOyepSDso7zrrLjsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ3VzdG9tQ2FydE9yZGVyKGl0ZW1zOiBhbnlbXSwgcGhvbmU6IHN0cmluZykge1xuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY3VzdG9tQ2FydElkLFxuICAgICAgY3VzdG9tZXI6IHRoaXMuX2N1c3RvbWVySWQsXG4gICAgICB0eXBlOiAnZ2VuZXJhbCcsXG4gICAgICB1bmNsZVBob25lOiBwaG9uZSxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX2NhcnQvY2hlY2tvdXQnLCB7XG4gICAgICBib2R5LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBjcmVhdGVDdXN0b21PcmRlclVzaW5nQ2FydEl0ZW1zKGl0ZW1zOiBhbnlbXSwgcGhvbmU6IHN0cmluZykge1xuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xuXG4gICAgY29uc3QgaWRzSW5DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKTtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBjdXN0b21lcjogdGhpcy5fY3VzdG9tZXJJZCxcbiAgICAgIHR5cGU6ICdnZW5lcmFsJyxcbiAgICAgIHVuY2xlUGhvbmU6IHBob25lLFxuICAgICAgaXRlbXNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fb3JkZXIvJywge1xuICAgICAgYm9keToge1xuICAgICAgICAuLi5ib2R5LFxuICAgICAgICBpdGVtc1xuICAgICAgfVxuICAgIH0pLnBpcGUoXG4gICAgICBtZXJnZU1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBpZHNJbkNhcnRJdGVtcy5tYXAoKGlkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdLFxuICAgICAgICAgICAgcHJvZHVjdDogdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF0ucHJvZHVjdC5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wbGV0ZWRDYXJ0SXRlbXNPcmRlciA9IHJlc3BvbnNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvc3VidHJhY3QnLCB7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgYWRkQWRkcmVzcyhib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MnLCB7XG4gICAgICBib2R5OiBib2R5XG4gICAgfSkucGlwZShcbiAgICAgIG1lcmdlTWFwKCh7YWRkcmVzc2VzOiB7c2Vjb25kYXJpZXN9fTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHtfaWR9ID0gc2Vjb25kYXJpZXMuc2xpY2UoLTEpWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MvcHJpbWFyeScsIHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBfaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlQWRkcmVzcyhpZDogc3RyaW5nLCBib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QVVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcycsIHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgYWRkcmVzc0lkOiBpZCxcbiAgICAgICAgLi4uYm9keVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVBZGRyZXNzKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5ERUxFVEUoIGBodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MvJHtpZH1gLFxuICAgICAgeyBoYW5kbGVFcnJvcjogdHJ1ZX0pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2Vjb25kYXJpZXMgfSA9IHVzZXJJbmZvLmFkZHJlc3NlcztcbiAgICAgICAgaWYgKHNlY29uZGFyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBsYXN0SWQgPSBzZWNvbmRhcmllcy5zbGljZSgtMSlbMF0uX2lkO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldFByaW1hcnlBZGRyZXNzKGxhc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG5cbiAgc2V0UHJpbWFyeUFkZHJlc3MoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy9wcmltYXJ5Jywge1xuICAgICAgYm9keToge1xuICAgICAgICBfaWQ6IGlkXG4gICAgICB9LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5Qcm9kdWN0Q2FydCgpIHtcbiAgICBjb25zdCBkZWxldGVkSWRzID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XG5cbiAgICBmb3IobGV0IGk9MDsgaSA8IGRlbGV0ZWRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRDYXJ0SWQgPSBkZWxldGVkSWRzW2ldO1xuICAgICAgY29uc3QgZGVsZXRlZFByb2R1Y3RJZDogYW55ID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tkZWxldGVkQ2FydElkXS5wcm9kdWN0LmlkO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzLmZpbmRJbmRleCgoaXRlbTogYW55KSA9PiBpdGVtLnByb2R1Y3RJZCA9PT0gZGVsZXRlZFByb2R1Y3RJZCk7XG5cbiAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2RlbGV0ZWRDYXJ0SWRdO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvID0gIHtcbiAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICBudW06IDAsXG4gICAgICBwY3M6IDAsXG4gICAgICBjYXJ0SWRzOiB7fSxcbiAgICAgIHByb2R1Y3RJZHM6IHt9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHMubGVuZ3RoO1xuICAgIHRoaXMuY2FydEluZm8udG90YWxDbnQgPSB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCArIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQ7XG4gICAgdGhpcy5fc3RlcCA9IHRoaXMuY2FydEluZm8udG90YWxDbnQgPiAwID8gJ2NhcnQnIDogJ2VtcHR5JztcbiAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gIH1cbn1cbiJdfQ==