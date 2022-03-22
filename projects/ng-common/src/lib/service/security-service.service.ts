import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {RestService} from './rest.service';
import {SharedSecurityService} from "@gollala/retail-shared";
const CHANGE_USER_ENDPOINT = '/api/security/v3/changeUser';
const GET_SERVICE_USER_ENDPOINT = '/api/account/serviceUser/get/';

interface Cypher {
    initVector: string;
    secretKey: string;
}

const cypher: Cypher = {
  initVector: 'wiseSecretVector',
  secretKey: 'wise$billing$key'
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private _signedIn = false;
  private sharedService = SharedSecurityService;

  oldPassword$: Subject<string | null> = new Subject<string | null>();
  signedIn$ = new BehaviorSubject<any>(this._signedIn);

  constructor(
    private restService: RestService,
  ) {
    this.sharedService.signedIn$((signedIn: any) => {
      this.signedIn$.next(signedIn);
      this._signedIn = signedIn;
    })
  }

  setSignedIn(signedIn: any) {
    this._signedIn = signedIn;
    this.signedIn$.next(signedIn);
  }

  get signedIn(): any {
    return this._signedIn;
  }

  public signUpReqeust(body: any) {
    return new Observable(subscriber => {
      this.sharedService.signUpReqeust(body).then(res => {
        subscriber.next(res);
      }).catch(error => {
        subscriber.error(error);
      });
    });
  }

  public sendEmail(body: any) {
    return new Observable(subscriber => {
      this.sharedService.sendEmail({
        body,
        handleError: true
      }).then(res => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }


  public getUserInfo() {
    return new Observable(subscriber => {
      this.sharedService.getUserInfo().then(res => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  public isExpiredToken(token: string) {
    const {date} = JSON.parse(token)
    const current = +new Date();
    const diff = current - date;

    return diff > 604800000 ? true : false;
  }

  public signInRequest(userId: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.sharedService.signInRequest(userId, password).then((res: any) => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  public signedInRequest(): Observable<boolean> {
    return new Observable(subscriber => {
      this.sharedService.signedInRequest().then((res: any) => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  public signout() {
    this.sharedService.signout();
  }

  /**
   * This method will be deprecated after menus and paths are properly set.
   */

  public changeUser(body: any) {
    return this.restService.POST(CHANGE_USER_ENDPOINT, {
      body,
      handleError: true,
    });
  }

  getServiceUser() {
    const serviceUserId = this.signedIn.activeUserId;
    return this.restService.GET(`${GET_SERVICE_USER_ENDPOINT}/${serviceUserId}?b=true`);
  }

  encrypt(text: string) {
    // 이미 암호화 코드 상태이면 반환
    if (Number.isNaN(+text)) {
      return text;
    }
    const iv = CryptoJS.enc.Utf8.parse(cypher.initVector);
    const key = CryptoJS.enc.Utf8.parse(cypher.secretKey);
    const encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv, padding: CryptoJS.pad.Pkcs7}).toString();
    return encodeURIComponent(encrypted);
  }

  decrypt(text: string) {
    let decodeText = text;
    let decodeURI = decodeURIComponent(decodeText);
    while (decodeURI != decodeText) {
      decodeText = decodeURI;
      decodeURI = decodeURIComponent(decodeText);
    }
    const iv = CryptoJS.enc.Utf8.parse(cypher.initVector);
    const key = CryptoJS.enc.Utf8.parse(cypher.secretKey);
    const decrypted = CryptoJS.AES.decrypt(decodeURI, key, {iv: iv, padding: CryptoJS.pad.Pkcs7});

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
