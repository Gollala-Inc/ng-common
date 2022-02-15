import { HttpClient } from '@angular/common/http';
import { DialogService } from './dialog.service';
import { LoadingService } from './loading.service';
import * as i0 from "@angular/core";
export declare class RestService {
    private http;
    private dialogService;
    private loadingService;
    constructor(http: HttpClient, dialogService: DialogService, loadingService: LoadingService);
    request(url?: string, options?: any): import("rxjs").Observable<any>;
    private downloadFile;
    private doRequestByMethod;
    GET(url?: string, options?: any): import("rxjs").Observable<any>;
    POST(url?: string, options?: any): import("rxjs").Observable<any>;
    PUT(url?: string, options?: any): import("rxjs").Observable<any>;
    DELETE(url?: string, options?: any): import("rxjs").Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RestService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RestService>;
}
