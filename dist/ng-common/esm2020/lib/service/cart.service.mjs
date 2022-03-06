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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTbEMsTUFBTSxPQUFPLFdBQVc7SUE4Q3RCLFlBQ1UsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsY0FBOEI7UUFGOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBL0N4QyxhQUFRLEdBQWE7WUFDbkIsUUFBUSxFQUFFLEVBQUU7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFFRDs7Ozs7Ozs7O1lBU0k7UUFDSSxVQUFLLEdBQXNHLFNBQVMsQ0FBQztRQUtySCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQXlCO1lBQ3BELFVBQVUsRUFBRSxDQUFDO1lBQ2IsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ00sd0JBQW1CLEdBQXVCO1lBQ2hELFVBQVUsRUFBRSxDQUFDO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FB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QUM7WUFDeEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMscUJBQXFCLEdBQUk7WUFDNUIsVUFBVSxFQUFFLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDN0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDOzt3R0EvbEJVLFdBQVc7NEdBQVgsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEaWFsb2dTZXJ2aWNlLCBMb2FkaW5nU2VydmljZSwgUmVzdFNlcnZpY2V9IGZyb20gJ0Bnb2xsYWxhL25nLWNvbW1vbic7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY2F0Y2hFcnJvciwgbWVyZ2VNYXAsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmb3JrSm9pbiwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1xuICBDYXJ0SW5mbywgQ2FydEl0ZW0sIFNlbGVjdGVkRXhjZWxzSW5mbywgU2VsZWN0ZWRQcm9kdWN0c0luZm9cbn0gZnJvbSBcIi4uL2ludGVyZmFjZS9jYXJ0Lm1vZGVsXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhcnRTZXJ2aWNlIHtcblxuICBjYXJ0SW5mbzogQ2FydEluZm8gPSB7XG4gICAgcHJvZHVjdHM6IFtdLFxuICAgIGV4Y2VsczogW10sXG4gICAgcHJvZHVjdHNDbnQ6IDAsXG4gICAgZXhjZWxzQ250OiAwLFxuICAgIHRvdGFsQ250OiAwXG4gIH1cblxuICAvKlxuICAqIOy5tO2KuCDqsrDsoJwg64uo6rOEXG4gICogcGVuZGluZzog642w7J207YSwIOu2iOufrOyYpOuKlCDspJFcbiAgKiBjYXJ0OiDrjbDsnbTthLDqsIAgMeqwnCDsnbTsg4Eg67CPIOy5tO2KuCDtjpjsnbTsp4Dsl5Ag7J6I7J2EIOuVjFxuICAqIGVtcHR5OiDrjbDsnbTthLDqsIAg7ZWcIOqwnOuPhCDsl4bsnYQg65aEXG4gICogZXJyb3I6IOuNsOydtO2EsOulvCDqsIDsoLjsmKTripTrjbAg7JeQ65+s6rCAIOuCrOydhCDqsr3smrBcbiAgKiBwYXltZW50OiDsm5DsiqTthrEg6rKw7KCcIOyEoO2DnSDtm4Qg6rKw7KCcIO2OmOydtOyngOyXkCDsnojripQg6rK97JqwXG4gICogY29tcGxldGUtc3RvcmUtb3JkZXI6IOunpOyepSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAqIGNvbXBsZXRlLW9uZS1zdG9wOiDsm5DsiqTthrEg7KO866y47J2EIOyZhOujjO2WiOydhCDqsr3smrBcbiAgKiAqL1xuICBwcml2YXRlIF9zdGVwOiAncGVuZGluZycgfCAnY2FydCcgfCAnZW1wdHknIHwgJ2Vycm9yJyB8ICdwYXltZW50JyB8ICdjb21wbGV0ZS1zdG9yZS1vcmRlcicgfCAnY29tcGxldGUtb25lLXN0b3AnID0gJ3BlbmRpbmcnO1xuXG4gIHByaXZhdGUgX2N1c3RvbUNhcnRJZCE6IHN0cmluZztcbiAgcHJpdmF0ZSBfY2FydElkITogc3RyaW5nO1xuICBwcml2YXRlIF9jdXN0b21lcklkITogc3RyaW5nO1xuICBwcml2YXRlIF9tZW1vRXhjZWxzSW5mbzogYW55ID0ge307XG4gIHByaXZhdGUgX21lbW9Qcm9kdWN0c0luZm86IGFueSA9IHt9O1xuICBwcml2YXRlIF9zZWxlY3RlZFByb2R1Y3RzSW5mbzogU2VsZWN0ZWRQcm9kdWN0c0luZm8gPSB7XG4gICAgdG90YWxQcmljZTogMCxcbiAgICBudW06IDAsXG4gICAgcGNzOiAwLFxuICAgIGNhcnRJZHM6IHt9LFxuICAgIHByb2R1Y3RJZHM6IHt9XG4gIH07XG4gIHByaXZhdGUgX3NlbGVjdGVkRXhjZWxzSW5mbzogU2VsZWN0ZWRFeGNlbHNJbmZvID0ge1xuICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgbm9QcmljZU51bTogMCxcbiAgICBudW06IDAsXG4gICAgcGNzOiAwLFxuICAgIGlkczoge31cbiAgfTtcblxuICBjYXJ0SW5mbyQgPSAgbmV3IEJlaGF2aW9yU3ViamVjdDxDYXJ0SW5mbz4odGhpcy5jYXJ0SW5mbyk7XG4gIGNvbXBsZXRlZENhcnRJdGVtc09yZGVyOiBhbnkgPSBudWxsO1xuICBjb21wbGV0ZWRPcmRlckluQ2FydDogYW55ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc3RTZXJ2aWNlOiBSZXN0U2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgKSB7IH1cblxuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG4gIGdldCBtZW1vRXhjZWxzSW5mbygpIHtcbiAgICAvKlxuICAgICog7YKkW2N1c3RvbSBjYXJ0IGl0ZW0gaWRdOiDsl5HshYAg7JWE7J207YWcIOygleuztOulvCDri7Tqs6Ag7J6I7J2MXG4gICAgKiAqL1xuICAgIHJldHVybiB0aGlzLl9tZW1vRXhjZWxzSW5mbztcbiAgfVxuXG4gIGdldCBtZW1vUHJvZHVjdHNJbmZvKCkge1xuICAgIC8qXG4gICAgKiDtgqRbY2FydCBpdGVtIGlkXTog7IOB7ZKIIOyVhOydtO2FnCDsoJXrs7Trpbwg64u06rOgIOyeiOydjFxuICAgICogKi9cbiAgICByZXR1cm4gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mbztcbiAgfVxuXG4gIGdldCBzZWxlY3RlZFByb2R1Y3RzSW5mbygpIHtcbiAgICAvKlxuICAgICog7ISg7YOd65CcIOy5tO2KuOuTpOydmCDsoJXrs7Trpbwg66as7YS07ZWc64ukLlxuICAgICogKi9cbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm87XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRFeGNlbHNJbmZvICgpIHtcbiAgICAvKlxuICAgICog7ISg7YOd65CcIOyXkeyFgOydmCDsoJXrs7Trpbwg66as7YS07ZWc64ukLlxuICAgICogKi9cbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRFeGNlbHNJbmZvO1xuICB9XG5cblxuICBhZGRDYXJ0KGl0ZW1zOiBDYXJ0SXRlbVtdKTogT2JzZXJ2YWJsZTx7X2lkOiBzdHJpbmc7IGl0ZW1zOiBDYXJ0SXRlbVtdfT4ge1xuICAgIC8qXG4gICAgKiDsubTtirjsl5Ag7IOB7ZKIIOy2lOqwgCAo7ZSE66Gc642V7Yq4IOyDge2SiOunjCwg7JeR7IWAIOyDge2SiOydgCDstpTqsIAg66q77ZWoKVxuICAgICogKi9cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICBpdGVtc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vZGV2LWNvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jYXJ0L2FkZCcsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgc3VidHJhY3RDYXJ0KGl0ZW1zOiBDYXJ0SXRlbVtdKTogT2JzZXJ2YWJsZTx7X2lkOiBzdHJpbmc7IGl0ZW1zOiBDYXJ0SXRlbVtdfT4gIHtcbiAgICAvKlxuICAgICog7Lm07Yq47JeQIOyDge2SiCDrurTquLAgKO2UhOuhnOuNle2KuCDsg4Htkojrp4wsIOyXkeyFgCDsg4HtkojsnYAg7LaU6rCAIOuqu+2VqClcbiAgICAqICovXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY2FydElkLFxuICAgICAgaXRlbXNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2Rldi1jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY2FydC9zdWJ0cmFjdCcsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgc2V0U3RlcCh2YWx1ZTogJ3BlbmRpbmcnIHwgJ2NhcnQnIHwgJ2VtcHR5JyB8ICdlcnJvcicgfCAncGF5bWVudCcgfCAnY29tcGxldGUtc3RvcmUtb3JkZXInIHwgJ2NvbXBsZXRlLW9uZS1zdG9wJyk6IHZvaWQge1xuICAgIC8qXG4gICAgICAqIOy5tO2KuCDqsrDsoJwg64uo6rOEXG4gICAgICAqIHBlbmRpbmc6IOuNsOydtO2EsCDrtojrn6zsmKTripQg7KSRXG4gICAgICAqIGNhcnQ6IOuNsOydtO2EsOqwgCAx6rCcIOydtOyDgSDrsI8g7Lm07Yq4IO2OmOydtOyngOyXkCDsnojsnYQg65WMXG4gICAgICAqIGVtcHR5OiDrjbDsnbTthLDqsIAg7ZWcIOqwnOuPhCDsl4bsnYQg65aEXG4gICAgICAqIGVycm9yOiDrjbDsnbTthLDrpbwg6rCA7KC47Jik64qU642wIOyXkOufrOqwgCDrgqzsnYQg6rK97JqwXG4gICAgICAqIHBheW1lbnQ6IOybkOyKpO2GsSDqsrDsoJwg7ISg7YOdIO2bhCDqsrDsoJwg7Y6Y7J207KeA7JeQIOyeiOuKlCDqsr3smrBcbiAgICAgICogY29tcGxldGUtc3RvcmUtb3JkZXI6IOunpOyepSDso7zrrLjsnYQg7JmE66OM7ZaI7J2EIOqyveyasFxuICAgICAgKiBjb21wbGV0ZS1vbmUtc3RvcDog7JuQ7Iqk7YaxIOyjvOusuOydhCDsmYTro4ztlojsnYQg6rK97JqwXG4gICAgKiAqL1xuXG4gICAgdGhpcy5fc3RlcCA9IHZhbHVlO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RlZFByb2R1Y3RzSW5mbyAoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8gPSB7XG4gICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgbnVtOiAwLFxuICAgICAgcGNzOiAwLFxuICAgICAgY2FydElkczoge30sXG4gICAgICBwcm9kdWN0SWRzOiB7fVxuICAgIH07XG4gIH1cblxuICByZXNldFNlbGVjdGVkRXhjZWxJbmZvICgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8gPSB7XG4gICAgICB0b3RhbFByaWNlOiAwLFxuICAgICAgbm9QcmljZU51bTogMCxcbiAgICAgIG51bTogMCxcbiAgICAgIHBjczogMCxcbiAgICAgIGlkczoge31cbiAgICB9XG4gIH1cblxuICBnZXRBdXRoQ2FydCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvY2FydCcsIHtoYW5kbGVFcnJvcjogdHJ1ZX0pO1xuICB9XG5cbiAgZ2V0QXV0aEV4Y2VsQ2FydCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5HRVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0L2F1dGgvbWUnLCB7aGFuZGxlRXJyb3I6IHRydWV9KVxuICB9XG5cbiAgcmVxdWVzdFByb2R1Y3RMaXN0KGlkczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBib2R5ID0ge2lkc307XG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnL2FwaS9wcm9kdWN0L2JvL3Byb2R1Y3RMaXN0QnlJZHMnLCB7Ym9keSwgaGFuZGxlRXJyb3I6IHRydWV9KTtcbiAgfVxuXG4gIHB1dEV4Y2VsQ2FydChpdGVtczogYW55W10pIHtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBpdGVtc1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QVVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbV9jYXJ0LycsIHtcbiAgICAgIGJvZHksXG4gICAgICBoYW5kbGVFcnJvcjogdHJ1ZVxuICAgIH0pXG4gIH1cblxuXG4gIGdldENhcnRJbmZvKCkge1xuICAgIGxldCBjYXJ0SXRlbXM6YW55W10gPSBbXTtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnN0YXJ0KCk7XG4gICAgdGhpcy5fc3RlcCA9ICdwZW5kaW5nJztcbiAgICB0aGlzLmNvbXBsZXRlZE9yZGVySW5DYXJ0ID0gbnVsbDtcblxuICAgIHRoaXMuZ2V0QXV0aENhcnQoKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZSk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKGNhcnREb2MgPT4ge1xuICAgICAgICBjYXJ0SXRlbXMgPSBjYXJ0RG9jLml0ZW1zO1xuICAgICAgICB0aGlzLl9jdXN0b21lcklkID0gY2FydERvYy5jdXN0b21lcjtcbiAgICAgICAgdGhpcy5fY2FydElkID0gY2FydERvYy5faWQ7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZHMgPSBjYXJ0RG9jLml0ZW1zLm1hcCgoY2FydEl0ZW06IHsgcHJvZHVjdDogYW55OyB9KSA9PiBjYXJ0SXRlbS5wcm9kdWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0UHJvZHVjdExpc3QocHJvZHVjdElkcyk7XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKHByb2R1Y3RzID0+IHtcbiAgICAgICAgLy8g67Cb7JWE7JioIHByb2R1Y3RzIOuwsOyXtOydhCDqsJ3ssrTtmZRcbiAgICAgICAgY29uc3QgbWVtb1Byb2R1Y3RzID0gcHJvZHVjdHMucmVkdWNlKChyZXN1bHQ6IGFueSwgcHJvZHVjdDogYW55KSA9PiB7XG4gICAgICAgICAgcmVzdWx0W3Byb2R1Y3QuaWRdID0gcHJvZHVjdDtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgLypcbiAgICAgICAgKiDtlZjrgpjsnZgg7IOB7ZKIKFByb2R1Y3QgSWQp7JeQIOyYteyFmCDtlZjrgpjtlZjrgpgoQ2FydCBJdGVtIElkKeulvCDrhKPquLAg7JyE7ZW0XG4gICAgICAgICogKi9cbiAgICAgICAgbGV0IHByb2R1Y3RDYXJ0OiBhbnkgPSBjYXJ0SXRlbXMucmVkdWNlKChyZXN1bHQsIGNhcnRJdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gY2FydEl0ZW0ucHJvZHVjdDtcbiAgICAgICAgICBjb25zdCBwcm9kdWN0SW5mbyA9IG1lbW9Qcm9kdWN0c1twcm9kdWN0SWRdO1xuICAgICAgICAgIGNvbnN0IHRvdGFsUHJvZHVjdFByaWNlID0gY2FydEl0ZW0ucXVhbnRpdHkgKiBwcm9kdWN0SW5mby5wcmljZTtcblxuICAgICAgICAgIC8qIOy5tO2KuCDslYTsnbTthZzsl5Ag64yA7ZWcIOuplOuqqOygnOydtOyFmCDsoIDsnqUgKi9cbiAgICAgICAgICB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2NhcnRJdGVtLl9pZF0gPSB7XG4gICAgICAgICAgICAuLi5jYXJ0SXRlbSxcbiAgICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3RJbmZvXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYocmVzdWx0Lmhhc093blByb3BlcnR5KHByb2R1Y3RJZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdLnRvdGFsUHJpY2UgKz0gdG90YWxQcm9kdWN0UHJpY2U7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0pe1xuICAgICAgICAgICAgICAvLyDqsJnsnYAg7Ji17IWY7J20IOyeiOuKlOqyveyasCxcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdLnF1YW50aXR5ICs9IGNhcnRJdGVtLnF1YW50aXR5O1xuICAgICAgICAgICAgICByZXN1bHRbcHJvZHVjdElkXS5vcHRpb25zW2NhcnRJdGVtLl9pZF0ucXVhbnRpdHkgKz0gdG90YWxQcm9kdWN0UHJpY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgY2FydEl0ZW1JZDogY2FydEl0ZW0uX2lkLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYXJ0SXRlbS5vcHRpb25zLmNvbG9yLFxuICAgICAgICAgICAgICAgIHNpemU6IGNhcnRJdGVtLm9wdGlvbnMuc2l6ZSxcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmVzdWx0W3Byb2R1Y3RJZF0ub3B0aW9uc1tjYXJ0SXRlbS5faWRdID0gb3B0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7d2hvbGVzYWxlOiB7bmFtZSwgYnVpbGRpbmcsIGZsb29yLCBzZWN0aW9ufX0gPSBwcm9kdWN0SW5mbztcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgY2FydEl0ZW1JZDogY2FydEl0ZW0uX2lkLFxuICAgICAgICAgICAgICBjb2xvcjogY2FydEl0ZW0ub3B0aW9ucy5jb2xvcixcbiAgICAgICAgICAgICAgc2l6ZTogY2FydEl0ZW0ub3B0aW9ucy5zaXplLFxuICAgICAgICAgICAgICBxdWFudGl0eTogY2FydEl0ZW0ucXVhbnRpdHksXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcbiAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlc3VsdFtwcm9kdWN0SWRdID0ge1xuICAgICAgICAgICAgICBuYW1lOiBjYXJ0SXRlbS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB3aG9sZXNhbGVOYW1lOiBgJHtuYW1lfSgke2J1aWxkaW5nfSAke2Zsb29yfey4tSAke3NlY3Rpb259KWAsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBbY2FydEl0ZW0uX2lkXTogb3B0aW9uXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGltYWdlUGF0aDogcHJvZHVjdEluZm8uaW1nUGF0aHNbMF0sXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0SW5mby5wcmljZSxcbiAgICAgICAgICAgICAgdG90YWxQcmljZTogdG90YWxQcm9kdWN0UHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgcHJvZHVjdENhcnQgPSBPYmplY3QudmFsdWVzKHByb2R1Y3RDYXJ0KS5tYXAoKGNhcnRJdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICBjYXJ0SXRlbS5vcHRpb25zID0gT2JqZWN0LnZhbHVlcyhjYXJ0SXRlbS5vcHRpb25zKTtcbiAgICAgICAgICByZXR1cm4gY2FydEl0ZW07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHMgPSBwcm9kdWN0Q2FydDtcbiAgICAgICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudCA9IHByb2R1Y3RzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXV0aEV4Y2VsQ2FydCgpO1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZShcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xuICAgICAgICB0aGlzLl9jdXN0b21DYXJ0SWQgPSBjdXN0b21DYXJ0SW5mby5faWQ7XG4gICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzID0gY3VzdG9tQ2FydEluZm8uaXRlbXM7XG4gICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuICAgICAgICB0aGlzLl9zdGVwID0gdGhpcy5jYXJ0SW5mby50b3RhbENudCA+IDAgPyAnY2FydCcgOiAnZW1wdHknO1xuXG4gICAgICAgIC8qIOyXkeyFgCDso7zrrLgoQ3VzdG9tQ2FydCkg66mU66qo7KCc7J207IWYIOyDneyEsSAqL1xuICAgICAgICB0aGlzLl9tZW1vRXhjZWxzSW5mbyA9IGN1c3RvbUNhcnRJbmZvLml0ZW1zLnJlZHVjZSgocmVzdWx0OiBhbnksIGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIHJlc3VsdFtpdGVtLl9pZF0gPSBpdGVtO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnN0b3AoKTtcbiAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh0aGlzLmNhcnRJbmZvKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOyDge2SiCDsoJXrs7Trpbwg6rCA7KC47Jik64qU642wIOyLpO2MqO2VmOyYgOyKteuLiOuLpC4nKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3N0ZXAgPSAnZXJyb3InO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZGVsZXRlUHJvZHVjdEluQ2FydCgpIHtcbiAgICBjb25zdCBpdGVtczogYW55W10gPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKS5tYXAoKGlkKSA9PiB7XG4gICAgICBjb25zdCBjYXJ0SXRlbSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdDogY2FydEl0ZW0ucHJvZHVjdC5pZCxcbiAgICAgICAgb3B0aW9uczogY2FydEl0ZW0ub3B0aW9ucyxcbiAgICAgICAgcXVhbnRpdHk6IGNhcnRJdGVtLnF1YW50aXR5XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIHRoaXMuc3VidHJhY3RDYXJ0KGl0ZW1zKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gMS4gbWVtb0NhcnRJdGVtc+ydmCDsg4Htkogg7JWE7J2065SUIO2CpCDqsJIg7IKt7KCcXG4gICAgICAgICAgLy8gMi4gc2VsZWN0ZWRDYXJ0cyDstIjquLDtmZRcbiAgICAgICAgICAvLyAzLiBwcm9kdWN0Q2FydHMg7IKt7KCcXG4gICAgICAgICAgLy8gNC4gcHJvZHVjdENudCwgdG90YWxDbnQg7JeF642w7J207Yq4XG4gICAgICAgICAgLy8gNSBjYXJ0SW5mbyBuZXh0XG4gICAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG4gICAgICAgIH0sXG4gIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgfVxuXG4gIGRlbGV0ZVByb2R1Y3RPcHRpb24oaGFzT25lT3B0aW9uOiBib29sZWFuLCBjYXJ0SXRlbUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9kdWN0TmFtZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBwcm9kdWN0OiB7IGlkOiBwcm9kdWN0fSxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgX2lkXG4gICAgfSA9IHRoaXMuX21lbW9Qcm9kdWN0c0luZm9bY2FydEl0ZW1JZF07XG5cbiAgICBjb25zdCBjYXJ0SXRlbSA9IHtcbiAgICAgIF9pZCxcbiAgICAgIHByb2R1Y3ROYW1lLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgcHJvZHVjdFxuICAgIH07XG5cbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICBpdGVtczogW2NhcnRJdGVtXVxuICAgIH1cblxuICAgIGlmIChoYXNPbmVPcHRpb24pIHtcbiAgICAgIC8vIOyDge2SiOydhCDsgq3soJztlZzri6QuXG4gICAgICB0aGlzLnN1YnRyYWN0Q2FydChbY2FydEl0ZW1dKS5zdWJzY3JpYmUoXG4gICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG4gICAgICAgICAgfSxcbiAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOyYteyFmOunjCDsgq3soJztlZzri6QuXG4gICAgICB0aGlzLnN1YnRyYWN0Q2FydChbY2FydEl0ZW1dKS5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jYXJ0SW5mby5wcm9kdWN0cy5maW5kSW5kZXgoKGNhcnQ6IGFueSkgPT4gY2FydC5wcm9kdWN0SWQgPT09IHByb2R1Y3QpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdENhcnQgPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzW2luZGV4XSBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBvSW5kZXggPSBwcm9kdWN0Q2FydC5vcHRpb25zLmZpbmRJbmRleCgob3B0aW9uOiBhbnkpID0+IG9wdGlvbi5jYXJ0SXRlbUlkID09PSBjYXJ0SXRlbUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHsgdG90YWxQcmljZSwgcXVhbnRpdHk6IHBjcyB9ID0gcHJvZHVjdENhcnQub3B0aW9uc1tvSW5kZXhdO1xuXG4gICAgICAgICAgICBwcm9kdWN0Q2FydC5vcHRpb25zLnNwbGljZShvSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tjYXJ0SXRlbUlkXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvLmNhcnRJZHNbY2FydEl0ZW1JZF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8udG90YWxQcmljZSAtPSB0b3RhbFByaWNlO1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5wY3MgLT0gcGNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYXJ0SW5mbyQubmV4dCh7Li4udGhpcy5jYXJ0SW5mb30pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgnW+yXkOufrF0g7IOB7ZKIIOyYteyFmCDsgq3soJzsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBkZWxldGVFeGNlbENhcnQoKSB7XG4gICAgY29uc3QgbWVtbyAgPSB7Li4udGhpcy5fbWVtb0V4Y2Vsc0luZm99O1xuICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHMpO1xuXG4gICAgZm9yKGxldCBpPTA7IGk8aWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpZCA9IGlkc1tpXTtcbiAgICAgIGlmKHRoaXMuX3NlbGVjdGVkRXhjZWxzSW5mby5pZHNbaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBtZW1vW2lkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0b0RlbGV0ZUl0ZW1zID0gT2JqZWN0LnZhbHVlcyhtZW1vKTtcblxuICAgIHRoaXMucHV0RXhjZWxDYXJ0KHRvRGVsZXRlSXRlbXMpLnN1YnNjcmliZShcbiAgICAgIChjdXN0b21DYXJ0SW5mbykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXN0b21DYXJ0SWQgPSBjdXN0b21DYXJ0SW5mby5faWQ7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzID0gY3VzdG9tQ2FydEluZm8uaXRlbXM7XG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8uZXhjZWxzQ250ID0gY3VzdG9tQ2FydEluZm8uaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID0gdGhpcy5jYXJ0SW5mby5leGNlbHNDbnQgKyB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzQ250O1xuXG4gICAgICAgICAgICAgIHRoaXMuX21lbW9FeGNlbHNJbmZvID0gY3VzdG9tQ2FydEluZm8uaXRlbXMucmVkdWNlKChyZXN1bHQ6IGFueSwgaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2l0ZW0uX2lkXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB0aGlzLmNhcnRJbmZvLnRvdGFsQ250ID4gMCA/ICdjYXJ0JyA6ICdlbXB0eSc7XG5cbiAgICAgICAgICAgICAgdGhpcy5fbWVtb0V4Y2Vsc0luZm8gPSB7XG4gICAgICAgICAgICAgICAgdG90YWxQcmljZTogMCxcbiAgICAgICAgICAgICAgICBub1ByaWNlTnVtOiAwLFxuICAgICAgICAgICAgICAgIG51bTogMCxcbiAgICAgICAgICAgICAgICBwY3M6IDAsXG4gICAgICAgICAgICAgICAgaWRzOiB7fVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHRoaXMuY2FydEluZm8kLm5leHQoey4uLnRoaXMuY2FydEluZm99KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCdb7JeQ65+sXSDsl5HshYAg7IOB7ZKIIOyCreygnOyXkCDsi6TtjKjtlZjsmIDsirXri4jri6QuJyk7XG4gICAgICAgICAgfSk7XG4gIH1cblxuICBvcmRlclRvU3RvcmUocGhvbmU6IHN0cmluZykge1xuICAgIGNvbnN0IGlkc0luQ2FydEl0ZW1zID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XG4gICAgY29uc3QgaWRzSW5DdXN0b21DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZEV4Y2Vsc0luZm8uaWRzKS5maWx0ZXIoKGlkKSA9PiAhIXRoaXMuX21lbW9FeGNlbHNJbmZvW2lkXS5xdWFudGl0eSk7XG4gICAgY29uc3QgY2FydEl0ZW1zID0gaWRzSW5DYXJ0SXRlbXMubWFwKChpZCkgPT4ge1xuICAgICAgY29uc3Qge29wdGlvbnMsIHByb2R1Y3QsIHByb2R1Y3ROYW1lLCBxdWFudGl0eX0gPSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2lkXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdob2xlc2FsZU5hbWU6IHByb2R1Y3Qud2hvbGVzYWxlLm5hbWUsXG4gICAgICAgIHdob2xlc2FsZToge1xuICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgIGlkOiBwcm9kdWN0Lndob2xlc2FsZVN0b3JlSWQsXG4gICAgICAgICAgbmFtZTogcHJvZHVjdC53aG9sZXNhbGUubmFtZVxuICAgICAgICB9LFxuICAgICAgICBidWlsZGluZzogcHJvZHVjdC53aG9sZXNhbGUuYnVpbGRpbmcsXG4gICAgICAgIGZsb29yOiBwcm9kdWN0Lndob2xlc2FsZS5mbG9vcixcbiAgICAgICAgcm9vbTogcHJvZHVjdC53aG9sZXNhbGUuc2VjdGlvbixcbiAgICAgICAgYWRkcmVzczogYCR7cHJvZHVjdC53aG9sZXNhbGUuYnVpbGRpbmd9LCAke3Byb2R1Y3Qud2hvbGVzYWxlLmZsb29yfSwgJHtwcm9kdWN0Lndob2xlc2FsZS5zZWN0aW9ufWAsXG4gICAgICAgIHBob25lOiBwcm9kdWN0Lndob2xlc2FsZS5waG9uZSxcbiAgICAgICAgcHJvZHVjdE5hbWU6IHByb2R1Y3ROYW1lLFxuICAgICAgICBjb2xvcjogb3B0aW9ucy5jb2xvcixcbiAgICAgICAgc2l6ZTogb3B0aW9ucy5zaXplLFxuICAgICAgICBvcHRpb25zOiBgJHtvcHRpb25zLmNvbG9yfSAvICR7b3B0aW9ucy5zaXplfSAvICR7cXVhbnRpdHl96rCcYCxcbiAgICAgICAgcHJpY2U6IGAke3Byb2R1Y3QucHJpY2V9YCxcbiAgICAgICAgcXVhbnRpdHk6IGAke3F1YW50aXR5fWBcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZm9ya0pvaW4odGhpcy5jcmVhdGVDdXN0b21PcmRlclVzaW5nQ2FydEl0ZW1zKGNhcnRJdGVtcywgcGhvbmUpLCB0aGlzLmNyZWF0ZUN1c3RvbUNhcnRPcmRlcihpZHNJbkN1c3RvbUNhcnRJdGVtcywgcGhvbmUpKS5zdWJzY3JpYmUoXG4gICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhblByb2R1Y3RDYXJ0KCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgKiDrp6TsnqUg7KO866y4IO2bhCwg7IOd7ISx65CcIOyjvOusuCDrjbDsnbTthLDrpbwg7KCA7J6l7ZWY6riwIOychO2VtFxuICAgICAgICAqICovXG4gICAgICAgIHRoaXMuY29tcGxldGVkT3JkZXJJbkNhcnQgPSB7XG4gICAgICAgICAgY2FydE9yZGVyczogdGhpcy5jb21wbGV0ZWRDYXJ0SXRlbXNPcmRlciB8fCBudWxsLFxuICAgICAgICAgIGN1c3RvbU9yZGVyczogcmVzcG9uc2VbMV0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3N0ZXAgPSAnY29tcGxldGUtc3RvcmUtb3JkZXInO1xuICAgICAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gICAgICB9LFxuICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ1vsl5Drn6xdIOunpOyepSDso7zrrLjsl5Ag7Iuk7Yyo7ZWY7JiA7Iq164uI64ukLicpO1xuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ3VzdG9tQ2FydE9yZGVyKGl0ZW1zOiBhbnlbXSwgcGhvbmU6IHN0cmluZykge1xuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xuXG4gICAgY29uc3QgYm9keSA9IHtcbiAgICAgIF9pZDogdGhpcy5fY3VzdG9tQ2FydElkLFxuICAgICAgY3VzdG9tZXI6IHRoaXMuX2N1c3RvbWVySWQsXG4gICAgICB0eXBlOiAnZ2VuZXJhbCcsXG4gICAgICB1bmNsZVBob25lOiBwaG9uZSxcbiAgICAgIGl0ZW1zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdFNlcnZpY2UuUE9TVCgnaHR0cHM6Ly9jb21tZXJjZS1hcGkuZ29sbGFsYS5vcmcvY3VzdG9tX2NhcnQvY2hlY2tvdXQnLCB7XG4gICAgICBib2R5LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBjcmVhdGVDdXN0b21PcmRlclVzaW5nQ2FydEl0ZW1zKGl0ZW1zOiBhbnlbXSwgcGhvbmU6IHN0cmluZykge1xuICAgIGlmKGl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mKG51bGwpO1xuXG4gICAgY29uc3QgaWRzSW5DYXJ0SXRlbXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zZWxlY3RlZFByb2R1Y3RzSW5mby5jYXJ0SWRzKTtcbiAgICBjb25zdCBib2R5ID0ge1xuICAgICAgX2lkOiB0aGlzLl9jdXN0b21DYXJ0SWQsXG4gICAgICBjdXN0b21lcjogdGhpcy5fY3VzdG9tZXJJZCxcbiAgICAgIHR5cGU6ICdnZW5lcmFsJyxcbiAgICAgIHVuY2xlUGhvbmU6IHBob25lLFxuICAgICAgaXRlbXNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21fb3JkZXIvJywge1xuICAgICAgYm9keToge1xuICAgICAgICAuLi5ib2R5LFxuICAgICAgICBpdGVtc1xuICAgICAgfVxuICAgIH0pLnBpcGUoXG4gICAgICBtZXJnZU1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBpZHNJbkNhcnRJdGVtcy5tYXAoKGlkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMuX21lbW9Qcm9kdWN0c0luZm9baWRdLFxuICAgICAgICAgICAgcHJvZHVjdDogdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tpZF0ucHJvZHVjdC5pZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb21wbGV0ZWRDYXJ0SXRlbXNPcmRlciA9IHJlc3BvbnNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2NhcnQvc3VidHJhY3QnLCB7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgX2lkOiB0aGlzLl9jYXJ0SWQsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgYWRkQWRkcmVzcyhib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MnLCB7XG4gICAgICBib2R5OiBib2R5XG4gICAgfSkucGlwZShcbiAgICAgIG1lcmdlTWFwKCh7YWRkcmVzc2VzOiB7c2Vjb25kYXJpZXN9fTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHtfaWR9ID0gc2Vjb25kYXJpZXMuc2xpY2UoLTEpWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QT1NUKCdodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MvcHJpbWFyeScsIHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBfaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlQWRkcmVzcyhpZDogc3RyaW5nLCBib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5QVVQoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcycsIHtcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgYWRkcmVzc0lkOiBpZCxcbiAgICAgICAgLi4uYm9keVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUVycm9yOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVBZGRyZXNzKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN0U2VydmljZS5ERUxFVEUoIGBodHRwczovL2NvbW1lcmNlLWFwaS5nb2xsYWxhLm9yZy9jdXN0b21lci9hdXRoL2FkZHJlc3MvJHtpZH1gLFxuICAgICAgeyBoYW5kbGVFcnJvcjogdHJ1ZX0pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc2Vjb25kYXJpZXMgfSA9IHVzZXJJbmZvLmFkZHJlc3NlcztcbiAgICAgICAgaWYgKHNlY29uZGFyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBsYXN0SWQgPSBzZWNvbmRhcmllcy5zbGljZSgtMSlbMF0uX2lkO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldFByaW1hcnlBZGRyZXNzKGxhc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG5cbiAgc2V0UHJpbWFyeUFkZHJlc3MoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJlc3RTZXJ2aWNlLlBPU1QoJ2h0dHBzOi8vY29tbWVyY2UtYXBpLmdvbGxhbGEub3JnL2N1c3RvbWVyL2F1dGgvYWRkcmVzcy9wcmltYXJ5Jywge1xuICAgICAgYm9keToge1xuICAgICAgICBfaWQ6IGlkXG4gICAgICB9LFxuICAgICAgaGFuZGxlRXJyb3I6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5Qcm9kdWN0Q2FydCgpIHtcbiAgICBjb25zdCBkZWxldGVkSWRzID0gT2JqZWN0LmtleXModGhpcy5fc2VsZWN0ZWRQcm9kdWN0c0luZm8uY2FydElkcyk7XG5cbiAgICBmb3IobGV0IGk9MDsgaSA8IGRlbGV0ZWRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRDYXJ0SWQgPSBkZWxldGVkSWRzW2ldO1xuICAgICAgY29uc3QgZGVsZXRlZFByb2R1Y3RJZDogYW55ID0gdGhpcy5fbWVtb1Byb2R1Y3RzSW5mb1tkZWxldGVkQ2FydElkXS5wcm9kdWN0LmlkO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNhcnRJbmZvLnByb2R1Y3RzLmZpbmRJbmRleCgoaXRlbTogYW55KSA9PiBpdGVtLnByb2R1Y3RJZCA9PT0gZGVsZXRlZFByb2R1Y3RJZCk7XG5cbiAgICAgIHRoaXMuY2FydEluZm8ucHJvZHVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9tZW1vUHJvZHVjdHNJbmZvW2RlbGV0ZWRDYXJ0SWRdO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdHNJbmZvID0gIHtcbiAgICAgIHRvdGFsUHJpY2U6IDAsXG4gICAgICBudW06IDAsXG4gICAgICBwY3M6IDAsXG4gICAgICBjYXJ0SWRzOiB7fSxcbiAgICAgIHByb2R1Y3RJZHM6IHt9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0SW5mby5wcm9kdWN0c0NudCA9IHRoaXMuY2FydEluZm8ucHJvZHVjdHMubGVuZ3RoO1xuICAgIHRoaXMuY2FydEluZm8udG90YWxDbnQgPSB0aGlzLmNhcnRJbmZvLmV4Y2Vsc0NudCArIHRoaXMuY2FydEluZm8ucHJvZHVjdHNDbnQ7XG4gICAgdGhpcy5fc3RlcCA9IHRoaXMuY2FydEluZm8udG90YWxDbnQgPiAwID8gJ2NhcnQnIDogJ2VtcHR5JztcbiAgICB0aGlzLmNhcnRJbmZvJC5uZXh0KHsuLi50aGlzLmNhcnRJbmZvfSk7XG4gIH1cbn1cbiJdfQ==