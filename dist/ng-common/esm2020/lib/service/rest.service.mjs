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
RestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.DialogService }, { type: i3.LoadingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9yZXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBRVgsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFLNUIsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDVSxJQUFnQixFQUNoQixhQUE0QixFQUM1QixjQUE4QjtRQUY5QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNwQyxDQUFDO0lBRUwsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBRWpDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7YUFDOUU7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsbUNBQW1DLENBQUMsQ0FBQzthQUMvRjtTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBRWxCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDckIsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVsQyxJQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDOzJCQUNqQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7MkJBQ2hCLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLEVBQzNCO3dCQUNBLHdCQUF3Qjt3QkFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEQsTUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN2QztxQkFDRjt5QkFBTTt3QkFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2dCQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxvQkFBb0I7b0JBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBZ0MsRUFBRSxFQUFFOzRCQUMvRCxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNsRCxDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxxQkFBcUI7d0JBQ3JCLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzdELE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO2lCQUM3QjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO2lCQUN2QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFdEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDM0IsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFOUIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsSUFBSTtRQUN4RCxhQUFhO1FBQ2IsTUFBTSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxjQUFjLEVBQUU7Z0JBQy9DLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO29CQUMxRSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQjthQUNGO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3hELElBQUksT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtvQkFDOUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGO2lCQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDRixJQUFJO1FBQ0gsYUFBYTtRQUNiLEdBQUcsQ0FBQyxDQUFDLFFBQTJCLEVBQUUsRUFBRTtZQUNsQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxRQUEyQixFQUFFLEVBQUU7WUFDekMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLFFBQVEsQ0FBQyxLQUFLLFlBQVksTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUM5RCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsUUFBUSxDQUFDO2FBQ2xCO1lBRUQsYUFBYTtZQUNiLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN6QixhQUFhO2dCQUNiLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN2QixPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQzNCLHFDQUFxQztnQkFDckMsbUJBQW1CO2dCQUNuQixpREFBaUQ7Z0JBQ2pELE1BQU07Z0JBQ04sTUFBTTtnQkFDTiw4RUFBOEU7Z0JBQzlFLHVDQUF1QztnQkFDdkMscUJBQXFCO2dCQUNyQixtREFBbUQ7Z0JBQ25ELFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixNQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU8sWUFBWSxDQUFDLFFBQWEsRUFBRSxRQUFpQjtRQUNuRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3RSxNQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEUsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakU7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbkUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLFVBQWUsRUFBRTtRQUN0RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLEdBQUcsT0FBTztZQUNWLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLFVBQWUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxVQUFlLEVBQUU7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7d0dBaE1VLFdBQVc7NEdBQVgsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgSHR0cENsaWVudCxcclxuICBIdHRwRXJyb3JSZXNwb25zZSxcclxuICBIdHRwRXZlbnRUeXBlLFxyXG4gIEh0dHBIZWFkZXJzLFxyXG4gIEh0dHBQYXJhbXMsXHJcbiAgSHR0cFJlc3BvbnNlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJy4vZGlhbG9nLnNlcnZpY2UnO1xyXG5pbXBvcnQge0xvYWRpbmdTZXJ2aWNlfSBmcm9tICcuL2xvYWRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIG9mLCB0aHJvd0Vycm9yfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzdFNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIHJlcXVlc3QodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcblxyXG4gICAgY29uc3QgbWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgIG9wdGlvbnMuaGVhZGVycyA9IChvcHRpb25zLmhlYWRlcnMgfHwgbmV3IEh0dHBIZWFkZXJzKCkpO1xyXG5cclxuICAgIGlmICghb3B0aW9ucy5tdWx0aXBhcnQgJiYgIW9wdGlvbnMuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmJvZHkpIHtcclxuICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnBhcmFtcykge1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnMubXVsdGlwYXJ0KSB7XHJcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMucGFyYW1zW2tleV07XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxyXG4gICAgICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICYmIHZhbHVlWzBdIGluc3RhbmNlb2YgRmlsZVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIC8vIFByb2Nlc3MgYXMgZmlsZSBhcnJheVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICBjb25zdCBmaWxlOiBGaWxlID0gdmFsdWVbaV07XHJcbiAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZmlsZSwgZmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb3B0aW9ucy5wYXJhbXNba2V5XSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuYm9keSA9IGZvcm1EYXRhO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAvLyBwYXJhbXMg6rCAIGFycmF5IOydvOuVjFxyXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXJhbXNba2V5XSkpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXNba2V5XS5mb3JFYWNoKChwYXJhbTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChgJHtrZXl9YCwgcGFyYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHBhcmFtcyDqsIAgc3RyaW5nIOydvOuVjFxyXG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCBvcHRpb25zLnBhcmFtc1trZXldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKFsnR0VUJywgJ0RFTEVURScsICdIRUFEJywgJ09QVElPTlMnXS5pbmRleE9mKG1ldGhvZCkgPiAtMSkge1xyXG4gICAgICAgICAgb3B0aW9ucy5wYXJhbXMgPSBodHRwUGFyYW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvcHRpb25zLmJvZHkgPSBlbmNvZGVVUkkoaHR0cFBhcmFtcy50b1N0cmluZygpKTtcclxuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgb3B0aW9ucy5tZXRob2Q7XHJcblxyXG4gICAgb3B0aW9ucy5vYnNlcnZlID0gJ2V2ZW50cyc7XHJcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IF8uY2xvbmVEZWVwKG9wdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgcmVxdWVzdE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgZmlsdGVyKChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIGlmIChvcHRpb25zLnVwbG9hZFByb2dyZXNzICYmIHR5cGVvZiBvcHRpb25zLnVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MoZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzKSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5kb3dubG9hZFByb2dyZXNzICYmIHR5cGVvZiBvcHRpb25zLmRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5kb3dubG9hZFByb2dyZXNzKGV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuUmVzcG9uc2UpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlID09PSAnYmxvYicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHJlc3BvbnNlLCBvcHRpb25zLmZpbGVOYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yUmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IGVycm9yO1xyXG4gICAgICAgICAgaWYgKGVycm9yUmVzLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0ICYmIGVycm9yUmVzLmVycm9yLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBlcnJvclJlcy5lcnJvcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3JSZXM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgaWYgKHdpbmRvd1snbWRsZW5zRXJyb3InXSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dbJ21kbGVuc0Vycm9yJ10ucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaGFuZGxlRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGVycm9yUmVzLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc2lnbmluJ10sIHtcclxuICAgICAgICAgICAgLy8gICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAvLyAgICAgdXJsOiB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmwsXHJcbiAgICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gdGhpcy5kaWFsb2dTZXJ2aWNlLmFsZXJ0KCfsnbjspp0g7IS47IWY7J20IOunjOujjOuQmOyXiOyKteuLiOuLpC48YnI+64uk7IucIOuhnOq3uOyduO2VmOyEuOyalC4nKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc2lnbmluJ10sIHtcclxuICAgICAgICAgICAgLy8gICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgIHVybDogdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsLFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydChlcnJvclJlcy5lcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RvcCgpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBvZihlcnJvclJlcykucGlwZShmaWx0ZXIoKCkgPT4gZmFsc2UpKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkb3dubG9hZEZpbGUocmVzcG9uc2U6IGFueSwgZmlsZU5hbWU/OiBzdHJpbmcpIHtcclxuICAgIGlmICghZmlsZU5hbWUpIHtcclxuICAgICAgY29uc3QgY29udGVudERpc3Bvc2l0aW9uID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtZGlzcG9zaXRpb24nKSB8fCAnJztcclxuICAgICAgY29uc3QgbWF0Y2hlcyA9IC9maWxlbmFtZT0oW147XSspL2lnLmV4ZWMoY29udGVudERpc3Bvc2l0aW9uKSB8fCBbXTtcclxuXHJcbiAgICAgIGZpbGVOYW1lID0gKG1hdGNoZXNbMV0gfHwgJ3VudGl0bGVkJykudHJpbSgpLnJlcGxhY2UoL1xcXCIvZywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2UuYm9keV0sIHt0eXBlOiByZXNwb25zZS5ib2R5LnR5cGV9KTtcclxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgaWYgKGxpbmsuZG93bmxvYWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgZmlsZU5hbWUgPSBkZWNvZGVVUkkoZmlsZU5hbWUpO1xyXG5cclxuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcclxuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKTtcclxuICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XHJcblxyXG4gICAgbGluay5jbGljaygpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XHJcblxyXG4gICAgcmV0dXJuIGZpbGVOYW1lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkb1JlcXVlc3RCeU1ldGhvZChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCwge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2QsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBHRVQodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3RCeU1ldGhvZCgnR0VUJywgdXJsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBQT1NUKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0QnlNZXRob2QoJ1BPU1QnLCB1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFBVVCh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdQVVQnLCB1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIERFTEVURSh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdERUxFVEUnLCB1cmwsIG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=