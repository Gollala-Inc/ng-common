import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const COMMERCE_API = 'https://commerce-api.gollala.org/';

    let headers = (req.headers || new HttpHeaders())
      .append('Cache-Control', 'no-cache')
      .append('Pragma', 'no-cache')
      .append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')

    let url = req.url;

    /*
    if(url === 'https://commerce-api.gollala.org/customer/auth/order') {
      const cookie = this.getCookie('gollala_token');
      alert('인터셉터 쿠키' + cookie);
      alert('인터셉터 내에서 로컬 스토리지 확인' + localStorage.getItem('gollala_token'));
    }
     */

    const isCommercialAPI = url.includes(COMMERCE_API);

    if (isCommercialAPI) {
      if(url.includes('order_item') || url.includes('/order/')) {
        //order_item을 가져오는 경우 x-api-key를 다르게 붙인다.
        headers = headers.append('x-api-key', 'gollala987');
      } else {
        headers = headers.append('x-api-key', '123a');
      }

      url = url.replace(COMMERCE_API, 'https://dev-commerce-api.gollala.org/');
    }


    const gollalaToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZjZDdmNjA2MzI5M2EwMzY1OTlkMTUiLCJ1c2VySWQiOiJ0ZXN0X2dvbGxhbGFAZ29sbGFsYS5jb20iLCJsYXN0TG9nZ2VkSW5BdCI6IjIwMjItMDQtMTFUMDk6MTk6MDMuODU1WiIsImlhdCI6MTY0OTY2ODc0MywiaXNzIjoiZ29sbGFsYS5jb20iLCJzdWIiOiJjdXN0b21lciJ9.LrPf2BbAqiPyxmv6LAwD_1PA3k8Q6WR_H1b75sudaGM';

    headers = headers.append('Authorization', `Bearer ${gollalaToken}`);

    const httpRequest = req.clone({
      url: this.appendAppId(url),
      headers: headers,
    });

    return next.handle(httpRequest);
  }

  private appendAppId(url: string) {
    if (url.indexOf('?') >= 0) {
      return url + '&appId=brand';
    }
    return url + '?appId=brand';
  }


  private  getCookie(name: string) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  }
}
