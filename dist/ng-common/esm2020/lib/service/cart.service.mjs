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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTbEMsTUFBTSxPQUFPLFdBQVc7SUE4Q3RCLFlBQ1UsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0N4QyxhQUFRLEdBQWE7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFRDs7Ozs7Ozs7O1lBU0k7UUFDSSxVQUFLLEdBQXNHLFNBQVMsQ0FBQztRQUtySCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQXlCO1lBQ3BELFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ00sd0JBQW1CLEdBQXVCO1lBQ2hELFVBQVUsRUFBRSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLEVBQUU7U0FDUixDQUFDO1FBRUYsY0FBUyxHQUFJLElBQUksZUFBZSxDQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCw0QkFBdUIsR0FBUSxJQUFJLENBQUM7UUFDcEMseUJBQW9CLEdBQVEsSUFBSSxDQUFDO0lBTTdCLENBQUM7SUFFTCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQjs7WUFFSTtRQUNKLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEI7O1lBRUk7UUFDSixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDdEI7O1lBRUk7UUFDSixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEI7O1lBRUk7UUFDSixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCOztZQUVJO1FBQ0osTUFBTSxJQUFJLEdBQUc7WUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDakIsS0FBSztTQUNOLENBQUE7UUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLCtDQUErQyxFQUFFO1lBQzVFLElBQUk7WUFDSixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCOztZQUVJO1FBQ0osTUFBTSxJQUFJLEdBQUc7WUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDakIsS0FBSztTQUNOLENBQUE7UUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxFQUFFO1lBQzdFLElBQUk7WUFDSixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQXdHO1FBQzlHOzs7Ozs7Ozs7WUFTSTtRQUVKLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHO1lBQzNCLFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIsVUFBVSxFQUFFLENBQUM7WUFDYixVQUFVLEVBQUUsQ0FBQztZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsRUFBRTtTQUNSLENBQUE7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMscURBQXFELEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO0lBQzFHLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFhO1FBQzlCLE1BQU0sSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVk7UUFDdkIsTUFBTSxJQUFJLEdBQUc7WUFDWCxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDdkIsS0FBSztTQUNOLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFO1lBQzNFLElBQUk7WUFDSixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0lBR0QsV0FBVztRQUNULElBQUksU0FBUyxHQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFFakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FDckIsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEVBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pCLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDM0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUEyQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEYsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEVBQ0YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLHVCQUF1QjtZQUN2QixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBVyxFQUFFLE9BQVksRUFBRSxFQUFFO2dCQUNqRSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDN0IsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRVA7O2dCQUVJO1lBQ0osSUFBSSxXQUFXLEdBQVEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDbkMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFFaEUseUJBQXlCO2dCQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHO29CQUNyQyxHQUFHLFFBQVE7b0JBQ1gsT0FBTyxFQUFFLFdBQVc7aUJBQ3JCLENBQUE7Z0JBRUQsSUFBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxJQUFJLGlCQUFpQixDQUFDO29CQUVsRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFDO3dCQUMxQyxlQUFlO3dCQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDO3dCQUN0RSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksaUJBQWlCLENBQUM7cUJBQ3ZFO3lCQUFNO3dCQUNMLE1BQU0sTUFBTSxHQUFHOzRCQUNiLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRzs0QkFDeEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSzs0QkFDN0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSTs0QkFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFROzRCQUMzQixVQUFVLEVBQUUsaUJBQWlCO3lCQUM5QixDQUFDO3dCQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztxQkFDbEQ7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxFQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUFDLEdBQUcsV0FBVyxDQUFDO29CQUNsRSxNQUFNLE1BQU0sR0FBRzt3QkFDYixVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUc7d0JBQ3hCLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUs7d0JBQzdCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUk7d0JBQzNCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTt3QkFDM0IsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO3dCQUN4QixVQUFVLEVBQUUsaUJBQWlCO3FCQUM5QixDQUFDO29CQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRzt3QkFDbEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXO3dCQUMxQixTQUFTO3dCQUNULGFBQWEsRUFBRSxHQUFHLElBQUksSUFBSSxRQUFRLElBQUksS0FBSyxLQUFLLE9BQU8sR0FBRzt3QkFDMUQsT0FBTyxFQUFFOzRCQUNQLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU07eUJBQ3ZCO3dCQUNELFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLO3dCQUN4QixVQUFVLEVBQUUsaUJBQWlCO3FCQUM5QixDQUFBO2lCQUNGO2dCQUVELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVQLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2dCQUM3RCxRQUFRLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLFFBQVEsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FBQyxTQUFTLENBQ1QsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUM3RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFFM0QsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLEVBQUU7Z0JBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFUCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQjtRQUNqQixNQUFNLEtBQUssR0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUM5RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsT0FBTztnQkFDTCxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87Z0JBQ3pCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTthQUM1QixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FDaEMsR0FBRyxFQUFFO1lBQ0Qsa0NBQWtDO1lBQ2xDLHVCQUF1QjtZQUN2QixxQkFBcUI7WUFDckIsK0JBQStCO1lBQy9CLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQ1AsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxZQUFxQixFQUFFLFVBQWtCO1FBQzNELE1BQU0sRUFDSixXQUFXLEVBQ1gsT0FBTyxFQUNQLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUMsRUFDdkIsUUFBUSxFQUNSLEdBQUcsRUFDSixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2QyxNQUFNLFFBQVEsR0FBRztZQUNmLEdBQUc7WUFDSCxXQUFXO1lBQ1gsT0FBTztZQUNQLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHO1lBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2pCLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNsQixDQUFBO1FBRUQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsWUFBWTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDekMsR0FBRyxFQUFFO2dCQUNHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFDUCxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUNGLENBQUE7U0FDSjthQUFNO1lBQ0wsWUFBWTtZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDckMsR0FBRyxFQUFFO2dCQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDMUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFRLENBQUM7Z0JBQ3pELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVsRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUxQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2xELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDO29CQUNwRCxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFDRCxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUNKLENBQUE7U0FDRjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxJQUFJLEdBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUMsQ0FBQztRQUN4QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQjtTQUNGO1FBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FDeEMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBRTdFLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLEVBQUU7Z0JBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFFM0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHO2dCQUN6QixVQUFVLEVBQUUsQ0FBQztnQkFDYixVQUFVLEVBQUUsQ0FBQztnQkFDYixHQUFHLEVBQUUsQ0FBQztnQkFDTixHQUFHLEVBQUUsQ0FBQztnQkFDTixHQUFHLEVBQUUsRUFBRTthQUNSLENBQUM7WUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUNILENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWE7UUFDeEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkUsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNILE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUMxQyxNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxFQUFFO29CQUNSLEVBQUUsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO29CQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJO2lCQUM3QjtnQkFDRCxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRO2dCQUNwQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLO2dCQUM5QixJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPO2dCQUMvQixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbEcsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSztnQkFDOUIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2dCQUNsQixPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxNQUFNLE9BQU8sQ0FBQyxJQUFJLE1BQU0sUUFBUSxHQUFHO2dCQUM1RCxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN6QixRQUFRLEVBQUUsR0FBRyxRQUFRLEVBQUU7YUFDeEIsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBR0gsUUFBUSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNqSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFeEI7O2dCQUVJO1lBQ0osSUFBSSxDQUFDLG9CQUFvQixHQUFHO2dCQUMxQixVQUFVLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUk7Z0JBQ2hELFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSTthQUNsQyxDQUFDO1lBRUYsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUNELENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBWSxFQUFFLEtBQWE7UUFDdkQsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxNQUFNLElBQUksR0FBRztZQUNYLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDMUIsSUFBSSxFQUFFLFNBQVM7WUFDZixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLO1NBQ04sQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsdURBQXVELEVBQUU7WUFDcEYsSUFBSTtZQUNKLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHTywrQkFBK0IsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNqRSxJQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sSUFBSSxHQUFHO1lBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztZQUMxQixJQUFJLEVBQUUsU0FBUztZQUNmLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUs7U0FDTixDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsRUFBRTtZQUM3RSxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJO2dCQUNQLEtBQUs7YUFDTjtTQUNGLENBQUMsQ0FBQyxJQUFJLENBQ0wsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDcEIsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO2dCQUN0QyxPQUFPO29CQUNMLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtpQkFDL0MsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQztZQUV4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxFQUFFO2dCQUM3RSxJQUFJLEVBQUU7b0JBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixLQUFLO2lCQUNOO2dCQUNELFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx3REFBd0QsRUFBRTtZQUNyRixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQyxJQUFJLENBQ0wsUUFBUSxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxFQUFFO2dCQUM3RixJQUFJLEVBQUU7b0JBQ0osR0FBRztpQkFDSjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLEVBQVUsRUFBRSxJQUFTO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsd0RBQXdELEVBQUU7WUFDcEYsSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxFQUFFO2dCQUNiLEdBQUcsSUFBSTthQUNSO1lBQ0QsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFVO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUUsMERBQTBELEVBQUUsRUFBRSxFQUM1RixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEVBQ0YsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDcEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDM0MsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDNUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUdELGlCQUFpQixDQUFDLEVBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnRUFBZ0UsRUFBRTtZQUM3RixJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFLEVBQUU7YUFDUjtZQUNELFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sZ0JBQWdCLEdBQVEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDL0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLGdCQUFnQixDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBSTtZQUM1QixVQUFVLEVBQUUsQ0FBQztZQUNiLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQTtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUM3RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O3dHQS9sQlUsV0FBVzs0R0FBWCxXQUFXLGNBRlYsTUFBTTsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2UsIExvYWRpbmdTZXJ2aWNlLCBSZXN0U2VydmljZX0gZnJvbSAnQGdvbGxhbGEvbmctY29tbW9uJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gIENhcnRJbmZvLCBDYXJ0SXRlbSwgU2VsZWN0ZWRFeGNlbHNJbmZvLCBTZWxlY3RlZFByb2R1Y3RzSW5mb1xufSBmcm9tIFwiLi4vaW50ZXJmYWNlL2NhcnQubW9kZWxcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFNlcnZpY2Uge1xuXG4gIGNhcnRJbmZvOiBDYXJ0SW5mbyA9IHtcbiAgICBwcm9kdWN0czogW10sXG4gICAgZXhjZWxzOiBbXSxcbiAgICBwcm9kdWN0c0NudDogMCxcbiAgICBleGNlbHNDbnQ6IDAsXG4gICAgdG90YWxDbnQ6IDBcbiAgfVxuXG4gIC8qXG4gICog7Lm07Yq4IOqysOygnCDri6jqs4RcbiAgKiBwZW5kaW5nOiDrjbDsnbTthLAg67aI65+s7Jik64qUIOykkVxuICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXG4gICogZW1wdHk6IOuNsOydtO2EsOqwgCDtlZwg6rCc64+EIOyXhuydhCDrloRcbiAgKiBlcnJvcjog642w7J207YSw66W8IOqwgOyguOyYpOuKlOuNsCDsl5Drn6zqsIAg64Ks7J2EIOqyveyasFxuICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcbiAgKiBjb21wbGV0ZS1zdG9yZS1vcmRlcjog66ek7J6lIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICogY29tcGxldGUtb25lLXN0b3A6IOybkOyKpO2GsSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAqICovXG4gIHByaXZhdGUgX3N0ZXA6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcgPSAncGVuZGluZyc7XG5cbiAgcHJpdmF0ZSBfY3VzdG9tQ2FydElkITogc3RyaW5nO1xuICBwcml2YXRlIF9jYXJ0SWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX2N1c3RvbWVySWQhOiBzdHJpbmc7XG4gIHByaXZhdGUgX21lbW9FeGNlbHNJbmZvOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfbWVtb1Byb2R1Y3RzSW5mbzogYW55ID0ge307XG4gIHByaXZhdGUgX3NlbGVjdGVkUHJvZHVjdHNJbmZvOiBTZWxlY3RlZFByb2R1Y3RzSW5mbyA9IHtcbiAgICB0b3RhbFByaWNlOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgY2FydElkczoge30sXG4gICAgcHJvZHVjdElkczoge31cbiAgfTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRFeGNlbHNJbmZvOiBTZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XG4gICAgdG90YWxQcmljZTogMCxcbiAgICBub1ByaWNlTnVtOiAwLFxuICAgIG51bTogMCxcbiAgICBwY3M6IDAsXG4gICAgaWRzOiB7fVxuICB9O1xuXG4gIGNhcnRJbmZvJCA9ICBuZXcgQmVoYXZpb3JTdWJqZWN0PENhcnRJbmZvPih0aGlzLmNhcnRJbmZvKTtcbiAgY29tcGxldGVkQ2FydEl0ZW1zT3JkZXI6IGFueSA9IG51bGw7XG4gIGNvbXBsZXRlZE9yZGVySW5DYXJ0OiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzdFNlcnZpY2U6IFJlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICApIHsgfVxuXG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgZ2V0IG1lbW9FeGNlbHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDtgqRbY3VzdG9tIGNhcnQgaXRlbSBpZF06IOyXkeyFgCDslYTsnbTthZwg7KCV67O066W8IOuLtOqzoCDsnojsnYxcbiAgICAqICovXG4gICAgcmV0dXJuIHRoaXMuX21lbW9FeGNlbHNJbmZvO1xuICB9XG5cbiAgZ2V0IG1lbW9Qcm9kdWN0c0luZm8oKSB7XG4gICAgLypcbiAgICAqIO2CpFtjYXJ0IGl0ZW0gaWRdOiDsg4Htkogg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkUHJvZHVjdHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7Lm07Yq465Ok7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mbztcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEV4Y2Vsc0luZm8gKCkge1xuICAgIC8qXG4gICAgKiDshKDtg53rkJwg7JeR7IWA7J2YIOygleuztOulvCDrpqzthLTtlZzri6QuXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm87XG4gIH1cblxuXG4gIGFkZENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiB7XG4gICAgLypcbiAgICAqIOy5tO2KuOyXkCDsg4Htkogg7LaU6rCAICjtlITroZzrjZXtirgg7IOB7ZKI66eMLCDsl5HshYAg7IOB7ZKI7J2AIOy2lOqwgCDrqrvtlagpXG4gICAgKiAqL1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9kZXYtY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvYWRkJywge1xuICAgICAgYm9keSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBzdWJ0cmFjdENhcnQoaXRlbXM6IENhcnRJdGVtW10pOiBPYnNlcnZhYmxlPHtfaWQ6IHN0cmluZzsgaXRlbXM6IENhcnRJdGVtW119PiAge1xuICAgIC8qXG4gICAgKiDsubTtirjsl5Ag7IOB7ZKIIOu6tOq4sCAo7ZSE66Gc642V7Yq4IOyDge2SiOunjCwg7JeR7IWAIOyDge2SiOydgCDstpTqsIAg66q77ZWoKVxuICAgICogKi9cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICBpdGVtc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvc3VidHJhY3QnLCB7XG4gICAgICBib2R5LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN0ZXAodmFsdWU6ICdwZW5kaW5nJyB8ICdjYXJ0JyB8ICdlbXB0eScgfCAnZXJyb3InIHwgJ3BheW1lbnQnIHwgJ2NvbXBsZXRlLXN0b3JlLW9yZGVyJyB8ICdjb21wbGV0ZS1vbmUtc3RvcCcpOiB2b2lkIHtcbiAgICAvKlxuICAgICAgKiDsubTtirgg6rKw7KCcIOuLqOqzhFxuICAgICAgKiBwZW5kaW5nOiDrjbDsnbTthLAg67aI65+s7Jik64qUIOykkVxuICAgICAgKiBjYXJ0OiDrjbDsnbTthLDqsIAgMeqwnCDsnbTsg4Eg67CPIOy5tO2KuCDtjpjsnbTsp4Dsl5Ag7J6I7J2EIOuVjFxuICAgICAgKiBlbXB0eTog642w7J207YSw6rCAIO2VnCDqsJzrj4Qg7JeG7J2EIOuWhFxuICAgICAgKiBlcnJvcjog642w7J207YSw66W8IOqwgOyguOyYpOuKlOuNsCDsl5Drn6zqsIAg64Ks7J2EIOqyveyasFxuICAgICAgKiBwYXltZW50OiDsm5DsiqTthrEg6rKw7KCcIOyEoO2DnSDtm4Qg6rKw7KCcIO2OmOydtOyngOyXkCDsnojripQg6rK97JqwXG4gICAgICAqIGNvbXBsZXRlLXN0b3JlLW9yZGVyOiDrp6TsnqUg7KO866y47J2EIOyZhOujjO2WiOydhCDqsr3smrBcbiAgICAgICogY29tcGxldGUtb25lLXN0b3A6IOybkOyKpO2GsSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAgICogKi9cblxuICAgIHRoaXMuX3N0ZXAgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0ZWRQcm9kdWN0c0luZm8gKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvID0ge1xuICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgIG51bTogMCxcbiAgICAgIHBjczogMCxcbiAgICAgIGNhcnRJZHM6IHt9LFxuICAgICAgcHJvZHVjdElkczoge31cbiAgICB9O1xuICB9XG5cbiAgcmVzZXRTZWxlY3RlZEV4Y2VsSW5mbyAoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvID0ge1xuICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgIG5vUHJpY2VOdW06IDAsXG4gICAgICBudW06IDAsXG4gICAgICBwY3M6IDAsXG4gICAgICBpZHM6IHt9XG4gICAgfVxuICB9XG5cbiAgZ2V0QXV0aENhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuR0VUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2NhcnQnLCB7aGFuZGxlRXJyb3I6IHRydWV9KTtcbiAgfVxuXG4gIGdldEF1dGhFeGNlbENhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuR0VUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fY2FydC9hdXRoL21lJywge2hhbmRsZUVycm9yOiB0cnVlfSlcbiAgfVxuXG4gIHJlcXVlc3RQcm9kdWN0TGlzdChpZHM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgYm9keSA9IHtpZHN9O1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJy9hcGkvcHJvZHVjdC9iby9wcm9kdWN0TGlzdEJ5SWRzJywge2JvZHksIGhhbmRsZUVycm9yOiB0cnVlfSk7XG4gIH1cblxuICBwdXRFeGNlbENhcnQoaXRlbXM6IGFueVtdKSB7XG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY3VzdG9tQ2FydElkLFxuICAgICAgaXRlbXNcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUFVUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fY2FydC8nLCB7XG4gICAgICBib2R5LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KVxuICB9XG5cblxuICBnZXRDYXJ0SW5mbygpIHtcbiAgICBsZXQgY2FydEl0ZW1zOmFueVtdID0gW107XG4gICAgdGhpcy5sb2FkaW5nU2VydmljZS5zdGFydCgpO1xuICAgIHRoaXMuX3N0ZXAgPSAncGVuZGluZyc7XG4gICAgdGhpcy5jb21wbGV0ZWRPcmRlckluQ2FydCA9IG51bGw7XG5cbiAgICB0aGlzLmdldEF1dGhDYXJ0KCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcChjYXJ0RG9jID0+IHtcbiAgICAgICAgY2FydEl0ZW1zID0gY2FydERvYy5pdGVtcztcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJJZCA9IGNhcnREb2MuY3VzdG9tZXI7XG4gICAgICAgIHRoaXMuX2NhcnRJZCA9IGNhcnREb2MuX2lkO1xuICAgICAgICBjb25zdCBwcm9kdWN0SWRzID0gY2FydERvYy5pdGVtcy5tYXAoKGNhcnRJdGVtOiB7IHByb2R1Y3Q6IGFueTsgfSkgPT4gY2FydEl0ZW0ucHJvZHVjdCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFByb2R1Y3RMaXN0KHByb2R1Y3RJZHMpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcChwcm9kdWN0cyA9PiB7XG4gICAgICAgIC8vIOuwm+yVhOyYqCBwcm9kdWN0cyDrsLDsl7TsnYQg6rCd7LK07ZmUXG4gICAgICAgIGNvbnN0IG1lbW9Qcm9kdWN0cyA9IHByb2R1Y3RzLnJlZHVjZSgocmVzdWx0OiBhbnksIHByb2R1Y3Q6IGFueSkgPT4ge1xuICAgICAgICAgIHJlc3VsdFtwcm9kdWN0LmlkXSA9IHByb2R1Y3Q7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIC8qXG4gICAgICAgICog7ZWY64KY7J2YIOyDge2SiChQcm9kdWN0IElkKeyXkCDsmLXshZgg7ZWY64KY7ZWY64KYKENhcnQgSXRlbSBJZCnrpbwg64Sj6riwIOychO2VtFxuICAgICAgICAqICovXG4gICAgICAgIGxldCBwcm9kdWN0Q2FydDogYW55ID0gY2FydEl0ZW1zLnJlZHVjZSgocmVzdWx0LCBjYXJ0SXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IGNhcnRJdGVtLnByb2R1Y3Q7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdEluZm8gPSBtZW1vUHJvZHVjdHNbcHJvZHVjdElkXTtcbiAgICAgICAgICBjb25zdCB0b3RhbFByb2R1Y3RQcmljZSA9IGNhcnRJdGVtLnF1YW50aXR5ICogcHJvZHVjdEluZm8ucHJpY2U7XG5cbiAgICAgICAgICAvKiDsubTtirgg7JWE7J207YWc7JeQIOuMgO2VnCDrqZTrqqjsoJzsnbTshZgg7KCA7J6lICovXG4gICAgICAgICAgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tjYXJ0SXRlbS5faWRdID0ge1xuICAgICAgICAgICAgLi4uY2FydEl0ZW0sXG4gICAgICAgICAgICBwcm9kdWN0OiBwcm9kdWN0SW5mb1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eShwcm9kdWN0SWQpKSB7XG4gICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS50b3RhbFByaWNlICs9IHRvdGFsUHJvZHVjdFByaWNlO1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdKXtcbiAgICAgICAgICAgICAgLy8g6rCZ7J2AIOyYteyFmOydtCDsnojripTqsr3smrAsXG4gICAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLm9wdGlvbnNbY2FydEl0ZW0uX2lkXS5xdWFudGl0eSArPSBjYXJ0SXRlbS5xdWFudGl0eTtcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdLnF1YW50aXR5ICs9IHRvdGFsUHJvZHVjdFByaWNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0ge1xuICAgICAgICAgICAgICAgIGNhcnRJdGVtSWQ6IGNhcnRJdGVtLl9pZCxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2FydEl0ZW0ub3B0aW9ucy5jb2xvcixcbiAgICAgICAgICAgICAgICBzaXplOiBjYXJ0SXRlbS5vcHRpb25zLnNpemUsXG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6IGNhcnRJdGVtLnF1YW50aXR5LFxuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2U6IHRvdGFsUHJvZHVjdFByaWNlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLm9wdGlvbnNbY2FydEl0ZW0uX2lkXSA9IG9wdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qge3dob2xlc2FsZToge25hbWUsIGJ1aWxkaW5nLCBmbG9vciwgc2VjdGlvbn19ID0gcHJvZHVjdEluZm87XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB7XG4gICAgICAgICAgICAgIGNhcnRJdGVtSWQ6IGNhcnRJdGVtLl9pZCxcbiAgICAgICAgICAgICAgY29sb3I6IGNhcnRJdGVtLm9wdGlvbnMuY29sb3IsXG4gICAgICAgICAgICAgIHNpemU6IGNhcnRJdGVtLm9wdGlvbnMuc2l6ZSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IGNhcnRJdGVtLnF1YW50aXR5LFxuICAgICAgICAgICAgICBwcmljZTogcHJvZHVjdEluZm8ucHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsUHJpY2U6IHRvdGFsUHJvZHVjdFByaWNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogY2FydEl0ZW0ucHJvZHVjdE5hbWUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgd2hvbGVzYWxlTmFtZTogYCR7bmFtZX0oJHtidWlsZGluZ30gJHtmbG9vcn3suLUgJHtzZWN0aW9ufSlgLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgW2NhcnRJdGVtLl9pZF06IG9wdGlvblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpbWFnZVBhdGg6IHByb2R1Y3RJbmZvLmltZ1BhdGhzWzBdLFxuICAgICAgICAgICAgICBwcmljZTogcHJvZHVjdEluZm8ucHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsUHJpY2U6IHRvdGFsUHJvZHVjdFByaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuXG4gICAgICAgIHByb2R1Y3RDYXJ0ID0gT2JqZWN0LnZhbHVlcyhwcm9kdWN0Q2FydCkubWFwKChjYXJ0SXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgY2FydEl0ZW0ub3B0aW9ucyA9IE9iamVjdC52YWx1ZXMoY2FydEl0ZW0ub3B0aW9ucyk7XG4gICAgICAgICAgcmV0dXJuIGNhcnRJdGVtO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzID0gcHJvZHVjdENhcnQ7XG4gICAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQgPSBwcm9kdWN0cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF1dGhFeGNlbENhcnQoKTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUoXG4gICAgICAoY3VzdG9tQ2FydEluZm8pID0+IHtcbiAgICAgICAgdGhpcy5fY3VzdG9tQ2FydElkID0gY3VzdG9tQ2FydEluZm8uX2lkO1xuICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2VscyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zO1xuICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5jYXJ0SW5mby50b3RhbENudCA9IHRoaXMuY2FydEluZm8uZXhjZWxzQ250ICsgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudDtcbiAgICAgICAgdGhpcy5fc3RlcCA9IHRoaXMuY2FydEluZm8udG90YWxDbnQgPiAwID8gJ2NhcnQnIDogJ2VtcHR5JztcblxuICAgICAgICAvKiDsl5HshYAg7KO866y4KEN1c3RvbUNhcnQpIOuplOuqqOygnOydtOyFmCDsg53shLEgKi9cbiAgICAgICAgdGhpcy5fbWVtb0V4Y2Vsc0luZm8gPSBjdXN0b21DYXJ0SW5mby5pdGVtcy5yZWR1Y2UoKHJlc3VsdDogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICByZXN1bHRbaXRlbS5faWRdID0gaXRlbTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS5zdG9wKCk7XG4gICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQodGhpcy5jYXJ0SW5mbyk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsg4Htkogg7KCV67O066W8IOqwgOyguOyYpOuKlOuNsCDsi6TtjKjtlZjsmIDsirXri4jri6QuJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9zdGVwID0gJ2Vycm9yJztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZVByb2R1Y3RJbkNhcnQoKSB7XG4gICAgY29uc3QgaXRlbXM6IGFueVtdID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcykubWFwKChpZCkgPT4ge1xuICAgICAgY29uc3QgY2FydEl0ZW0gPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3Q6IGNhcnRJdGVtLnByb2R1Y3QuaWQsXG4gICAgICAgIG9wdGlvbnM6IGNhcnRJdGVtLm9wdGlvbnMsXG4gICAgICAgIHF1YW50aXR5OiBjYXJ0SXRlbS5xdWFudGl0eVxuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICB0aGlzLnN1YnRyYWN0Q2FydChpdGVtcykuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIDEuIG1lbW9DYXJ0SXRlbXPsnZgg7IOB7ZKIIOyVhOydtOuUlCDtgqQg6rCSIOyCreygnFxuICAgICAgICAgIC8vIDIuIHNlbGVjdGVkQ2FydHMg7LSI6riw7ZmUXG4gICAgICAgICAgLy8gMy4gcHJvZHVjdENhcnRzIOyCreygnFxuICAgICAgICAgIC8vIDQuIHByb2R1Y3RDbnQsIHRvdGFsQ250IOyXheuNsOydtO2KuFxuICAgICAgICAgIC8vIDUgY2FydEluZm8gbmV4dFxuICAgICAgICAgIHRoaXMuY2xlYW5Qcm9kdWN0Q2FydCgpO1xuICAgICAgICB9LFxuICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cblxuICBkZWxldGVQcm9kdWN0T3B0aW9uKGhhc09uZU9wdGlvbjogYm9vbGVhbiwgY2FydEl0ZW1JZDogc3RyaW5nKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvZHVjdE5hbWUsXG4gICAgICBvcHRpb25zLFxuICAgICAgcHJvZHVjdDogeyBpZDogcHJvZHVjdH0sXG4gICAgICBxdWFudGl0eSxcbiAgICAgIF9pZFxuICAgIH0gPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2NhcnRJdGVtSWRdO1xuXG4gICAgY29uc3QgY2FydEl0ZW0gPSB7XG4gICAgICBfaWQsXG4gICAgICBwcm9kdWN0TmFtZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBxdWFudGl0eSxcbiAgICAgIHByb2R1Y3RcbiAgICB9O1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY2FydElkLFxuICAgICAgaXRlbXM6IFtjYXJ0SXRlbV1cbiAgICB9XG5cbiAgICBpZiAoaGFzT25lT3B0aW9uKSB7XG4gICAgICAvLyDsg4HtkojsnYQg7IKt7KCc7ZWc64ukLlxuICAgICAgdGhpcy5zdWJ0cmFjdENhcnQoW2NhcnRJdGVtXSkuc3Vic2NyaWJlKFxuICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5Qcm9kdWN0Q2FydCgpO1xuICAgICAgICAgIH0sXG4gICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDsmLXshZjrp4wg7IKt7KCc7ZWc64ukLlxuICAgICAgdGhpcy5zdWJ0cmFjdENhcnQoW2NhcnRJdGVtXSkuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHMuZmluZEluZGV4KChjYXJ0OiBhbnkpID0+IGNhcnQucHJvZHVjdElkID09PSBwcm9kdWN0KTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RDYXJ0ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0c1tpbmRleF0gYXMgYW55O1xuICAgICAgICAgICAgY29uc3Qgb0luZGV4ID0gcHJvZHVjdENhcnQub3B0aW9ucy5maW5kSW5kZXgoKG9wdGlvbjogYW55KSA9PiBvcHRpb24uY2FydEl0ZW1JZCA9PT0gY2FydEl0ZW1JZCk7XG4gICAgICAgICAgICBjb25zdCB7IHRvdGFsUHJpY2UsIHF1YW50aXR5OiBwY3MgfSA9IHByb2R1Y3RDYXJ0Lm9wdGlvbnNbb0luZGV4XTtcblxuICAgICAgICAgICAgcHJvZHVjdENhcnQub3B0aW9ucy5zcGxpY2Uob0luZGV4LCAxKTtcblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bY2FydEl0ZW1JZF07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzW2NhcnRJdGVtSWRdKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLnRvdGFsUHJpY2UgLT0gdG90YWxQcmljZTtcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8ucGNzIC09IHBjcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsmLXshZgg7IKt7KCc7JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcbiAgICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgZGVsZXRlRXhjZWxDYXJ0KCkge1xuICAgIGNvbnN0IG1lbW8gID0gey4uLnRoaXMuX21lbW9FeGNlbHNJbmZvfTtcbiAgICBjb25zdCBpZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8uaWRzKTtcblxuICAgIGZvcihsZXQgaT0wOyBpPGlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaWQgPSBpZHNbaV07XG4gICAgICBpZih0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8uaWRzW2lkXSkge1xuICAgICAgICBkZWxldGUgbWVtb1tpZF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdG9EZWxldGVJdGVtcyA9IE9iamVjdC52YWx1ZXMobWVtbyk7XG5cbiAgICB0aGlzLnB1dEV4Y2VsQ2FydCh0b0RlbGV0ZUl0ZW1zKS5zdWJzY3JpYmUoXG4gICAgICAoY3VzdG9tQ2FydEluZm8pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tQ2FydElkID0gY3VzdG9tQ2FydEluZm8uX2lkO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2VscyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SW5mby50b3RhbENudCA9IHRoaXMuY2FydEluZm8uZXhjZWxzQ250ICsgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudDtcblxuICAgICAgICAgICAgICB0aGlzLl9tZW1vRXhjZWxzSW5mbyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zLnJlZHVjZSgocmVzdWx0OiBhbnksIGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpdGVtLl9pZF0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgICB0aGlzLl9zdGVwID0gdGhpcy5jYXJ0SW5mby50b3RhbENudCA+IDAgPyAnY2FydCcgOiAnZW1wdHknO1xuXG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mbyA9IHtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgICAgICAgICAgIG5vUHJpY2VOdW06IDAsXG4gICAgICAgICAgICAgICAgbnVtOiAwLFxuICAgICAgICAgICAgICAgIHBjczogMCxcbiAgICAgICAgICAgICAgICBpZHM6IHt9XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyXkeyFgCDsg4Htkogg7IKt7KCc7JeQIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIG9yZGVyVG9TdG9yZShwaG9uZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaWRzSW5DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKTtcbiAgICBjb25zdCBpZHNJbkN1c3RvbUNhcnRJdGVtcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHMpLmZpbHRlcigoaWQpID0+ICEhdGhpcy5fbWVtb0V4Y2Vsc0luZm9baWRdLnF1YW50aXR5KTtcbiAgICBjb25zdCBjYXJ0SXRlbXMgPSBpZHNJbkNhcnRJdGVtcy5tYXAoKGlkKSA9PiB7XG4gICAgICBjb25zdCB7b3B0aW9ucywgcHJvZHVjdCwgcHJvZHVjdE5hbWUsIHF1YW50aXR5fSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2hvbGVzYWxlTmFtZTogcHJvZHVjdC53aG9sZXNhbGUubmFtZSxcbiAgICAgICAgd2hvbGVzYWxlOiB7XG4gICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgaWQ6IHByb2R1Y3Qud2hvbGVzYWxlU3RvcmVJZCxcbiAgICAgICAgICBuYW1lOiBwcm9kdWN0Lndob2xlc2FsZS5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkaW5nOiBwcm9kdWN0Lndob2xlc2FsZS5idWlsZGluZyxcbiAgICAgICAgZmxvb3I6IHByb2R1Y3Qud2hvbGVzYWxlLmZsb29yLFxuICAgICAgICByb29tOiBwcm9kdWN0Lndob2xlc2FsZS5zZWN0aW9uLFxuICAgICAgICBhZGRyZXNzOiBgJHtwcm9kdWN0Lndob2xlc2FsZS5idWlsZGluZ30sICR7cHJvZHVjdC53aG9sZXNhbGUuZmxvb3J9LCAke3Byb2R1Y3Qud2hvbGVzYWxlLnNlY3Rpb259YCxcbiAgICAgICAgcGhvbmU6IHByb2R1Y3Qud2hvbGVzYWxlLnBob25lLFxuICAgICAgICBwcm9kdWN0TmFtZTogcHJvZHVjdE5hbWUsXG4gICAgICAgIGNvbG9yOiBvcHRpb25zLmNvbG9yLFxuICAgICAgICBzaXplOiBvcHRpb25zLnNpemUsXG4gICAgICAgIG9wdGlvbnM6IGAke29wdGlvbnMuY29sb3J9IC8gJHtvcHRpb25zLnNpemV9IC8gJHtxdWFudGl0eX3qsJxgLFxuICAgICAgICBwcmljZTogYCR7cHJvZHVjdC5wcmljZX1gLFxuICAgICAgICBxdWFudGl0eTogYCR7cXVhbnRpdHl9YFxuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmb3JrSm9pbih0aGlzLmNyZWF0ZUN1c3RvbU9yZGVyVXNpbmdDYXJ0SXRlbXMoY2FydEl0ZW1zLCBwaG9uZSksIHRoaXMuY3JlYXRlQ3VzdG9tQ2FydE9yZGVyKGlkc0luQ3VzdG9tQ2FydEl0ZW1zLCBwaG9uZSkpLnN1YnNjcmliZShcbiAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFuUHJvZHVjdENhcnQoKTtcblxuICAgICAgICAvKlxuICAgICAgICAqIOunpOyepSDso7zrrLgg7ZuELCDsg53shLHrkJwg7KO866y4IOuNsOydtO2EsOulvCDsoIDsnqXtlZjquLAg7JyE7ZW0XG4gICAgICAgICogKi9cbiAgICAgICAgdGhpcy5jb21wbGV0ZWRPcmRlckluQ2FydCA9IHtcbiAgICAgICAgICBjYXJ0T3JkZXJzOiB0aGlzLmNvbXBsZXRlZENhcnRJdGVtc09yZGVyIHx8IG51bGwsXG4gICAgICAgICAgY3VzdG9tT3JkZXJzOiByZXNwb25zZVsxXSB8fCBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc3RlcCA9ICdjb21wbGV0ZS1zdG9yZS1vcmRlcic7XG4gICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g66ek7J6lIOyjvOusuOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDdXN0b21DYXJ0T3JkZXIoaXRlbXM6IGFueVtdLCBwaG9uZTogc3RyaW5nKSB7XG4gICAgaWYoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gb2YobnVsbCk7XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBjdXN0b21lcjogdGhpcy5fY3VzdG9tZXJJZCxcbiAgICAgIHR5cGU6ICdnZW5lcmFsJyxcbiAgICAgIHVuY2xlUGhvbmU6IHBob25lLFxuICAgICAgaXRlbXNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fY2FydC9jaGVja291dCcsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cblxuICBwcml2YXRlIGNyZWF0ZUN1c3RvbU9yZGVyVXNpbmdDYXJ0SXRlbXMoaXRlbXM6IGFueVtdLCBwaG9uZTogc3RyaW5nKSB7XG4gICAgaWYoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gb2YobnVsbCk7XG5cbiAgICBjb25zdCBpZHNJbkNhcnRJdGVtcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHMpO1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBfaWQ6IHRoaXMuX2N1c3RvbUNhcnRJZCxcbiAgICAgIGN1c3RvbWVyOiB0aGlzLl9jdXN0b21lcklkLFxuICAgICAgdHlwZTogJ2dlbmVyYWwnLFxuICAgICAgdW5jbGVQaG9uZTogcGhvbmUsXG4gICAgICBpdGVtc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9vcmRlci8nLCB7XG4gICAgICBib2R5OiB7XG4gICAgICAgIC4uLmJvZHksXG4gICAgICAgIGl0ZW1zXG4gICAgICB9XG4gICAgfSkucGlwZShcbiAgICAgIG1lcmdlTWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGlkc0luQ2FydEl0ZW1zLm1hcCgoaWQpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF0sXG4gICAgICAgICAgICBwcm9kdWN0OiB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXS5wcm9kdWN0LmlkXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbXBsZXRlZENhcnRJdGVtc09yZGVyID0gcmVzcG9uc2U7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY2FydC9zdWJ0cmFjdCcsIHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBfaWQ6IHRoaXMuX2NhcnRJZCxcbiAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBhZGRBZGRyZXNzKGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcycsIHtcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9KS5waXBlKFxuICAgICAgbWVyZ2VNYXAoKHthZGRyZXNzZXM6IHtzZWNvbmRhcmllc319OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qge19pZH0gPSBzZWNvbmRhcmllcy5zbGljZSgtMSlbMF07XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy9wcmltYXJ5Jywge1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIF9pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICB1cGRhdGVBZGRyZXNzKGlkOiBzdHJpbmcsIGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBVVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzJywge1xuICAgICAgYm9keToge1xuICAgICAgICBhZGRyZXNzSWQ6IGlkLFxuICAgICAgICAuLi5ib2R5XG4gICAgICB9LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUFkZHJlc3MoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLkRFTEVURSggYGh0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy8ke2lkfWAsXG4gICAgICB7IGhhbmRsZUVycm9yOiB0cnVlfSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgodXNlckluZm8pID0+IHtcbiAgICAgICAgY29uc3QgeyBzZWNvbmRhcmllcyB9ID0gdXNlckluZm8uYWRkcmVzc2VzO1xuICAgICAgICBpZiAoc2Vjb25kYXJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGxhc3RJZCA9IHNlY29uZGFyaWVzLnNsaWNlKC0xKVswXS5faWQ7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0UHJpbWFyeUFkZHJlc3MobGFzdElkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2YodXNlckluZm8pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cblxuICBzZXRQcmltYXJ5QWRkcmVzcyhpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tZXIvYXV0aC9hZGRyZXNzL3ByaW1hcnknLCB7XG4gICAgICBib2R5OiB7XG4gICAgICAgIF9pZDogaWRcbiAgICAgIH0sXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhblByb2R1Y3RDYXJ0KCkge1xuICAgIGNvbnN0IGRlbGV0ZWRJZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKTtcblxuICAgIGZvcihsZXQgaT0wOyBpIDwgZGVsZXRlZElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGVsZXRlZENhcnRJZCA9IGRlbGV0ZWRJZHNbaV07XG4gICAgICBjb25zdCBkZWxldGVkUHJvZHVjdElkOiBhbnkgPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2RlbGV0ZWRDYXJ0SWRdLnByb2R1Y3QuaWQ7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHMuZmluZEluZGV4KChpdGVtOiBhbnkpID0+IGl0ZW0ucHJvZHVjdElkID09PSBkZWxldGVkUHJvZHVjdElkKTtcblxuICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZGVsZXRlIHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bZGVsZXRlZENhcnRJZF07XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8gPSAge1xuICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgIG51bTogMCxcbiAgICAgIHBjczogMCxcbiAgICAgIGNhcnRJZHM6IHt9LFxuICAgICAgcHJvZHVjdElkczoge31cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5sZW5ndGg7XG4gICAgdGhpcy5jYXJ0SW5mby50b3RhbENudCA9IHRoaXMuY2FydEluZm8uZXhjZWxzQ250ICsgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudDtcbiAgICB0aGlzLl9zdGVwID0gdGhpcy5jYXJ0SW5mby50b3RhbENudCA+IDAgPyAnY2FydCcgOiAnZW1wdHknO1xuICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcbiAgfVxufVxuIl19