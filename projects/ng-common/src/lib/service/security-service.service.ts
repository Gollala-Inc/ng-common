import {Injectable} from '@angular/core';
import {BehaviorSubject, iif, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {RestService} from '@gollala/ng-common';
import * as CryptoJS from 'crypto-js';
import {HttpHeaders} from "@angular/common/http";

const SIGNIN_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/login';
const SIGNEDIN_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/info';
const SEND_EMAIL = 'https://gollala-email-zaj3pqrsqq-du.a.run.app/api/email/send/verification/';
const SIGNOUT_ENDPOINT = '/api/security/v3/signout';
const SIGNUP_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/register';
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

  public _signedIn = false;

  signedIn$ = new BehaviorSubject<any>(this._signedIn);

  constructor(
    private restService: RestService,
  ) {}

  get signedIn(): any {
    return this._signedIn;
  }

  public signUpReqeust(body: any) {
    return this.restService.POST(SIGNUP_ENDPOINT, {
      body,
      handleError: true,
      responseType: 'text'
    });
  }

  public sendEmail(body: any) {
    return this.restService.POST(SEND_EMAIL, {
      body,
      handleError: true
    });
  }


  public getUserInfo() {
    return this.restService.GET(SIGNEDIN_ENDPOINT, {
      handleError: true
    });
  }

  public isExpiredToken(token: string) {
    const {date} = JSON.parse(token)
    const current = +new Date();
    const diff = current - date;

    return diff > 604800000 ? true : false;
  }

  public signInRequest(userId: string, password: string): Observable<boolean> {
    return this.restService.POST(SIGNIN_ENDPOINT, {
      body: {
        userId,
        password
      },
      handleError: true,
      responseType: 'text'
    }).pipe(
      catchError((e) => {
        console.log(e);
        return throwError(e);
      }),
      mergeMap(token => {
        const gollalaToken = {
          token,
          date: +new Date()
        };

        localStorage.setItem('gollala_token', JSON.stringify(gollalaToken));
        return this.signedInRequest();
      })
    );
  }

  public signedInRequest(): Observable<boolean> {
    return this.restService.GET(SIGNEDIN_ENDPOINT, {
      handleError: true
    }).pipe(
      catchError(e => {
        this._signedIn = false;
        this.signedIn$.next(false);
        return throwError(e);
      }),
      map((signedIn): any => {
        const gollalaToken = localStorage.getItem('gollala_token');
        if (!gollalaToken || (gollalaToken && this.isExpiredToken(gollalaToken))) {
          this._signedIn = false;
          return false;
        }
        this._signedIn = signedIn;
        this.signedIn$.next(signedIn);
        return true;
      })
    );
  }

  public signInWithGoogleRequest(idToken: string, provider: string): Observable<boolean> {
    return this.restService.POST(`https://commerce-api.gollala.org/customer/auth/social`, {
      params: {
        idToken,
        provider,
      },
      handleError: true,
      responseType: 'text'
    }).pipe(
      catchError((e) => {
        console.log(e);
        return throwError(e);
      }),
      mergeMap(token => {
        const gollalaToken = {
          token,
          date: +new Date()
        };

        localStorage.setItem('gollala_token', JSON.stringify(gollalaToken));
        return this.signedInRequest();
      })
    );
  }

  public signout() {
    localStorage.removeItem('gollala_token');
    this._signedIn = false;
    this.signedIn$.next(null);
  }


  /**
   * This method will be deprecated after menus and paths are properly set.
   */

  public signOutRequest(): Observable<boolean> {
    return this.restService.GET(SIGNOUT_ENDPOINT, {
      responseType: 'text',
      handleError: true,
    }).pipe(
      catchError(e => {
        return throwError(e);
      }),
      mergeMap(result => {
        this._signedIn = false;
        return of(true);
      })
    );
  }

  public changeUser(body: any) {
    return this.restService.POST(CHANGE_USER_ENDPOINT, {
      body,
      handleError: true,
    });
  }

  public fileUploadToPath(file: any) {
    return this.restService.POST('/api/cdn/public/uploadFile', {
      multipart: true,
      params: {
        file: file,
      },
      responseType: 'text'
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
