import { Injectable } from '@angular/core';
import { HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, filter, map, of, throwError } from 'rxjs';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./dialog.service";
import * as i3 from "./loading.service";
export class RestService {
    constructor(http, dialogService, loadingService) {
        this.http = http;
        this.dialogService = dialogService;
        this.loadingService = loadingService;
    }
    request(url = '', options = {}) {
        const method = (options.method || 'GET').toUpperCase();
        options.headers = (options.headers || new HttpHeaders());
        if (!options.multipart && !options.headers.get('Content-Type')) {
            if (options.body) {
                options.headers = options.headers.append('Content-Type', 'application/json');
            }
            else {
                options.headers = options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        if (options.params) {
            if (options.multipart) {
                const formData = new FormData();
                Object.keys(options.params).forEach(key => {
                    const value = options.params[key];
                    if (Array.isArray(value)
                        && value.length > 0
                        && value[0] instanceof File) {
                        // Process as file array
                        for (let i = 0, len = value.length; i < len; i++) {
                            const file = value[i];
                            formData.append(key, file, file.name);
                        }
                    }
                    else {
                        formData.append(key, options.params[key]);
                    }
                });
                options.body = formData;
                delete options.params;
            }
            else {
                let httpParams = new HttpParams();
                Object.keys(options.params).forEach(key => {
                    // params 가 array 일때
                    if (Array.isArray(options.params[key])) {
                        options.params[key].forEach((param) => {
                            httpParams = httpParams.append(`${key}`, param);
                        });
                    }
                    else {
                        // params 가 string 일때
                        httpParams = httpParams.append(key, options.params[key]);
                    }
                });
                if (['GET', 'DELETE', 'HEAD', 'OPTIONS'].indexOf(method) > -1) {
                    options.params = httpParams;
                }
                else {
                    options.body = encodeURI(httpParams.toString());
                    delete options.params;
                }
            }
        }
        delete options.method;
        options.observe = 'events';
        options.reportProgress = true;
        const requestOptions = _.cloneDeep(options);
        return this.http.request(method, url, requestOptions).pipe(
        // @ts-ignore
        filter((event) => {
            if (event.type === HttpEventType.UploadProgress) {
                if (options.uploadProgress && typeof options.uploadProgress === 'function') {
                    options.uploadProgress(event);
                }
            }
            else if (event.type === HttpEventType.DownloadProgress) {
                if (options.downloadProgress && typeof options.downloadProgress === 'function') {
                    options.downloadProgress(event);
                }
            }
            else if (event.type === HttpEventType.Response) {
                return true;
            }
        }))
            .pipe(
        // @ts-ignore
        map((response) => {
            if (options.responseType === 'blob') {
                return this.downloadFile(response, options.fileName);
            }
            return response.body;
        }), catchError((errorRes) => {
            let error;
            if (errorRes.error instanceof Object && errorRes.error.message) {
                error = errorRes.error;
            }
            else {
                error = errorRes;
            }
            // @ts-ignore
            if (window['mdlensError']) {
                // @ts-ignore
                return window['mdlensError'].postMessage(JSON.stringify(error.message));
            }
            if (options.handleError) {
                return throwError(errorRes);
            }
            if (errorRes.status === 401) {
                // this.router.navigate(['signin'], {
                //   queryParams: {
                //     url: this.router.routerState.snapshot.url,
                //   }
                // });
                // this.dialogService.alert('인증 세션이 만료되었습니다.<br>다시 로그인하세요.').subscribe(() => {
                //   this.router.navigate(['signin'], {
                //     queryParams: {
                //       url: this.router.routerState.snapshot.url,
                //     }
                //   });
                // });
            }
            else {
                this.dialogService.alert(errorRes.error.message);
            }
            this.loadingService.stop();
            return of(errorRes).pipe(filter(() => false));
        }));
    }
    downloadFile(response, fileName) {
        if (!fileName) {
            const contentDisposition = response.headers.get('content-disposition') || '';
            const matches = /filename=([^;]+)/ig.exec(contentDisposition) || [];
            fileName = (matches[1] || 'untitled').trim().replace(/\"/g, '');
        }
        const blob = new Blob([response.body], { type: response.body.type });
        const link = document.createElement('a');
        if (link.download === undefined) {
            return null;
        }
        const url = URL.createObjectURL(blob);
        fileName = decodeURI(fileName);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return fileName;
    }
    doRequestByMethod(method, url, options = {}) {
        return this.request(url, {
            ...options,
            method,
        });
    }
    GET(url = '', options = {}) {
        return this.doRequestByMethod('GET', url, options);
    }
    POST(url = '', options = {}) {
        return this.doRequestByMethod('POST', url, options);
    }
    PUT(url = '', options = {}) {
        return this.doRequestByMethod('PUT', url, options);
    }
    DELETE(url = '', options = {}) {
        return this.doRequestByMethod('DELETE', url, options);
    }
}
RestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, deps: [{ token: i1.HttpClient }, { token: i2.DialogService }, { token: i3.LoadingService }], target: i0.ɵɵFactoryTarget.Injectable });
RestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.DialogService }, { type: i3.LoadingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9yZXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBRVgsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFLNUIsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDVSxJQUFnQixFQUNoQixhQUE0QixFQUM1QixjQUE4QjtRQUY5QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNwQyxDQUFDO0lBRUwsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBRWpDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7YUFDOUU7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsbUNBQW1DLENBQUMsQ0FBQzthQUMvRjtTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBRWxCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDckIsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVsQyxJQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDOzJCQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7MkJBQ2hCLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLEVBQzNCO3dCQUNBLHdCQUF3Qjt3QkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEQsTUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN2QztxQkFDRjt5QkFBTTt3QkFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxvQkFBb0I7b0JBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBZ0MsRUFBRSxFQUFFOzRCQUMvRCxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNsRCxDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxxQkFBcUI7d0JBQ3JCLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdELE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFdEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDM0IsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFOUIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsSUFBSTtRQUN4RCxhQUFhO1FBQ2IsTUFBTSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxjQUFjLEVBQUU7Z0JBQy9DLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO29CQUMxRSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQjthQUNGO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hELElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtvQkFDOUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDRixJQUFJO1FBQ0gsYUFBYTtRQUNiLEdBQUcsQ0FBQyxDQUFDLFFBQTJCLEVBQUUsRUFBRTtZQUNsQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxRQUEyQixFQUFFLEVBQUU7WUFDekMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLFFBQVEsQ0FBQyxLQUFLLFlBQVksTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUM5RCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsUUFBUSxDQUFDO2FBQ2xCO1lBRUQsYUFBYTtZQUNiLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN6QixhQUFhO2dCQUNiLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN2QixPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQzNCLHFDQUFxQztnQkFDckMsbUJBQW1CO2dCQUNuQixpREFBaUQ7Z0JBQ2pELE1BQU07Z0JBQ04sTUFBTTtnQkFDTiw4RUFBOEU7Z0JBQzlFLHVDQUF1QztnQkFDdkMscUJBQXFCO2dCQUNyQixtREFBbUQ7Z0JBQ25ELFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixNQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU8sWUFBWSxDQUFDLFFBQWEsRUFBRSxRQUFpQjtRQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3RSxNQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEUsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakU7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbkUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLFVBQWUsRUFBRTtRQUN0RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLEdBQUcsT0FBTztZQUNWLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLFVBQWUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxVQUFlLEVBQUU7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7d0dBaE1VLFdBQVc7NEdBQVgsV0FBVyxjQUZWLEtBQUs7MkZBRU4sV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwRXZlbnRUeXBlLFxyXG4gIEh0dHBIZWFkZXJzLFxyXG4gIEh0dHBQYXJhbXMsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJy4vZGlhbG9nLnNlcnZpY2UnO1xyXG5pbXBvcnQge0xvYWRpbmdTZXJ2aWNlfSBmcm9tICcuL2xvYWRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIG9mLCB0aHJvd0Vycm9yfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdhbnknXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXN0U2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgcmVxdWVzdCh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcclxuXHJcbiAgICBjb25zdCBtZXRob2QgPSAob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgb3B0aW9ucy5oZWFkZXJzID0gKG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKSk7XHJcblxyXG4gICAgaWYgKCFvcHRpb25zLm11bHRpcGFydCAmJiAhb3B0aW9ucy5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuYm9keSkge1xyXG4gICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucGFyYW1zKSB7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5tdWx0aXBhcnQpIHtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5wYXJhbXNba2V5XTtcclxuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpXHJcbiAgICAgICAgICAgICYmIHZhbHVlLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgJiYgdmFsdWVbMF0gaW5zdGFuY2VvZiBGaWxlXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gUHJvY2VzcyBhcyBmaWxlIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbGU6IEZpbGUgPSB2YWx1ZVtpXTtcclxuICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBmaWxlLCBmaWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvcHRpb25zLnBhcmFtc1trZXldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy5ib2R5ID0gZm9ybURhdGE7XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIC8vIHBhcmFtcyDqsIAgYXJyYXkg7J2865WMXHJcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnBhcmFtc1trZXldKSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnBhcmFtc1trZXldLmZvckVhY2goKHBhcmFtOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGAke2tleX1gLCBwYXJhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcGFyYW1zIOqwgCBzdHJpbmcg7J2865WMXHJcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIG9wdGlvbnMucGFyYW1zW2tleV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoWydHRVQnLCAnREVMRVRFJywgJ0hFQUQnLCAnT1BUSU9OUyddLmluZGV4T2YobWV0aG9kKSA+IC0xKSB7XHJcbiAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IGh0dHBQYXJhbXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMuYm9keSA9IGVuY29kZVVSSShodHRwUGFyYW1zLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSBvcHRpb25zLm1ldGhvZDtcclxuXHJcbiAgICBvcHRpb25zLm9ic2VydmUgPSAnZXZlbnRzJztcclxuICAgIG9wdGlvbnMucmVwb3J0UHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gXy5jbG9uZURlZXAob3B0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG1ldGhvZCwgdXJsLCByZXF1ZXN0T3B0aW9ucykucGlwZShcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MgJiYgdHlwZW9mIG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy51cGxvYWRQcm9ncmVzcyhldmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLkRvd25sb2FkUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIGlmIChvcHRpb25zLmRvd25sb2FkUHJvZ3Jlc3MgJiYgdHlwZW9mIG9wdGlvbnMuZG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLmRvd25sb2FkUHJvZ3Jlc3MoZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5SZXNwb25zZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICdibG9iJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUocmVzcG9uc2UsIG9wdGlvbnMuZmlsZU5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3JSZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBsZXQgZXJyb3I7XHJcbiAgICAgICAgICBpZiAoZXJyb3JSZXMuZXJyb3IgaW5zdGFuY2VvZiBPYmplY3QgJiYgZXJyb3JSZXMuZXJyb3IubWVzc2FnZSkge1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycm9yUmVzLmVycm9yO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvclJlcztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICBpZiAod2luZG93WydtZGxlbnNFcnJvciddKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1snbWRsZW5zRXJyb3InXS5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShlcnJvci5tZXNzYWdlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5oYW5kbGVFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvclJlcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZXJyb3JSZXMuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzaWduaW4nXSwge1xyXG4gICAgICAgICAgICAvLyAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8vICAgICB1cmw6IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybCxcclxuICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ+yduOymnSDshLjshZjsnbQg66eM66OM65CY7JeI7Iq164uI64ukLjxicj7ri6Tsi5wg66Gc6re47J247ZWY7IS47JqULicpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzaWduaW4nXSwge1xyXG4gICAgICAgICAgICAvLyAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgdXJsOiB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmwsXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KGVycm9yUmVzLmVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG9mKGVycm9yUmVzKS5waXBlKGZpbHRlcigoKSA9PiBmYWxzZSkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvd25sb2FkRmlsZShyZXNwb25zZTogYW55LCBmaWxlTmFtZT86IHN0cmluZykge1xyXG4gICAgaWYgKCFmaWxlTmFtZSkge1xyXG4gICAgICBjb25zdCBjb250ZW50RGlzcG9zaXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1kaXNwb3NpdGlvbicpIHx8ICcnO1xyXG4gICAgICBjb25zdCBtYXRjaGVzID0gL2ZpbGVuYW1lPShbXjtdKykvaWcuZXhlYyhjb250ZW50RGlzcG9zaXRpb24pIHx8IFtdO1xyXG5cclxuICAgICAgZmlsZU5hbWUgPSAobWF0Y2hlc1sxXSB8fCAndW50aXRsZWQnKS50cmltKCkucmVwbGFjZSgvXFxcIi9nLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXNwb25zZS5ib2R5XSwge3R5cGU6IHJlc3BvbnNlLmJvZHkudHlwZX0pO1xyXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICBpZiAobGluay5kb3dubG9hZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICBmaWxlTmFtZSA9IGRlY29kZVVSSShmaWxlTmFtZSk7XHJcblxyXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xyXG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZU5hbWUpO1xyXG4gICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcclxuXHJcbiAgICBsaW5rLmNsaWNrKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcclxuXHJcbiAgICByZXR1cm4gZmlsZU5hbWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRvUmVxdWVzdEJ5TWV0aG9kKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIEdFVCh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdHRVQnLCB1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFBPU1QodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3RCeU1ldGhvZCgnUE9TVCcsIHVybCwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUFVUKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0QnlNZXRob2QoJ1BVVCcsIHVybCwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgREVMRVRFKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0QnlNZXRob2QoJ0RFTEVURScsIHVybCwgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==