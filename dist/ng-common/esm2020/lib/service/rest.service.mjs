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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9yZXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBRVgsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFLNUIsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDVSxJQUFnQixFQUNoQixhQUE0QixFQUM1QixjQUE4QjtRQUY5QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNwQyxDQUFDO0lBRUwsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBRWpDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFN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UUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLFVBQWUsRUFBRTtRQUN0RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLEdBQUcsT0FBTztZQUNWLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLFVBQWUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxVQUFlLEVBQUU7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7d0dBaE1VLFdBQVc7NEdBQVgsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cEV2ZW50VHlwZSxcbiAgSHR0cEhlYWRlcnMsXG4gIEh0dHBQYXJhbXMsXG4gIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJy4vZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHtMb2FkaW5nU2VydmljZX0gZnJvbSAnLi9sb2FkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgb2YsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXN0U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZSxcbiAgKSB7IH1cblxuICByZXF1ZXN0KHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuXG4gICAgY29uc3QgbWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgb3B0aW9ucy5oZWFkZXJzID0gKG9wdGlvbnMuaGVhZGVycyB8fCBuZXcgSHR0cEhlYWRlcnMoKSk7XG5cbiAgICBpZiAoIW9wdGlvbnMubXVsdGlwYXJ0ICYmICFvcHRpb25zLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMuYm9keSkge1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBhcmFtcykge1xuXG4gICAgICBpZiAob3B0aW9ucy5tdWx0aXBhcnQpIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5wYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMucGFyYW1zW2tleV07XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKVxuICAgICAgICAgICAgJiYgdmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgICAgJiYgdmFsdWVbMF0gaW5zdGFuY2VvZiBGaWxlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBQcm9jZXNzIGFzIGZpbGUgYXJyYXlcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBmaWxlOiBGaWxlID0gdmFsdWVbaV07XG4gICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9wdGlvbnMucGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3B0aW9ucy5ib2R5ID0gZm9ybURhdGE7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnBhcmFtcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIC8vIHBhcmFtcyDqsIAgYXJyYXkg7J2865WMXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXJhbXNba2V5XSkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1zW2tleV0uZm9yRWFjaCgocGFyYW06IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGAke2tleX1gLCBwYXJhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFyYW1zIOqwgCBzdHJpbmcg7J2865WMXG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCBvcHRpb25zLnBhcmFtc1trZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChbJ0dFVCcsICdERUxFVEUnLCAnSEVBRCcsICdPUFRJT05TJ10uaW5kZXhPZihtZXRob2QpID4gLTEpIHtcbiAgICAgICAgICBvcHRpb25zLnBhcmFtcyA9IGh0dHBQYXJhbXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5ib2R5ID0gZW5jb2RlVVJJKGh0dHBQYXJhbXMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdGlvbnMubWV0aG9kO1xuXG4gICAgb3B0aW9ucy5vYnNlcnZlID0gJ2V2ZW50cyc7XG4gICAgb3B0aW9ucy5yZXBvcnRQcm9ncmVzcyA9IHRydWU7XG5cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IF8uY2xvbmVEZWVwKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG1ldGhvZCwgdXJsLCByZXF1ZXN0T3B0aW9ucykucGlwZShcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGZpbHRlcigoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcykge1xuICAgICAgICAgIGlmIChvcHRpb25zLnVwbG9hZFByb2dyZXNzICYmIHR5cGVvZiBvcHRpb25zLnVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpb25zLnVwbG9hZFByb2dyZXNzKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuZG93bmxvYWRQcm9ncmVzcyAmJiB0eXBlb2Ygb3B0aW9ucy5kb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRvd25sb2FkUHJvZ3Jlc3MoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgICAgLnBpcGUoXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICdibG9iJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG93bmxvYWRGaWxlKHJlc3BvbnNlLCBvcHRpb25zLmZpbGVOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvclJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgICAgaWYgKGVycm9yUmVzLmVycm9yIGluc3RhbmNlb2YgT2JqZWN0ICYmIGVycm9yUmVzLmVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3JSZXMuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3JSZXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGlmICh3aW5kb3dbJ21kbGVuc0Vycm9yJ10pIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dbJ21kbGVuc0Vycm9yJ10ucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3B0aW9ucy5oYW5kbGVFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXJyb3JSZXMuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc2lnbmluJ10sIHtcbiAgICAgICAgICAgIC8vICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgICAgIC8vICAgICB1cmw6IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybCxcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAvLyB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoJ+yduOymnSDshLjshZjsnbQg66eM66OM65CY7JeI7Iq164uI64ukLjxicj7ri6Tsi5wg66Gc6re47J247ZWY7IS47JqULicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnc2lnbmluJ10sIHtcbiAgICAgICAgICAgIC8vICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgLy8gICAgICAgdXJsOiB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmwsXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICB9KTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1NlcnZpY2UuYWxlcnQoZXJyb3JSZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc3RvcCgpO1xuXG4gICAgICAgICAgcmV0dXJuIG9mKGVycm9yUmVzKS5waXBlKGZpbHRlcigoKSA9PiBmYWxzZSkpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZG93bmxvYWRGaWxlKHJlc3BvbnNlOiBhbnksIGZpbGVOYW1lPzogc3RyaW5nKSB7XG4gICAgaWYgKCFmaWxlTmFtZSkge1xuICAgICAgY29uc3QgY29udGVudERpc3Bvc2l0aW9uID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtZGlzcG9zaXRpb24nKSB8fCAnJztcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSAvZmlsZW5hbWU9KFteO10rKS9pZy5leGVjKGNvbnRlbnREaXNwb3NpdGlvbikgfHwgW107XG5cbiAgICAgIGZpbGVOYW1lID0gKG1hdGNoZXNbMV0gfHwgJ3VudGl0bGVkJykudHJpbSgpLnJlcGxhY2UoL1xcXCIvZywgJycpO1xuICAgIH1cblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2UuYm9keV0sIHt0eXBlOiByZXNwb25zZS5ib2R5LnR5cGV9KTtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgaWYgKGxpbmsuZG93bmxvYWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBmaWxlTmFtZSA9IGRlY29kZVVSSShmaWxlTmFtZSk7XG5cbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgZmlsZU5hbWUpO1xuICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcblxuICAgIGxpbmsuY2xpY2soKTtcblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWU7XG4gIH1cblxuICBwcml2YXRlIGRvUmVxdWVzdEJ5TWV0aG9kKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHVybCwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBHRVQodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0QnlNZXRob2QoJ0dFVCcsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgUE9TVCh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3RCeU1ldGhvZCgnUE9TVCcsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgUFVUKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdQVVQnLCB1cmwsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIERFTEVURSh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3RCeU1ldGhvZCgnREVMRVRFJywgdXJsLCBvcHRpb25zKTtcbiAgfVxufVxuIl19