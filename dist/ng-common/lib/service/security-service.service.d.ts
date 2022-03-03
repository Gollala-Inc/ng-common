import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from '@gollala/ng-common';
import * as i0 from "@angular/core";
export declare class SecurityService {
    private restService;
    _signedIn: boolean;
    signedIn$: BehaviorSubject<any>;
    constructor(restService: RestService);
    get signedIn(): any;
    signUpReqeust(body: any): Observable<any>;
    sendEmail(body: any): Observable<any>;
    getUserInfo(): Observable<any>;
    isExpiredToken(token: string): boolean;
    signInRequest(userId: string, password: string): Observable<boolean>;
    signedInRequest(): Observable<boolean>;
    signInWithGoogleRequest(idToken: string, provider: string): Observable<boolean>;
    signout(): void;
    /**
     * This method will be deprecated after menus and paths are properly set.
     */
    signOutRequest(): Observable<boolean>;
    changeUser(body: any): Observable<any>;
    fileUploadToPath(file: any): Observable<any>;
    getServiceUser(): Observable<any>;
    encrypt(text: string): string;
    decrypt(text: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SecurityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SecurityService>;
}
