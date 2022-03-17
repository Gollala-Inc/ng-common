import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RestService} from './rest.service';
import {SharedSecurityService} from "@gollala/retail-shared";


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

  signedIn$ = new BehaviorSubject<any>(this._signedIn);

  constructor(
    private restService: RestService,
  ) {
    this.sharedService.signedIn$((signedIn: any) => {
      this.signedIn$.next(signedIn);
    })
  }

  get signedIn(): any {
    return this._signedIn;
  }

  public signUpReqeust(body: any) {
    return new Observable(subscriber => {
      this.sharedService.signUpReqeust({
        body,
        handleError: true,
        responseType: 'text'
      }).then(res => {
        subscriber.next(res);
      }, error => {
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
      this.sharedService.signInRequest(userId, password).then(res => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  public signedInRequest(): Observable<boolean> {
    return new Observable(subscriber => {
      this.sharedService.signedInRequest().then(res => {
        subscriber.next(res);
      }, error => {
        subscriber.error(error);
      });
    });
  }

  public signout() {
    this.sharedService.signout();
  }
}
