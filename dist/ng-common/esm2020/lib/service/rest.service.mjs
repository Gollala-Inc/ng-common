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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9yZXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBRVgsTUFBTSxzQkFBc0IsQ0FBQztBQUc5QixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFLNUIsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFDVSxJQUFnQixFQUNoQixhQUE0QixFQUM1QixjQUE4QjtRQUY5QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNwQyxDQUFDO0lBRUwsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBRWpDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV2RCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFN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UUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsR0FBVyxFQUFFLFVBQWUsRUFBRTtRQUN0RSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLEdBQUcsT0FBTztZQUNWLE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLFVBQWUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxVQUFlLEVBQUU7UUFDcEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsVUFBZSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7d0dBaE1VLFdBQVc7NEdBQVgsV0FBVyxjQUZWLEtBQUs7MkZBRU4sV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cEV2ZW50VHlwZSxcbiAgSHR0cEhlYWRlcnMsXG4gIEh0dHBQYXJhbXMsXG4gIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0RpYWxvZ1NlcnZpY2V9IGZyb20gJy4vZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHtMb2FkaW5nU2VydmljZX0gZnJvbSAnLi9sb2FkaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgb2YsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIFJlc3RTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlLFxuICApIHsgfVxuXG4gIHJlcXVlc3QodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG5cbiAgICBjb25zdCBtZXRob2QgPSAob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcpLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBvcHRpb25zLmhlYWRlcnMgPSAob3B0aW9ucy5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpKTtcblxuICAgIGlmICghb3B0aW9ucy5tdWx0aXBhcnQgJiYgIW9wdGlvbnMuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5ib2R5KSB7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGFyYW1zKSB7XG5cbiAgICAgIGlmIChvcHRpb25zLm11bHRpcGFydCkge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLnBhcmFtcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9ucy5wYXJhbXNba2V5XTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpXG4gICAgICAgICAgICAmJiB2YWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAmJiB2YWx1ZVswXSBpbnN0YW5jZW9mIEZpbGVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIFByb2Nlc3MgYXMgZmlsZSBhcnJheVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbGU6IEZpbGUgPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb3B0aW9ucy5wYXJhbXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvcHRpb25zLmJvZHkgPSBmb3JtRGF0YTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMucGFyYW1zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMucGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgLy8gcGFyYW1zIOqwgCBhcnJheSDsnbzrlYxcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnBhcmFtc1trZXldKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbXNba2V5XS5mb3JFYWNoKChwYXJhbTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoYCR7a2V5fWAsIHBhcmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBwYXJhbXMg6rCAIHN0cmluZyDsnbzrlYxcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIG9wdGlvbnMucGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKFsnR0VUJywgJ0RFTEVURScsICdIRUFEJywgJ09QVElPTlMnXS5pbmRleE9mKG1ldGhvZCkgPiAtMSkge1xuICAgICAgICAgIG9wdGlvbnMucGFyYW1zID0gaHR0cFBhcmFtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLmJvZHkgPSBlbmNvZGVVUkkoaHR0cFBhcmFtcy50b1N0cmluZygpKTtcbiAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGUgb3B0aW9ucy5tZXRob2Q7XG5cbiAgICBvcHRpb25zLm9ic2VydmUgPSAnZXZlbnRzJztcbiAgICBvcHRpb25zLnJlcG9ydFByb2dyZXNzID0gdHJ1ZTtcblxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gXy5jbG9uZURlZXAob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobWV0aG9kLCB1cmwsIHJlcXVlc3RPcHRpb25zKS5waXBlKFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZmlsdGVyKChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MgJiYgdHlwZW9mIG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXBsb2FkUHJvZ3Jlc3MoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5kb3dubG9hZFByb2dyZXNzICYmIHR5cGVvZiBvcHRpb25zLmRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZG93bmxvYWRQcm9ncmVzcyhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IEh0dHBFdmVudFR5cGUuUmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkpXG4gICAgICAucGlwZShcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xuICAgICAgICAgIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb3dubG9hZEZpbGUocmVzcG9uc2UsIG9wdGlvbnMuZmlsZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yUmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgICBpZiAoZXJyb3JSZXMuZXJyb3IgaW5zdGFuY2VvZiBPYmplY3QgJiYgZXJyb3JSZXMuZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgZXJyb3IgPSBlcnJvclJlcy5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IgPSBlcnJvclJlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgaWYgKHdpbmRvd1snbWRsZW5zRXJyb3InXSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1snbWRsZW5zRXJyb3InXS5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcHRpb25zLmhhbmRsZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvclJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlcnJvclJlcy5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzaWduaW4nXSwge1xuICAgICAgICAgICAgLy8gICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgLy8gICAgIHVybDogdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsLFxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydCgn7J247KadIOyEuOyFmOydtCDrp4zro4zrkJjsl4jsirXri4jri6QuPGJyPuuLpOyLnCDroZzqt7jsnbjtlZjshLjsmpQuJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzaWduaW4nXSwge1xuICAgICAgICAgICAgLy8gICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgICAgICAvLyAgICAgICB1cmw6IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybCxcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgIH0pO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5hbGVydChlcnJvclJlcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5sb2FkaW5nU2VydmljZS5zdG9wKCk7XG5cbiAgICAgICAgICByZXR1cm4gb2YoZXJyb3JSZXMpLnBpcGUoZmlsdGVyKCgpID0+IGZhbHNlKSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBkb3dubG9hZEZpbGUocmVzcG9uc2U6IGFueSwgZmlsZU5hbWU/OiBzdHJpbmcpIHtcbiAgICBpZiAoIWZpbGVOYW1lKSB7XG4gICAgICBjb25zdCBjb250ZW50RGlzcG9zaXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1kaXNwb3NpdGlvbicpIHx8ICcnO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IC9maWxlbmFtZT0oW147XSspL2lnLmV4ZWMoY29udGVudERpc3Bvc2l0aW9uKSB8fCBbXTtcblxuICAgICAgZmlsZU5hbWUgPSAobWF0Y2hlc1sxXSB8fCAndW50aXRsZWQnKS50cmltKCkucmVwbGFjZSgvXFxcIi9nLCAnJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtyZXNwb25zZS5ib2R5XSwge3R5cGU6IHJlc3BvbnNlLmJvZHkudHlwZX0pO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICBpZiAobGluay5kb3dubG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGZpbGVOYW1lID0gZGVjb2RlVVJJKGZpbGVOYW1lKTtcblxuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSk7XG4gICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgbGluay5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcblxuICAgIHJldHVybiBmaWxlTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgZG9SZXF1ZXN0QnlNZXRob2QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIEdFVCh1cmwgPSAnJywgb3B0aW9uczogYW55ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3RCeU1ldGhvZCgnR0VUJywgdXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBQT1NUKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdQT1NUJywgdXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBQVVQodXJsID0gJycsIG9wdGlvbnM6IGFueSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuZG9SZXF1ZXN0QnlNZXRob2QoJ1BVVCcsIHVybCwgb3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgREVMRVRFKHVybCA9ICcnLCBvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdEJ5TWV0aG9kKCdERUxFVEUnLCB1cmwsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=