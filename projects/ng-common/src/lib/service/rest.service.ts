import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import {DialogService} from './dialog.service';
import {LoadingService} from './loading.service';
import {catchError, filter, map, of, throwError} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'any'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) { }

  request(url = '', options: any = {}) {

    const method = (options.method || 'GET').toUpperCase();

    options.headers = (options.headers || new HttpHeaders());

    if (!options.multipart && !options.headers.get('Content-Type')) {
      if (options.body) {
        options.headers = options.headers.append('Content-Type', 'application/json');
      } else {
        options.headers = options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      }
    }

    if (options.params) {

      if (options.multipart) {
        const formData: FormData = new FormData();

        Object.keys(options.params).forEach(key => {
          const value = options.params[key];

          if (
            Array.isArray(value)
            && value.length > 0
            && value[0] instanceof File
          ) {
            // Process as file array
            for (let i = 0, len = value.length; i < len; i++) {
              const file: File = value[i];
              formData.append(key, file, file.name);
            }
          } else {
            formData.append(key, options.params[key]);
          }
        });

        options.body = formData;
        delete options.params;
      } else {
        let httpParams = new HttpParams();

        Object.keys(options.params).forEach(key => {
          // params 가 array 일때
          if (Array.isArray(options.params[key])) {
            options.params[key].forEach((param: string | number | boolean) => {
              httpParams = httpParams.append(`${key}`, param);
            });
          } else {
            // params 가 string 일때
            httpParams = httpParams.append(key, options.params[key]);
          }
        });

        if (['GET', 'DELETE', 'HEAD', 'OPTIONS'].indexOf(method) > -1) {
          options.params = httpParams;
        } else {
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
      filter((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (options.uploadProgress && typeof options.uploadProgress === 'function') {
            options.uploadProgress(event);
          }
        } else if (event.type === HttpEventType.DownloadProgress) {
          if (options.downloadProgress && typeof options.downloadProgress === 'function') {
            options.downloadProgress(event);
          }
        } else if (event.type === HttpEventType.Response) {
          return true;
        }
      }))
      .pipe(
        // @ts-ignore
        map((response: HttpResponse<any>) => {
          if (options.responseType === 'blob') {
            return this.downloadFile(response, options.fileName);
          }
          return response.body;
        }),
        catchError((errorRes: HttpErrorResponse) => {
          let error;
          if (errorRes.error instanceof Object && errorRes.error.message) {
            error = errorRes.error;
          } else {
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
          } else {
            this.dialogService.alert(errorRes.error.message);
          }
          this.loadingService.stop();

          return of(errorRes).pipe(filter(() => false));
        })
      );
  }

  private downloadFile(response: any, fileName?: string) {
    if (!fileName) {
      const contentDisposition = response.headers.get('content-disposition') || '';
      const matches = /filename=([^;]+)/ig.exec(contentDisposition) || [];

      fileName = (matches[1] || 'untitled').trim().replace(/\"/g, '');
    }

    const blob = new Blob([response.body], {type: response.body.type});
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

  private doRequestByMethod(method: string, url: string, options: any = {}) {
    return this.request(url, {
      ...options,
      method,
    });
  }

  public GET(url = '', options: any = {}) {
    return this.doRequestByMethod('GET', url, options);
  }

  public POST(url = '', options: any = {}) {
    return this.doRequestByMethod('POST', url, options);
  }

  public PUT(url = '', options: any = {}) {
    return this.doRequestByMethod('PUT', url, options);
  }

  public DELETE(url = '', options: any = {}) {
    return this.doRequestByMethod('DELETE', url, options);
  }
}
