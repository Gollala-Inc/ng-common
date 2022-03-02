import * as i0 from '@angular/core';
import { Pipe, Component, Inject, HostListener, Injectable, EventEmitter, Input, Output, Directive, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, of, delay, tap, Subject, filter, map, mergeMap, Observable, catchError, throwError, timer } from 'rxjs';
import * as i2$1 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ajax } from 'rxjs/ajax';
import * as i1$1 from '@angular/common/http';
import { HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { catchError as catchError$1, mergeMap as mergeMap$1, map as map$1 } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import * as i1$2 from '@gollala/ng-common';

class CommaSeparateNumberPipe {
    transform(value, args) {
        if (!value) {
            return 0;
        }
        while (/(\d+)(\d{3})/.test(value.toString())) {
            value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        }
        return value;
    }
}
CommaSeparateNumberPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CommaSeparateNumberPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, name: "commaSeparateNumberPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'commaSeparateNumberPipe'
                }]
        }] });

class ConfirmDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    handleKeyboardEvent(event) {
        if (event.key === 'Enter') {
            this.onCloseDialog(true);
        }
    }
    ngOnInit() {
    }
    onCloseDialog(boolean = false) {
        this.dialogRef.close(boolean);
    }
}
ConfirmDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ConfirmDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ConfirmDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ConfirmDialogComponent, selector: "lib-confirm-dialog", host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, ngImport: i0, template: "<div class=\"dialog-container\">\r\n  <div class=\"dialog-header\">\r\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\r\n  </div>\r\n  <div class=\"dialog-body\">\r\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\r\n  </div>\r\n  <div class=\"dialog-footer\">\r\n    <div class=\"dialog-footer-controls\">\r\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\r\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}button{border:none}.cancel-btn{background-color:#b2b2b2}\n"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-confirm-dialog', template: "<div class=\"dialog-container\">\r\n  <div class=\"dialog-header\">\r\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\r\n  </div>\r\n  <div class=\"dialog-body\">\r\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\r\n  </div>\r\n  <div class=\"dialog-footer\">\r\n    <div class=\"dialog-footer-controls\">\r\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\r\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}button{border:none}.cancel-btn{background-color:#b2b2b2}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_DIALOG_DATA]
                    }] }];
    }, propDecorators: { handleKeyboardEvent: [{
                type: HostListener,
                args: ['document:keypress', ['$event']]
            }] } });

class ImageMagnifierDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
    onCloseDialog() {
        this.dialogRef.close();
    }
}
ImageMagnifierDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImageMagnifierDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ImageMagnifierDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ImageMagnifierDialogComponent, selector: "lib-image-magnifier-dialog", ngImport: i0, template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\r\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImageMagnifierDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-image-magnifier-dialog', template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\r\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_DIALOG_DATA]
                    }] }];
    } });

class LoadingService {
    constructor() {
        this.loading$ = new BehaviorSubject(false);
    }
    start() {
        this.loading$.next(true);
    }
    stop(ms = 0) {
        if (ms > 0) {
            of(true)
                .pipe(delay(ms))
                .subscribe(_ => {
                this.loading$.next(false);
            });
        }
        else {
            this.loading$.next(false);
        }
    }
    /**
     * NOTE: 다른 로딩과 겹치지 않게 사용할 것
     * @param ms 로딩 노출 시간
     */
    displayLoading(ms = 1000) {
        of(true)
            .pipe(tap(_ => {
            this.loading$.next(true);
        }), delay(ms)).subscribe(_ => {
            this.loading$.next(false);
        });
    }
}
LoadingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class LoadingComponent {
    constructor(loadingService) {
        this.loadingService = loadingService;
        this.global = false;
        // background 음영처리
        this.backdrop = false;
        // diameter
        this.d = 100;
        this.start = new EventEmitter();
        this.end = new EventEmitter();
        this.subscriptions = [];
        this.loading$ = new BehaviorSubject(false);
    }
    ngOnInit() {
        if (this.global) {
            this.loading$ = this.loadingService.loading$;
            const loadingSub = this.loading$.subscribe(loading => {
                if (loading) {
                    this.start.next(true);
                }
                else {
                    this.end.next(true);
                }
            });
            this.subscriptions.push(loadingSub);
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, deps: [{ token: LoadingService }], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: LoadingComponent, selector: "gollala-loading", inputs: { global: "global", backdrop: "backdrop", d: "d" }, outputs: { start: "start", end: "end" }, ngImport: i0, template: "<div class=\"loading-overlay\" [ngClass]=\"{\r\n    'active': backdrop && (!global || (loading$ && loading$.value)),\r\n    'loading': !global || (loading$ && loading$.value),\r\n    'global': global,\r\n    'fit': !global\r\n    }\">\r\n  <div class=\"spinner-container\">\r\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\r\n  </div>\r\n</div>\r\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"], components: [{ type: i2$1.MatProgressSpinner, selector: "mat-progress-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }], directives: [{ type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3$1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-loading', template: "<div class=\"loading-overlay\" [ngClass]=\"{\r\n    'active': backdrop && (!global || (loading$ && loading$.value)),\r\n    'loading': !global || (loading$ && loading$.value),\r\n    'global': global,\r\n    'fit': !global\r\n    }\">\r\n  <div class=\"spinner-container\">\r\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\r\n  </div>\r\n</div>\r\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"] }]
        }], ctorParameters: function () { return [{ type: LoadingService }]; }, propDecorators: { global: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], d: [{
                type: Input
            }], start: [{
                type: Output
            }], end: [{
                type: Output
            }] } });

class IntersectionObserverService {
    constructor(zone) {
        this.zone = zone;
        this.ixIn = new Subject();
        this.ixOut = new Subject();
        zone.runOutsideAngular(() => {
            // @ts-ignore
            IntersectionObserver.prototype['USE_MUTATION_OBSERVER'] = false;
            this.intersectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.ixIn.next({ entry, observer });
                    }
                    else {
                        this.ixOut.next({ entry, observer });
                    }
                });
            }, { rootMargin: '100px' });
            // @ts-ignore
            this.intersectionObserver['USE_MUTATION_OBSERVER'] = false;
        });
    }
    observe(elem) {
        // @ts-ignore
        this.intersectionObserver.observe(elem);
        return {
            ixIn: this.ixIn.pipe(filter(({ entry, observer }) => entry.target === elem)),
            ixOut: this.ixOut.pipe(filter(({ entry, observer }) => entry.target === elem)),
        };
    }
    unobserve(elem) {
        // @ts-ignore
        this.intersectionObserver.unobserve(elem);
    }
}
IntersectionObserverService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
IntersectionObserverService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });

const IMAGE_LOADING_PATH = 'assets/images/loading-message.png';
const IMAGE_NOT_FOUND_PATH = 'assets/images/not-found.png';
class LazyImageDirective {
    constructor(el, ioService) {
        this.el = el;
        this.ioService = ioService;
        this.retryLimit = 1;
        this.beforeLoad = new EventEmitter();
        this.afterLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.load$ = new BehaviorSubject(null);
        this.retry$ = new BehaviorSubject(-1);
        this.status = 'INIT';
        this.subscriptions = [];
    }
    ngOnInit() {
        this.setup();
        this.initSubscriptions();
        this.attachIntersectionObserver();
        this.beforeLoaded();
    }
    ngOnChanges(changes) {
        if (!changes['lazySrc'].firstChange) {
            // 만약 재시도 중이었다면 취소시킴
            const currentRetryCount = this.retry$.value;
            if (currentRetryCount !== -1) {
                this.retry$.next(-1);
            }
            this.beforeLoaded();
            const src = changes['lazySrc'].currentValue;
            this.loadImage(src)
                .subscribe((data) => { this.load$.next({ src: data, event: null }); }, () => { this.retry$.next(this.retryLimit - 1); });
        }
    }
    ngOnDestroy() {
        this.unsubscribeAll();
    }
    setup() {
        this.ne = this.el.nativeElement;
    }
    initSubscriptions() {
        const loadSub = this.load$
            .pipe(filter(Boolean))
            .subscribe((loadEvent) => {
            const { event, src } = loadEvent;
            if (this.ne) {
                if (this.ne.tagName === 'IMG') {
                    const imgTag = this.ne;
                    imgTag.src = src;
                }
                else {
                    this.populateBackgroundStyles(this.ne, src);
                }
                this.afterLoad.emit({
                    el: this.el,
                    src,
                    intersectionObserver: this.observer,
                    event,
                });
            }
        });
        this.subscriptions.push(loadSub);
        const retrySub = this.retry$
            .pipe(filter(x => x !== -1), filter(x => this.status !== 'LOAD'), delay(3000))
            .subscribe(retryCount => {
            if (retryCount <= 0) {
                this.error();
                return;
            }
            if (this.lazySrc) {
                this.loadImage(this.lazySrc)
                    .subscribe(data => { this.load$.next({ src: data, event: null }); }, err => { this.retry$.next(retryCount - 1); });
            }
        });
        this.subscriptions.push(retrySub);
    }
    unsubscribeAll() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }
    /**
     * try retrieve image from cache. if the image doesn't exist, try request.
     * @param url
     */
    loadImage(url) {
        return this.loadImageFromUrl(url);
    }
    loadImageFromUrl(url) {
        return ajax({
            url,
            crossDomain: true,
            responseType: 'arraybuffer',
        }).pipe(map((ajaxResponse) => {
            if (ajaxResponse.status >= 400) {
                throw new Error('Cannot image url');
            }
            return ajaxResponse.response;
        }), mergeMap((bufferArray) => {
            return Observable.create((observer) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    observer.next(reader.result);
                    observer.complete();
                };
                reader.onerror = (e) => {
                    observer.error(e);
                };
                reader.readAsDataURL(new Blob([bufferArray]));
            });
        }), catchError(e => throwError(e)));
    }
    attachIntersectionObserver() {
        /**
         * Lazy Loading
         */
        if (this.ne) {
            const { ixIn, ixOut } = this.ioService.observe(this.ne);
            let timerSub;
            const inSub = ixIn.subscribe((value) => {
                const { entry, observer } = value;
                if (timerSub && timerSub.closed) {
                    timerSub.unsubscribe();
                }
                this.status = 'LOADING';
                timerSub = timer(200)
                    .pipe(mergeMap(_ => this.loadImage(this.lazySrc || '')))
                    .subscribe(data => {
                    this.load$.next({ src: data, event: null });
                    observer.unobserve(entry.target);
                }, err => {
                    this.retry$.next(this.retryLimit);
                });
            });
            const outSub = ixOut.subscribe((value) => {
                if (timerSub) {
                    this.status = 'INIT';
                    timerSub.unsubscribe();
                }
            });
            this.subscriptions.push(inSub, outSub);
        }
    }
    beforeLoaded() {
        if (this.ne) {
            if (this.ne.tagName === 'IMG') {
                const imgTag = this.ne;
                imgTag.src = IMAGE_LOADING_PATH;
            }
            else {
                this.populateBackgroundStyles(this.ne, IMAGE_LOADING_PATH);
            }
            this.beforeLoad.emit({
                el: this.el,
                src: IMAGE_LOADING_PATH,
                intersectionObserver: this.observer
            });
        }
    }
    error() {
        if (this.ne) {
            if (this.ne.tagName === 'IMG') {
                const imgTag = this.el.nativeElement;
                imgTag.src = IMAGE_NOT_FOUND_PATH;
            }
            else {
                this.populateBackgroundStyles(this.ne, IMAGE_NOT_FOUND_PATH);
            }
            this.ioService.unobserve(this.ne);
            this.onError.emit({
                el: this.el,
                src: IMAGE_NOT_FOUND_PATH,
                intersectionObserver: this.observer,
                event,
            });
        }
    }
    populateBackgroundStyles(placeholder, imagePath) {
        placeholder.style.backgroundImage = `url(${imagePath})`;
        placeholder.style.backgroundPosition = 'center';
        placeholder.style.backgroundRepeat = 'no-repeat';
        placeholder.style.backgroundSize = 'contain';
    }
}
LazyImageDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LazyImageDirective, deps: [{ token: i0.ElementRef }, { token: IntersectionObserverService }], target: i0.ɵɵFactoryTarget.Directive });
LazyImageDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.3", type: LazyImageDirective, selector: "[lazyImage]", inputs: { lazySrc: ["lazyImage", "lazySrc"], ioOptions: "ioOptions", retryLimit: "retryLimit" }, outputs: { beforeLoad: "beforeLoad", afterLoad: "afterLoad", onError: "onError" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LazyImageDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[lazyImage]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: IntersectionObserverService }]; }, propDecorators: { lazySrc: [{
                type: Input,
                args: ['lazyImage']
            }], ioOptions: [{
                type: Input
            }], retryLimit: [{
                type: Input
            }], beforeLoad: [{
                type: Output
            }], afterLoad: [{
                type: Output
            }], onError: [{
                type: Output
            }] } });

class IconComponent {
    constructor() {
        this.color = '#1c1c1c';
    }
    ngAfterViewInit() {
        if (this.contentElem) {
            this.content = this.contentElem.nativeElement.innerText;
        }
    }
    ngAfterContentChecked() {
        if (this.contentElem) {
            const content = this.contentElem.nativeElement.innerText;
            if (content !== this.content) {
                this.content = content;
            }
        }
    }
}
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: IconComponent, selector: "gollala-icon", inputs: { color: "color" }, viewQueries: [{ propertyName: "contentElem", first: true, predicate: ["contentElem"], descendants: true }], ngImport: i0, template: "<div #contentElem style=\"display: none\">\r\n  <ng-content></ng-content>\r\n</div>\r\n<div class=\"wrap\">\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'cart'\">\r\n    <path d=\"M25.19 8.5H10.81C9.53422 8.5 8.5 9.53422 8.5 10.81V25.19C8.5 26.4658 9.53422 27.5 10.81 27.5H25.19C26.4658 27.5 27.5 26.4658 27.5 25.19V10.81C27.5 9.53422 26.4658 8.5 25.19 8.5Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.3299 12.99V14.53C22.3299 15.6784 21.8737 16.7797 21.0617 17.5918C20.2497 18.4038 19.1483 18.86 17.9999 18.86C16.8516 18.86 15.7502 18.4038 14.9381 17.5918C14.1261 16.7797 13.6699 15.6784 13.6699 14.53V12.99\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'excel'\">\r\n    <path d=\"M11.7 21.288L3.23999 19.938C2.89379 19.8811 2.57908 19.7031 2.35196 19.4356C2.12484 19.1682 2.0001 18.8288 2 18.478V5.82798C2.00045 5.4783 2.12555 5.14025 2.35281 4.87449C2.58008 4.60874 2.89462 4.43268 3.23999 4.37797L11.7 3.01799C11.9102 2.98491 12.1251 2.99756 12.33 3.05506C12.5348 3.11257 12.7249 3.21355 12.8872 3.35118C13.0495 3.4888 13.1803 3.65982 13.2705 3.85255C13.3607 4.04528 13.4083 4.25521 13.41 4.468V19.838C13.41 20.0513 13.3635 20.2621 13.2738 20.4556C13.1841 20.6492 13.0534 20.8209 12.8907 20.9589C12.728 21.0969 12.5372 21.1978 12.3316 21.2546C12.126 21.3114 11.9105 21.3228 11.7 21.288V21.288Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 4.7681H20.6702C20.8916 4.76678 21.1112 4.80926 21.3161 4.8931C21.5211 4.97693 21.7075 5.10047 21.8646 5.25661C22.0216 5.41274 22.1463 5.59839 22.2313 5.80287C22.3164 6.00735 22.3602 6.22663 22.3602 6.4481V17.8481C22.3602 18.2937 22.1832 18.721 21.8681 19.036C21.553 19.3511 21.1257 19.5281 20.6802 19.5281H13.4102V4.7681Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 8.86792H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 12.158H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 15.438H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.06982 14.6879L9.32982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.32982 14.6879L6.06982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"18\" height=\"19\" viewBox=\"0 0 18 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user'\">\r\n    <path d=\"M9.01978 9.39992C11.2234 9.39992 13.0098 7.61354 13.0098 5.40992C13.0098 3.20631 11.2234 1.41992 9.01978 1.41992C6.81617 1.41992 5.02979 3.20631 5.02979 5.40992C5.02979 7.61354 6.81617 9.39992 9.01978 9.39992Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M1.19995 17.9998V16.0999C1.19995 15.039 1.62138 14.0216 2.37152 13.2714C3.12167 12.5213 4.13909 12.0999 5.19995 12.0999H12.8C13.8608 12.0999 14.8782 12.5213 15.6284 13.2714C16.3785 14.0216 16.8 15.039 16.8 16.0999V17.9998\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"18\" height=\"19\" viewBox=\"0 0 18 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user-active'\">\r\n    <path d=\"M9.02027 9.39992C11.2239 9.39992 13.0103 7.61354 13.0103 5.40992C13.0103 3.20631 11.2239 1.41992 9.02027 1.41992C6.81666 1.41992 5.03027 3.20631 5.03027 5.40992C5.03027 7.61354 6.81666 9.39992 9.02027 9.39992Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M1.2002 17.9998V16.0999C1.2002 15.039 1.62162 14.0216 2.37177 13.2714C3.12191 12.5213 4.13933 12.0999 5.2002 12.0999H12.8002C13.8611 12.0999 14.8785 12.5213 15.6286 13.2714C16.3788 14.0216 16.8002 15.039 16.8002 16.0999V17.9998\" [attr.fill]=\"color\"/>\r\n    <path d=\"M1.2002 17.9998V16.0999C1.2002 15.039 1.62162 14.0216 2.37177 13.2714C3.12191 12.5213 4.13933 12.0999 5.2002 12.0999H12.8002C13.8611 12.0999 14.8785 12.5213 15.6286 13.2714C16.3788 14.0216 16.8002 15.039 16.8002 16.0999V17.9998\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'camera'\">\r\n    <path d=\"M25.86 11.3399H22.64V10.52C22.64 10.1699 22.5008 9.8341 22.2533 9.58655C22.0057 9.339 21.67 9.19995 21.3199 9.19995H13.86C13.5099 9.19995 13.1742 9.339 12.9266 9.58655C12.6791 9.8341 12.5399 10.1699 12.5399 10.52V11.3399H9.31995C8.96986 11.3399 8.63414 11.479 8.3866 11.7266C8.13905 11.9741 8 12.3098 8 12.6599V24.2499C8 24.6 8.13905 24.9357 8.3866 25.1833C8.63414 25.4308 8.96986 25.5699 9.31995 25.5699H25.86C26.2101 25.5699 26.5458 25.4308 26.7933 25.1833C27.0409 24.9357 27.1799 24.6 27.1799 24.2499V12.6599C27.1799 12.3098 27.0409 11.9741 26.7933 11.7266C26.5458 11.479 26.2101 11.3399 25.86 11.3399ZM18.2999 22.0399C17.5313 22.1827 16.7372 22.0749 16.0344 21.7324C15.3316 21.3899 14.7574 20.8308 14.3962 20.1374C14.0351 19.444 13.9061 18.653 14.0283 17.8809C14.1505 17.1087 14.5174 16.3961 15.075 15.8481C15.6325 15.3001 16.3513 14.9456 17.1255 14.8368C17.8997 14.728 18.6884 14.8707 19.3754 15.2438C20.0624 15.6169 20.6115 16.2008 20.9418 16.9094C21.272 17.618 21.366 18.4139 21.21 19.1799C21.0648 19.8922 20.7103 20.545 20.1919 21.0545C19.6734 21.564 19.0146 21.9072 18.2999 22.0399Z\"\r\n          [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'search'\">\r\n    <path d=\"M16.9406 23.8813C20.7738 23.8813 23.8813 20.7738 23.8813 16.9406C23.8813 13.1074 20.7738 10 16.9406 10C13.1074 10 10 13.1074 10 16.9406C10 20.7738 13.1074 23.8813 16.9406 23.8813Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.0181 22.0181L25.9998 25.9998\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"40\" height=\"48\" viewBox=\"0 0 40 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'upload'\">\r\n    <path d=\"M15.0371 23.5107L19.1356 19.3906C19.2262 19.2965 19.3347 19.2216 19.4547 19.1705C19.5746 19.1194 19.7036 19.093 19.8339 19.093C19.9642 19.093 20.0931 19.1194 20.2131 19.1705C20.3331 19.2216 20.4416 19.2965 20.5322 19.3906L24.6307 23.5107\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M19.8345 19.1008V29.8283\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.0359 33.8264H25.6484\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M24.1453 12.5544C24.1493 13.5149 24.5317 14.4348 25.2088 15.1126C25.8859 15.7904 26.8025 16.1709 27.758 16.1709H33.2834L24.1756 7.01514L24.1453 12.5544Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M24.145 7H9.99749C9.04335 7 8.12829 7.38102 7.45361 8.05925C6.77893 8.73748 6.3999 9.65735 6.3999 10.6165V37.0309C6.39989 37.9915 6.77843 38.9129 7.45268 39.5936C8.12693 40.2742 9.04195 40.6586 9.99749 40.6627H29.7311C30.6866 40.6586 31.6017 40.2742 32.2759 39.5936C32.9502 38.9129 33.3287 37.9915 33.3287 37.0309V16.171L24.145 7Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'download'\">\r\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'edit'\">\r\n    <path d=\"M19.5291 9.22733L22.4447 12.1429C22.5656 12.2627 22.6616 12.4053 22.7272 12.5625C22.7927 12.7196 22.8264 12.8882 22.8264 13.0584C22.8264 13.2287 22.7927 13.3973 22.7272 13.5544C22.6616 13.7115 22.5656 13.8542 22.4447 13.974L12.9069 23.5118C12.6715 23.7498 12.3527 23.8869 12.018 23.894H9.10246C8.75827 23.894 8.4282 23.7572 8.18481 23.5139C7.94143 23.2705 7.80469 22.9404 7.80469 22.5962V19.7162C7.8163 19.3825 7.95269 19.0653 8.1869 18.8273L17.7247 9.28953C17.9574 9.04488 18.2768 8.90132 18.6142 8.88968C18.9516 8.87805 19.2801 8.99929 19.5291 9.22733V9.22733Z\" stroke=\"#1C1C1C\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M15.9912 10.934L20.6579 15.6006\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.356 23.8939H24.276\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"17\" height=\"13\" viewBox=\"0 0 17 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'check'\">\r\n    <path d=\"M5.63642 8.85536L2.10684 5.17599C2.04398 5.11067 1.96918 5.05882 1.88678 5.02344C1.80439 4.98807 1.716 4.96985 1.62674 4.96985C1.53748 4.96985 1.4491 4.98807 1.3667 5.02344C1.2843 5.05882 1.20951 5.11067 1.14665 5.17599L0.200036 6.15157C0.13666 6.21636 0.0863284 6.29344 0.0520003 6.37836C0.0176721 6.46327 0 6.55434 0 6.64633C0 6.73833 0.0176721 6.82941 0.0520003 6.91433C0.0863284 6.99925 0.13666 7.07633 0.200036 7.14111L5.60938 12.7995C5.73806 12.9281 5.91022 13 6.08944 13C6.26866 13 6.44086 12.9281 6.56953 12.7995L16.8067 2.16558C16.9306 2.03532 17 1.8602 17 1.6778C17 1.4954 16.9306 1.32026 16.8067 1.18999L15.8601 0.200455C15.7314 0.0718872 15.5592 0 15.38 0C15.2008 0 15.0286 0.0718872 14.8999 0.200455L6.56953 8.85536C6.50783 8.92026 6.43418 8.97182 6.35291 9.00701C6.27163 9.04221 6.18436 9.06033 6.09621 9.06033C6.00805 9.06033 5.92078 9.04221 5.83951 9.00701C5.75823 8.97182 5.68458 8.92026 5.62288 8.85536H5.63642Z\"\r\n          [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'remove'\">\r\n    <path d=\"M9.61768 11.0579H22.4443V21.7245C22.4443 22.4318 22.1634 23.11 21.6633 23.6101C21.1632 24.1102 20.4849 24.3912 19.7777 24.3912H12.3288C11.6215 24.3912 10.9433 24.1102 10.4432 23.6101C9.94307 23.11 9.66212 22.4318 9.66212 21.7245V11.0579H9.61768Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M8 11.0579H24.08\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.2355 8H18.8888C19.2141 8 19.5261 8.12924 19.7562 8.35928C19.9862 8.58933 20.1155 8.90133 20.1155 9.22667V11.0578H12.0088V9.22667C12.0088 8.90133 12.138 8.58933 12.3681 8.35928C12.5981 8.12924 12.9101 8 13.2355 8V8Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.0356 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M19.1646 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9155 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'close'\">\r\n    <path d=\"M1.5 1.5L8.45697 8.5\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M8.49994 1.5L1.54297 8.5\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'menu'\">\r\n    <path d=\"M9 11H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n    <path d=\"M9 18H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n    <path d=\"M9 25H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'photo-search'\">\r\n    <path d=\"M7.90045 12.3299V9.4099C7.89512 9.21436 7.92886 9.01972 7.99972 8.83739C8.07058 8.65506 8.17713 8.4887 8.31311 8.34807C8.44908 8.20744 8.61175 8.09536 8.79159 8.0184C8.97143 7.94145 9.16483 7.90116 9.36044 7.8999H12.2904\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M28.0304 12.3299V9.4099C28.0412 9.02168 27.8978 8.64496 27.6318 8.36203C27.3657 8.0791 26.9985 7.91296 26.6104 7.8999H23.6104\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M7.90039 23.6799V26.6099C7.90301 26.9963 8.05766 27.3662 8.3309 27.6394C8.60414 27.9126 8.97398 28.0673 9.36038 28.0699H12.2904\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M28.0304 23.6799V26.6099C28.0277 26.9981 27.8717 27.3694 27.5963 27.6429C27.3209 27.9164 26.9485 28.0699 26.5604 28.0699H23.6104\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.8804 22.4099C19.9124 22.4099 22.3704 19.952 22.3704 16.9199C22.3704 13.8879 19.9124 11.4299 16.8804 11.4299C13.8483 11.4299 11.3904 13.8879 11.3904 16.9199C11.3904 19.952 13.8483 22.4099 16.8804 22.4099Z\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M20.8904 20.9299L24.0304 24.0699\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'clock'\">\r\n    <path d=\"M18.1697 28.87C24.0792 28.87 28.8697 24.0794 28.8697 18.17C28.8697 12.2605 24.0792 7.46997 18.1697 7.46997C12.2603 7.46997 7.46973 12.2605 7.46973 18.17C7.46973 24.0794 12.2603 28.87 18.1697 28.87Z\" [attr.fill]=\"color\"/>\r\n    <path d=\"M31.9902 11.3399L32.4902 8.63989\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.99 11.3401L29.29 10.8401\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.68945 25.14C5.96759 27.6129 7.9011 29.6868 10.2785 31.1347C12.656 32.5827 15.3858 33.3491 18.1694 33.35C20.1629 33.35 22.1369 32.9574 23.9786 32.1945C25.8203 31.4317 27.4937 30.3135 28.9033 28.9039C30.3129 27.4943 31.4311 25.8209 32.1939 23.9792C32.9568 22.1375 33.3495 20.1635 33.3495 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.65 11.2C30.3723 8.72754 28.4386 6.65452 26.0609 5.20812C23.6831 3.76173 20.9531 2.99778 18.17 3C14.1467 3 10.2881 4.59827 7.44319 7.4432C4.59826 10.2881 3 14.1467 3 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M18.1699 12.3301V18.1701\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.3899 22.39L18.1699 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.9902 11.3399L32.4902 8.63989\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.99 11.3401L29.29 10.8401\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.35035 25.01L3.86035 27.71\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.34961 25.01L7.04961 25.51\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'circle-logo'\">\r\n    <path d=\"M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z\" [attr.fill]=\"color\"/>\r\n    <path d=\"M12.4226 8.97694L12.4037 9.08235C12.3299 9.42178 12.1992 9.73168 12.0073 10.0121C11.8155 10.2925 11.5857 10.5265 11.3158 10.712C11.046 10.8996 10.7445 11.0303 10.4135 11.1083C10.0825 11.1863 9.7431 11.1927 9.39946 11.1273C9.04949 11.062 8.7417 10.9313 8.47184 10.7394C8.20199 10.5455 7.98063 10.3114 7.80776 10.0353C7.68759 9.84342 7.59483 9.63471 7.52737 9.41334C7.49785 9.31637 7.47255 9.21939 7.45147 9.11609C7.38822 8.78088 7.38822 8.43935 7.45569 8.08939C7.52104 7.74364 7.64332 7.42741 7.82462 7.13858C8.00593 6.84976 8.22729 6.60731 8.49082 6.41336C8.75434 6.2194 9.04528 6.08026 9.36573 5.99804C9.68617 5.91582 10.0214 5.90739 10.3713 5.97274C10.7171 6.0381 11.0291 6.1667 11.3095 6.35855C11.5899 6.5525 11.8218 6.7844 12.0052 7.05847C12.1886 7.33254 12.3193 7.63612 12.3931 7.965C12.3973 7.98398 12.3994 8.00295 12.4037 8.02192C12.4669 8.33605 12.4732 8.65439 12.4226 8.97694ZM14.5519 5.12313C14.4086 5.09573 14.2652 5.06832 14.124 5.0388C14.0755 5.02826 14.027 5.01983 13.9806 5.0114L13.618 4.93129C13.4915 4.90599 13.3903 4.92496 13.3144 4.9861C13.2385 5.04724 13.19 5.13578 13.1668 5.24963L12.9982 5.94112C12.8738 5.73873 12.7325 5.54478 12.5744 5.36347C12.4142 5.18005 12.2371 5.01351 12.041 4.86382C11.845 4.71414 11.6299 4.58554 11.3938 4.48013C11.1577 4.37472 10.9005 4.29671 10.6201 4.2419C10.228 4.16811 9.84007 4.14914 9.4606 4.18287C9.08112 4.21871 8.7185 4.29882 8.37276 4.42531C8.02701 4.55181 7.70445 4.72257 7.40087 4.93761C7.0994 5.15265 6.82744 5.40142 6.5871 5.68392C6.34677 5.96642 6.14227 6.28265 5.97572 6.6305C5.80917 6.97836 5.6869 7.3494 5.61311 7.74364C5.53932 8.13998 5.51613 8.53 5.54565 8.91159C5.57516 9.29318 5.65106 9.65579 5.77544 9.99943C5.77755 10.0058 5.77966 10.0121 5.78387 10.0184C5.90615 10.3557 6.06637 10.6719 6.26876 10.9671C6.47326 11.2686 6.7157 11.5384 6.99188 11.7745C7.26806 12.0128 7.57796 12.213 7.91949 12.3775C8.26102 12.5419 8.62996 12.66 9.02209 12.7338C9.30248 12.7865 9.56811 12.8055 9.81899 12.7886C10.0699 12.7717 10.3102 12.7317 10.5337 12.6621C10.7593 12.5946 10.9743 12.504 11.1788 12.3922C11.3833 12.2805 11.5793 12.1582 11.767 12.0212C11.7438 12.1034 11.6025 12.7612 11.2968 13.1828C11.2694 13.2187 11.242 13.2545 11.2125 13.2882C11.0312 13.4906 10.8014 13.6382 10.5421 13.752C10.287 13.8638 10.0087 13.9333 9.70515 13.9629C9.69882 13.9629 9.69461 13.965 9.68828 13.965C9.37838 13.9924 9.06004 13.9755 8.73748 13.9144C8.60677 13.8891 8.45919 13.8532 8.29265 13.8026C8.12821 13.7542 7.96587 13.693 7.80565 13.6192C7.68337 13.5644 7.29335 13.303 7.04248 13.0331C6.91388 12.894 6.7663 12.9088 6.75576 12.9109C6.66511 12.9151 6.5871 12.9446 6.53018 12.9994L5.82182 13.6846C5.80074 13.7036 5.78387 13.7246 5.76912 13.7436C5.7649 13.752 5.75858 13.7605 5.75436 13.7689C5.73749 13.8047 5.72695 13.8385 5.72063 13.8743C5.70587 13.9481 5.7143 14.0135 5.74171 14.0725C5.76912 14.1294 5.80917 14.18 5.85766 14.2264C6.00945 14.3993 6.18443 14.5637 6.38261 14.7155C6.58078 14.8673 6.7916 15.0043 7.01718 15.1266C7.23854 15.2447 7.46623 15.348 7.70446 15.4365C7.71078 15.4386 7.715 15.4407 7.72132 15.4428C7.96377 15.5314 8.21043 15.5988 8.45919 15.6452C8.87662 15.7232 9.28561 15.7548 9.68828 15.7422C9.85483 15.738 10.0193 15.7253 10.1816 15.7064C10.7403 15.6347 11.2505 15.4639 11.7143 15.192C12.176 14.92 12.5744 14.5426 12.9033 14.0598C13.2069 13.615 13.4282 13.0732 13.5653 12.4323C13.5779 12.3754 13.5906 12.3206 13.6011 12.2615L14.4444 7.78159L14.7206 6.31006L14.8492 5.63332L14.8597 5.58062C14.8639 5.55742 14.8661 5.53634 14.8661 5.51315C14.8703 5.42672 14.8471 5.35082 14.7965 5.28336C14.7332 5.19481 14.6531 5.14211 14.5519 5.12313Z\" fill=\"#EE2554\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'home'\">\r\n    <path d=\"M7.67039 1.89862L1.67039 7.38861C1.42851 7.6116 1.23528 7.88216 1.10278 8.18329C0.970288 8.48442 0.901381 8.80963 0.900391 9.13861V15.4386C0.900391 16.0672 1.15009 16.67 1.59455 17.1144C2.03901 17.5589 2.64183 17.8086 3.27039 17.8086H16.6604C17.289 17.8086 17.8918 17.5589 18.3362 17.1144C18.7807 16.67 19.0304 16.0672 19.0304 15.4386V9.13861C19.0294 8.80963 18.9605 8.48442 18.828 8.18329C18.6955 7.88216 18.5023 7.6116 18.2604 7.38861L12.2604 1.89862C11.6358 1.32091 10.8162 1 9.96539 1C9.11456 1 8.29503 1.32091 7.67039 1.89862V1.89862Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.9502 17.4787V12.1587\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'home-active'\">\r\n    <path d=\"M7.66991 1.89862L1.66991 7.38861C1.42803 7.6116 1.23479 7.88216 1.10229 8.18329C0.969799 8.48442 0.900893 8.80963 0.899902 9.13861V15.4386C0.899902 16.0672 1.1496 16.67 1.59406 17.1144C2.03852 17.5589 2.64134 17.8086 3.26991 17.8086H16.6599C17.2885 17.8086 17.8913 17.5589 18.3357 17.1144C18.7802 16.67 19.0299 16.0672 19.0299 15.4386V9.13861C19.0289 8.80963 18.96 8.48442 18.8275 8.18329C18.695 7.88216 18.5018 7.6116 18.2599 7.38861L12.2599 1.89862C11.6353 1.32091 10.8157 1 9.9649 1C9.11407 1 8.29454 1.32091 7.66991 1.89862Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.94995 18.3587V12.1587\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"22\" height=\"19\" viewBox=\"0 0 22 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'item'\">\r\n    <path d=\"M19.1202 1.40002H15.1202C14.885 1.40777 14.6591 1.49353 14.4781 1.6438C14.297 1.79407 14.1711 2.00033 14.1202 2.23004C13.9351 2.92416 13.526 3.53773 12.9564 3.9754C12.3868 4.41308 11.6886 4.65033 10.9702 4.65033C10.2519 4.65033 9.55358 4.41308 8.98395 3.9754C8.41432 3.53773 8.00522 2.92416 7.82019 2.23004C7.76926 2.00033 7.64339 1.79407 7.46234 1.6438C7.28129 1.49353 7.05535 1.40777 6.82019 1.40002H2.82019C2.39054 1.40002 1.97849 1.5707 1.67468 1.87451C1.37087 2.17832 1.2002 2.59043 1.2002 3.02008V6.59003C1.2002 7.01968 1.37087 7.43173 1.67468 7.73553C1.97849 8.03934 2.39054 8.21002 2.82019 8.21002H4.43018V15.8901C4.4328 16.3189 4.60435 16.7294 4.90759 17.0327C5.21083 17.3359 5.62133 17.5074 6.05017 17.5101H15.8902C16.3198 17.5101 16.7319 17.3394 17.0357 17.0356C17.3395 16.7318 17.5102 16.3197 17.5102 15.8901V8.21002H19.1302C19.559 8.2074 19.9696 8.03591 20.2728 7.73267C20.5761 7.42942 20.7476 7.01887 20.7502 6.59003V3.02008C20.7475 2.58951 20.5747 2.17743 20.2693 1.8739C19.9639 1.57038 19.5508 1.40002 19.1202 1.40002V1.40002Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.39 8.20996H12.29\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"22\" height=\"19\" viewBox=\"0 0 22 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'item-active'\">\r\n    <path d=\"M19.1202 1.3999H15.1202C14.885 1.40764 14.6591 1.4934 14.4781 1.64368C14.297 1.79395 14.1711 2.00021 14.1202 2.22992C13.9351 2.92404 13.526 3.53761 12.9564 3.97528C12.3868 4.41295 11.6886 4.65021 10.9702 4.65021C10.2519 4.65021 9.55358 4.41295 8.98395 3.97528C8.41432 3.53761 8.00522 2.92404 7.82019 2.22992C7.76926 2.00021 7.64339 1.79395 7.46234 1.64368C7.28129 1.4934 7.05535 1.40764 6.82019 1.3999H2.82019C2.39054 1.3999 1.97849 1.57058 1.67468 1.87439C1.37087 2.1782 1.2002 2.59031 1.2002 3.01996V6.5899C1.2002 7.01956 1.37087 7.4316 1.67468 7.73541C1.97849 8.03922 2.39054 8.2099 2.82019 8.2099H4.43018V15.89C4.4328 16.3188 4.60435 16.7293 4.90759 17.0325C5.21083 17.3358 5.62133 17.5073 6.05017 17.5099H15.8902C16.3198 17.5099 16.7319 17.3393 17.0357 17.0355C17.3395 16.7317 17.5102 16.3196 17.5102 15.89V8.2099H19.1302C19.559 8.20728 19.9696 8.03579 20.2728 7.73254C20.5761 7.4293 20.7476 7.01875 20.7502 6.5899V3.01996C20.7475 2.58939 20.5747 2.1773 20.2693 1.87378C19.9639 1.57025 19.5508 1.39989 19.1202 1.3999Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.39 8.20996H12.29\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'store'\">\r\n    <path d=\"M2.10059 8.3501V14.9401C2.10058 15.7659 2.42791 16.5579 3.01086 17.1428C3.59382 17.7276 4.38489 18.0575 5.21063 18.0601H14.8506C15.6763 18.0575 16.4673 17.7276 17.0503 17.1428C17.6332 16.5579 17.9606 15.7659 17.9606 14.9401V8.3501\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.1504 11.55V13.57\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M17.4404 0.900024H2.62042C2.16425 0.900024 1.72674 1.08125 1.40417 1.40381C1.08161 1.72637 0.900391 2.16388 0.900391 2.62006V5.96002C0.900391 6.76628 1.22072 7.53951 1.79083 8.10962C2.36094 8.67973 3.13417 9.00006 3.94043 9.00006C4.74669 9.00006 5.51992 8.67973 6.09003 8.10962C6.66014 7.53951 6.98041 6.76628 6.98041 5.96002C6.98041 6.75567 7.29646 7.51875 7.85907 8.08136C8.42168 8.64397 9.18476 8.96002 9.98041 8.96002C10.7761 8.96002 11.5391 8.64397 12.1017 8.08136C12.6644 7.51875 12.9804 6.75567 12.9804 5.96002C12.9804 6.76628 13.3007 7.53951 13.8708 8.10962C14.4409 8.67973 15.2142 9.00006 16.0204 9.00006C16.8267 9.00006 17.5999 8.67973 18.17 8.10962C18.7402 7.53951 19.0604 6.76628 19.0604 5.96002V2.62006C19.0612 2.18069 18.8938 1.7577 18.5925 1.43787C18.2913 1.11803 17.8791 0.925568 17.4404 0.900024Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.98047 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9805 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'store-active'\">\r\n    <path d=\"M2.10059 8.3501V14.9401C2.10058 15.7659 2.42791 16.5579 3.01086 17.1428C3.59382 17.7276 4.38489 18.0575 5.21063 18.0601H14.8506C15.6763 18.0575 16.4673 17.7276 17.0503 17.1428C17.6332 16.5579 17.9606 15.7659 17.9606 14.9401V8.3501\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.1504 11.55V13.57\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M17.4404 0.900024H2.62042C2.16425 0.900024 1.72674 1.08125 1.40417 1.40381C1.08161 1.72637 0.900391 2.16388 0.900391 2.62006V5.96002C0.900391 6.76628 1.22072 7.53951 1.79083 8.10962C2.36094 8.67973 3.13417 9.00006 3.94043 9.00006C4.74669 9.00006 5.51992 8.67973 6.09003 8.10962C6.66014 7.53951 6.98041 6.76628 6.98041 5.96002C6.98041 6.75567 7.29646 7.51875 7.85907 8.08136C8.42168 8.64397 9.18476 8.96002 9.98041 8.96002C10.7761 8.96002 11.5391 8.64397 12.1017 8.08136C12.6644 7.51875 12.9804 6.75567 12.9804 5.96002C12.9804 6.76628 13.3007 7.53951 13.8708 8.10962C14.4409 8.67973 15.2142 9.00006 16.0204 9.00006C16.8267 9.00006 17.5999 8.67973 18.17 8.10962C18.7402 7.53951 19.0604 6.76628 19.0604 5.96002V2.62006C19.0612 2.18069 18.8938 1.7577 18.5925 1.43787C18.2913 1.11803 17.8791 0.925568 17.4404 0.900024Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.98047 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9805 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'trend'\">\r\n    <path d=\"M15.4 1.5H4.59996C2.72772 1.5 1.20996 3.01775 1.20996 4.89V15.69C1.20996 17.5622 2.72772 19.08 4.59996 19.08H15.4C17.2722 19.08 18.79 17.5622 18.79 15.69V4.89C18.79 3.01775 17.2722 1.5 15.4 1.5Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.48047 13.98L6.87042 11.59C6.94761 11.512 7.03954 11.45 7.14081 11.4078C7.24208 11.3655 7.35071 11.3437 7.46045 11.3438C7.57019 11.3437 7.67882 11.3655 7.78009 11.4078C7.88136 11.45 7.97329 11.512 8.05048 11.59L8.70044 12.24C8.85886 12.3927 9.07039 12.4781 9.29047 12.4781C9.51054 12.4781 9.72201 12.3927 9.88043 12.24L14.9705 7.15002\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.04 6.59998H14.69C14.9101 6.59998 15.1213 6.68742 15.2769 6.84308C15.4326 6.99873 15.52 7.20986 15.52 7.42999V9.08002\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'trend-active'\">\r\n    <path d=\"M15.4 1.5H4.59996C2.72772 1.5 1.20996 3.01775 1.20996 4.89V15.69C1.20996 17.5622 2.72772 19.08 4.59996 19.08H15.4C17.2722 19.08 18.79 17.5622 18.79 15.69V4.89C18.79 3.01775 17.2722 1.5 15.4 1.5Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.48047 13.98L6.87042 11.59C6.94761 11.512 7.03954 11.45 7.14081 11.4078C7.24208 11.3655 7.35071 11.3437 7.46045 11.3438C7.57019 11.3437 7.67882 11.3655 7.78009 11.4078C7.88136 11.45 7.97329 11.512 8.05048 11.59L8.70044 12.24C8.85886 12.3927 9.07039 12.4781 9.29047 12.4781C9.51054 12.4781 9.72201 12.3927 9.88043 12.24L14.9705 7.15002\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.04 6.59998H14.69C14.9101 6.59998 15.1213 6.68742 15.2769 6.84308C15.4326 6.99873 15.52 7.20986 15.52 7.42999V9.08002\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'info'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04006 1.2666C3.85153 1.2666 1.26672 3.85141 1.26672 7.03994C1.26672 10.2285 3.85153 12.8133 7.04006 12.8133C10.2286 12.8133 12.8134 10.2285 12.8134 7.03994C12.8134 3.85141 10.2286 1.2666 7.04006 1.2666ZM0.266724 7.03994C0.266724 3.29913 3.29925 0.266602 7.04006 0.266602C10.7809 0.266602 13.8134 3.29913 13.8134 7.03994C13.8134 10.7807 10.7809 13.8133 7.04006 13.8133C3.29925 13.8133 0.266724 10.7807 0.266724 7.03994Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04004 5.91342C7.31618 5.91342 7.54004 6.13728 7.54004 6.41342V10.1868C7.54004 10.4629 7.31618 10.6868 7.04004 10.6868C6.7639 10.6868 6.54004 10.4629 6.54004 10.1868V6.41342C6.54004 6.13728 6.7639 5.91342 7.04004 5.91342Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04003 3.82675C6.66816 3.82675 6.3667 4.12821 6.3667 4.50008C6.3667 4.87196 6.66816 5.17342 7.04003 5.17342C7.4119 5.17342 7.71337 4.87196 7.71337 4.50008C7.71337 4.12821 7.4119 3.82675 7.04003 3.82675Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"10\" height=\"6\" viewBox=\"0 0 10 6\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'chevron-down'\">\r\n    <path d=\"M8.79143 1.43999L5.52736 4.66221C5.38047 4.80714 5.18128 4.88855 4.9736 4.88855C4.76591 4.88855 4.56673 4.80714 4.41983 4.66221L1.15576 1.43999\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'help'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.23023 4.55633C7.35845 4.6038 7.47573 4.6761 7.57519 4.76898C7.66603 4.86073 7.73718 4.96965 7.78437 5.08921C7.83228 5.21062 7.85448 5.34042 7.84959 5.47062C7.8493 5.47854 7.84922 5.48648 7.84936 5.49441C7.85215 5.64856 7.82323 5.80168 7.76436 5.94449C7.70815 6.08081 7.62577 6.20504 7.52181 6.31036L6.69715 6.96163L6.68497 6.97161C6.51403 7.11689 6.38164 7.30121 6.29931 7.50852C6.29425 7.52127 6.2898 7.53425 6.28598 7.54742C6.22688 7.75125 6.20065 7.96297 6.20825 8.17481V8.56667C6.20825 8.60597 6.21061 8.6627 6.22592 8.72415C6.24186 8.78811 6.27846 8.88343 6.36709 8.9651C6.45823 9.04909 6.55869 9.0766 6.62017 9.08637C6.659 9.09255 6.69659 9.09336 6.71297 9.0934C6.78023 9.09536 6.84726 9.08458 6.91043 9.06163C6.98196 9.03565 7.047 8.99463 7.10101 8.94132C7.15506 8.88796 7.19659 8.82373 7.22288 8.75318C7.24633 8.69029 7.25723 8.62353 7.25501 8.55659V8.17334C7.25501 8.16572 7.2548 8.15811 7.2544 8.1505C7.24872 8.0443 7.26084 7.93802 7.29016 7.83592C7.33988 7.76781 7.40058 7.70809 7.46991 7.65913L7.47452 7.65578C7.81351 7.40972 8.12816 7.13257 8.41427 6.828C8.42212 6.81964 8.42963 6.81098 8.43679 6.80204C8.74253 6.42017 8.90477 5.94572 8.89627 5.4594C8.90862 5.1882 8.86357 4.91738 8.76392 4.66422C8.66235 4.40618 8.50638 4.1724 8.30635 3.97838C8.11065 3.78652 7.87685 3.63671 7.61965 3.53838C7.36701 3.44179 7.09716 3.39692 6.8265 3.40645C6.44101 3.39819 6.06149 3.50247 5.73561 3.70636C5.40517 3.91311 5.14502 4.21283 4.98871 4.56687C4.96459 4.62149 4.95215 4.68043 4.95215 4.74001V4.87334C4.95215 4.90567 4.95377 4.96067 4.96941 5.02183C4.98634 5.08799 5.02645 5.18715 5.1236 5.2683C5.21831 5.34742 5.31846 5.36813 5.36907 5.37492C5.4108 5.38051 5.45157 5.38008 5.45788 5.38001L5.45864 5.38001C5.48755 5.38001 5.5164 5.37719 5.54475 5.37159L5.61228 5.35825C5.74895 5.33126 5.86452 5.2418 5.92366 5.1172C6.01548 4.92376 6.15009 4.75323 6.31748 4.61811C6.45749 4.53085 6.62104 4.48719 6.7868 4.49306C6.79876 4.49348 6.81073 4.49342 6.82269 4.49288C6.96148 4.48658 7.10013 4.50817 7.23023 4.55633ZM6.95954 9.40353C6.8715 9.37467 6.77821 9.36502 6.68613 9.37517C6.60555 9.38158 6.52677 9.40252 6.45373 9.437C6.38188 9.47093 6.31691 9.51733 6.26188 9.57392C6.20151 9.63156 6.15314 9.70041 6.11959 9.77659C6.08267 9.86042 6.06458 9.95114 6.06653 10.0425C6.06667 10.0488 6.06694 10.0552 6.06736 10.0615C6.07814 10.225 6.1484 10.3791 6.26498 10.4955C6.37542 10.6094 6.5233 10.6811 6.68242 10.6976C6.69388 10.6988 6.70538 10.6996 6.7169 10.6999C6.8147 10.7024 6.91181 10.6827 7.0008 10.6425C7.08435 10.6047 7.15863 10.5496 7.21867 10.4811C7.32351 10.3677 7.38589 10.2224 7.39557 10.0693C7.40483 9.98024 7.39488 9.89016 7.36624 9.80501C7.33476 9.71142 7.28159 9.62643 7.21102 9.55676C7.14043 9.48708 7.05433 9.4346 6.95954 9.40353Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.91062 1.2666C3.68068 1.2666 1.0623 3.85141 1.0623 7.03994C1.0623 10.2285 3.68068 12.8133 6.91062 12.8133C10.1405 12.8133 12.7589 10.2285 12.7589 7.03994C12.7589 3.85141 10.1405 1.2666 6.91062 1.2666ZM0.0493164 7.03994C0.0493164 3.29913 3.12122 0.266602 6.91062 0.266602C10.7 0.266602 13.7719 3.29913 13.7719 7.03994C13.7719 10.7807 10.7 13.8133 6.91062 13.8133C3.12123 13.8133 0.0493164 10.7807 0.0493164 7.03994Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"23\" height=\"19\" viewBox=\"0 0 23 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'back'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.07698 8.65039L9.38861 1.29891C9.68071 1.00522 9.67942 0.530346 9.38573 0.23825C9.09204 -0.0538467 8.61717 -0.0525554 8.32508 0.241132L0.985516 7.6207C0.514506 8.09307 0.25 8.73293 0.25 9.40002C0.25 10.0673 0.514939 10.7076 0.986155 11.18L8.32616 18.53C8.61885 18.8231 9.09372 18.8234 9.38682 18.5307C9.67991 18.238 9.68023 17.7631 9.38754 17.47L2.07783 10.1504L21.6869 10.1504C22.1011 10.1504 22.4369 9.8146 22.4369 9.40039C22.4369 8.98618 22.1011 8.65039 21.6869 8.65039L2.07698 8.65039Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n</div>\r\n\r\n\r\n\r\n\r\n", styles: [":host{display:inline-block}.wrap{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.wrap svg{width:100%;height:100%}\n"], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-icon', template: "<div #contentElem style=\"display: none\">\r\n  <ng-content></ng-content>\r\n</div>\r\n<div class=\"wrap\">\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'cart'\">\r\n    <path d=\"M25.19 8.5H10.81C9.53422 8.5 8.5 9.53422 8.5 10.81V25.19C8.5 26.4658 9.53422 27.5 10.81 27.5H25.19C26.4658 27.5 27.5 26.4658 27.5 25.19V10.81C27.5 9.53422 26.4658 8.5 25.19 8.5Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.3299 12.99V14.53C22.3299 15.6784 21.8737 16.7797 21.0617 17.5918C20.2497 18.4038 19.1483 18.86 17.9999 18.86C16.8516 18.86 15.7502 18.4038 14.9381 17.5918C14.1261 16.7797 13.6699 15.6784 13.6699 14.53V12.99\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'excel'\">\r\n    <path d=\"M11.7 21.288L3.23999 19.938C2.89379 19.8811 2.57908 19.7031 2.35196 19.4356C2.12484 19.1682 2.0001 18.8288 2 18.478V5.82798C2.00045 5.4783 2.12555 5.14025 2.35281 4.87449C2.58008 4.60874 2.89462 4.43268 3.23999 4.37797L11.7 3.01799C11.9102 2.98491 12.1251 2.99756 12.33 3.05506C12.5348 3.11257 12.7249 3.21355 12.8872 3.35118C13.0495 3.4888 13.1803 3.65982 13.2705 3.85255C13.3607 4.04528 13.4083 4.25521 13.41 4.468V19.838C13.41 20.0513 13.3635 20.2621 13.2738 20.4556C13.1841 20.6492 13.0534 20.8209 12.8907 20.9589C12.728 21.0969 12.5372 21.1978 12.3316 21.2546C12.126 21.3114 11.9105 21.3228 11.7 21.288V21.288Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 4.7681H20.6702C20.8916 4.76678 21.1112 4.80926 21.3161 4.8931C21.5211 4.97693 21.7075 5.10047 21.8646 5.25661C22.0216 5.41274 22.1463 5.59839 22.2313 5.80287C22.3164 6.00735 22.3602 6.22663 22.3602 6.4481V17.8481C22.3602 18.2937 22.1832 18.721 21.8681 19.036C21.553 19.3511 21.1257 19.5281 20.6802 19.5281H13.4102V4.7681Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 8.86792H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 12.158H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.4102 15.438H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.06982 14.6879L9.32982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.32982 14.6879L6.06982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"18\" height=\"19\" viewBox=\"0 0 18 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user'\">\r\n    <path d=\"M9.01978 9.39992C11.2234 9.39992 13.0098 7.61354 13.0098 5.40992C13.0098 3.20631 11.2234 1.41992 9.01978 1.41992C6.81617 1.41992 5.02979 3.20631 5.02979 5.40992C5.02979 7.61354 6.81617 9.39992 9.01978 9.39992Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M1.19995 17.9998V16.0999C1.19995 15.039 1.62138 14.0216 2.37152 13.2714C3.12167 12.5213 4.13909 12.0999 5.19995 12.0999H12.8C13.8608 12.0999 14.8782 12.5213 15.6284 13.2714C16.3785 14.0216 16.8 15.039 16.8 16.0999V17.9998\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"18\" height=\"19\" viewBox=\"0 0 18 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user-active'\">\r\n    <path d=\"M9.02027 9.39992C11.2239 9.39992 13.0103 7.61354 13.0103 5.40992C13.0103 3.20631 11.2239 1.41992 9.02027 1.41992C6.81666 1.41992 5.03027 3.20631 5.03027 5.40992C5.03027 7.61354 6.81666 9.39992 9.02027 9.39992Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M1.2002 17.9998V16.0999C1.2002 15.039 1.62162 14.0216 2.37177 13.2714C3.12191 12.5213 4.13933 12.0999 5.2002 12.0999H12.8002C13.8611 12.0999 14.8785 12.5213 15.6286 13.2714C16.3788 14.0216 16.8002 15.039 16.8002 16.0999V17.9998\" [attr.fill]=\"color\"/>\r\n    <path d=\"M1.2002 17.9998V16.0999C1.2002 15.039 1.62162 14.0216 2.37177 13.2714C3.12191 12.5213 4.13933 12.0999 5.2002 12.0999H12.8002C13.8611 12.0999 14.8785 12.5213 15.6286 13.2714C16.3788 14.0216 16.8002 15.039 16.8002 16.0999V17.9998\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'camera'\">\r\n    <path d=\"M25.86 11.3399H22.64V10.52C22.64 10.1699 22.5008 9.8341 22.2533 9.58655C22.0057 9.339 21.67 9.19995 21.3199 9.19995H13.86C13.5099 9.19995 13.1742 9.339 12.9266 9.58655C12.6791 9.8341 12.5399 10.1699 12.5399 10.52V11.3399H9.31995C8.96986 11.3399 8.63414 11.479 8.3866 11.7266C8.13905 11.9741 8 12.3098 8 12.6599V24.2499C8 24.6 8.13905 24.9357 8.3866 25.1833C8.63414 25.4308 8.96986 25.5699 9.31995 25.5699H25.86C26.2101 25.5699 26.5458 25.4308 26.7933 25.1833C27.0409 24.9357 27.1799 24.6 27.1799 24.2499V12.6599C27.1799 12.3098 27.0409 11.9741 26.7933 11.7266C26.5458 11.479 26.2101 11.3399 25.86 11.3399ZM18.2999 22.0399C17.5313 22.1827 16.7372 22.0749 16.0344 21.7324C15.3316 21.3899 14.7574 20.8308 14.3962 20.1374C14.0351 19.444 13.9061 18.653 14.0283 17.8809C14.1505 17.1087 14.5174 16.3961 15.075 15.8481C15.6325 15.3001 16.3513 14.9456 17.1255 14.8368C17.8997 14.728 18.6884 14.8707 19.3754 15.2438C20.0624 15.6169 20.6115 16.2008 20.9418 16.9094C21.272 17.618 21.366 18.4139 21.21 19.1799C21.0648 19.8922 20.7103 20.545 20.1919 21.0545C19.6734 21.564 19.0146 21.9072 18.2999 22.0399Z\"\r\n          [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'search'\">\r\n    <path d=\"M16.9406 23.8813C20.7738 23.8813 23.8813 20.7738 23.8813 16.9406C23.8813 13.1074 20.7738 10 16.9406 10C13.1074 10 10 13.1074 10 16.9406C10 20.7738 13.1074 23.8813 16.9406 23.8813Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.0181 22.0181L25.9998 25.9998\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"40\" height=\"48\" viewBox=\"0 0 40 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'upload'\">\r\n    <path d=\"M15.0371 23.5107L19.1356 19.3906C19.2262 19.2965 19.3347 19.2216 19.4547 19.1705C19.5746 19.1194 19.7036 19.093 19.8339 19.093C19.9642 19.093 20.0931 19.1194 20.2131 19.1705C20.3331 19.2216 20.4416 19.2965 20.5322 19.3906L24.6307 23.5107\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M19.8345 19.1008V29.8283\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.0359 33.8264H25.6484\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M24.1453 12.5544C24.1493 13.5149 24.5317 14.4348 25.2088 15.1126C25.8859 15.7904 26.8025 16.1709 27.758 16.1709H33.2834L24.1756 7.01514L24.1453 12.5544Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M24.145 7H9.99749C9.04335 7 8.12829 7.38102 7.45361 8.05925C6.77893 8.73748 6.3999 9.65735 6.3999 10.6165V37.0309C6.39989 37.9915 6.77843 38.9129 7.45268 39.5936C8.12693 40.2742 9.04195 40.6586 9.99749 40.6627H29.7311C30.6866 40.6586 31.6017 40.2742 32.2759 39.5936C32.9502 38.9129 33.3287 37.9915 33.3287 37.0309V16.171L24.145 7Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'download'\">\r\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'edit'\">\r\n    <path d=\"M19.5291 9.22733L22.4447 12.1429C22.5656 12.2627 22.6616 12.4053 22.7272 12.5625C22.7927 12.7196 22.8264 12.8882 22.8264 13.0584C22.8264 13.2287 22.7927 13.3973 22.7272 13.5544C22.6616 13.7115 22.5656 13.8542 22.4447 13.974L12.9069 23.5118C12.6715 23.7498 12.3527 23.8869 12.018 23.894H9.10246C8.75827 23.894 8.4282 23.7572 8.18481 23.5139C7.94143 23.2705 7.80469 22.9404 7.80469 22.5962V19.7162C7.8163 19.3825 7.95269 19.0653 8.1869 18.8273L17.7247 9.28953C17.9574 9.04488 18.2768 8.90132 18.6142 8.88968C18.9516 8.87805 19.2801 8.99929 19.5291 9.22733V9.22733Z\" stroke=\"#1C1C1C\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M15.9912 10.934L20.6579 15.6006\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.356 23.8939H24.276\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"17\" height=\"13\" viewBox=\"0 0 17 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'check'\">\r\n    <path d=\"M5.63642 8.85536L2.10684 5.17599C2.04398 5.11067 1.96918 5.05882 1.88678 5.02344C1.80439 4.98807 1.716 4.96985 1.62674 4.96985C1.53748 4.96985 1.4491 4.98807 1.3667 5.02344C1.2843 5.05882 1.20951 5.11067 1.14665 5.17599L0.200036 6.15157C0.13666 6.21636 0.0863284 6.29344 0.0520003 6.37836C0.0176721 6.46327 0 6.55434 0 6.64633C0 6.73833 0.0176721 6.82941 0.0520003 6.91433C0.0863284 6.99925 0.13666 7.07633 0.200036 7.14111L5.60938 12.7995C5.73806 12.9281 5.91022 13 6.08944 13C6.26866 13 6.44086 12.9281 6.56953 12.7995L16.8067 2.16558C16.9306 2.03532 17 1.8602 17 1.6778C17 1.4954 16.9306 1.32026 16.8067 1.18999L15.8601 0.200455C15.7314 0.0718872 15.5592 0 15.38 0C15.2008 0 15.0286 0.0718872 14.8999 0.200455L6.56953 8.85536C6.50783 8.92026 6.43418 8.97182 6.35291 9.00701C6.27163 9.04221 6.18436 9.06033 6.09621 9.06033C6.00805 9.06033 5.92078 9.04221 5.83951 9.00701C5.75823 8.97182 5.68458 8.92026 5.62288 8.85536H5.63642Z\"\r\n          [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'remove'\">\r\n    <path d=\"M9.61768 11.0579H22.4443V21.7245C22.4443 22.4318 22.1634 23.11 21.6633 23.6101C21.1632 24.1102 20.4849 24.3912 19.7777 24.3912H12.3288C11.6215 24.3912 10.9433 24.1102 10.4432 23.6101C9.94307 23.11 9.66212 22.4318 9.66212 21.7245V11.0579H9.61768Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M8 11.0579H24.08\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.2355 8H18.8888C19.2141 8 19.5261 8.12924 19.7562 8.35928C19.9862 8.58933 20.1155 8.90133 20.1155 9.22667V11.0578H12.0088V9.22667C12.0088 8.90133 12.138 8.58933 12.3681 8.35928C12.5981 8.12924 12.9101 8 13.2355 8V8Z\"\r\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.0356 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M19.1646 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9155 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'close'\">\r\n    <path d=\"M1.5 1.5L8.45697 8.5\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M8.49994 1.5L1.54297 8.5\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'menu'\">\r\n    <path d=\"M9 11H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n    <path d=\"M9 18H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n    <path d=\"M9 25H27\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'photo-search'\">\r\n    <path d=\"M7.90045 12.3299V9.4099C7.89512 9.21436 7.92886 9.01972 7.99972 8.83739C8.07058 8.65506 8.17713 8.4887 8.31311 8.34807C8.44908 8.20744 8.61175 8.09536 8.79159 8.0184C8.97143 7.94145 9.16483 7.90116 9.36044 7.8999H12.2904\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M28.0304 12.3299V9.4099C28.0412 9.02168 27.8978 8.64496 27.6318 8.36203C27.3657 8.0791 26.9985 7.91296 26.6104 7.8999H23.6104\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M7.90039 23.6799V26.6099C7.90301 26.9963 8.05766 27.3662 8.3309 27.6394C8.60414 27.9126 8.97398 28.0673 9.36038 28.0699H12.2904\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M28.0304 23.6799V26.6099C28.0277 26.9981 27.8717 27.3694 27.5963 27.6429C27.3209 27.9164 26.9485 28.0699 26.5604 28.0699H23.6104\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M16.8804 22.4099C19.9124 22.4099 22.3704 19.952 22.3704 16.9199C22.3704 13.8879 19.9124 11.4299 16.8804 11.4299C13.8483 11.4299 11.3904 13.8879 11.3904 16.9199C11.3904 19.952 13.8483 22.4099 16.8804 22.4099Z\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M20.8904 20.9299L24.0304 24.0699\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'clock'\">\r\n    <path d=\"M18.1697 28.87C24.0792 28.87 28.8697 24.0794 28.8697 18.17C28.8697 12.2605 24.0792 7.46997 18.1697 7.46997C12.2603 7.46997 7.46973 12.2605 7.46973 18.17C7.46973 24.0794 12.2603 28.87 18.1697 28.87Z\" [attr.fill]=\"color\"/>\r\n    <path d=\"M31.9902 11.3399L32.4902 8.63989\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.99 11.3401L29.29 10.8401\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.68945 25.14C5.96759 27.6129 7.9011 29.6868 10.2785 31.1347C12.656 32.5827 15.3858 33.3491 18.1694 33.35C20.1629 33.35 22.1369 32.9574 23.9786 32.1945C25.8203 31.4317 27.4937 30.3135 28.9033 28.9039C30.3129 27.4943 31.4311 25.8209 32.1939 23.9792C32.9568 22.1375 33.3495 20.1635 33.3495 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.65 11.2C30.3723 8.72754 28.4386 6.65452 26.0609 5.20812C23.6831 3.76173 20.9531 2.99778 18.17 3C14.1467 3 10.2881 4.59827 7.44319 7.4432C4.59826 10.2881 3 14.1467 3 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M18.1699 12.3301V18.1701\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M22.3899 22.39L18.1699 18.17\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.9902 11.3399L32.4902 8.63989\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M31.99 11.3401L29.29 10.8401\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.35035 25.01L3.86035 27.71\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.34961 25.01L7.04961 25.51\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'circle-logo'\">\r\n    <path d=\"M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z\" [attr.fill]=\"color\"/>\r\n    <path d=\"M12.4226 8.97694L12.4037 9.08235C12.3299 9.42178 12.1992 9.73168 12.0073 10.0121C11.8155 10.2925 11.5857 10.5265 11.3158 10.712C11.046 10.8996 10.7445 11.0303 10.4135 11.1083C10.0825 11.1863 9.7431 11.1927 9.39946 11.1273C9.04949 11.062 8.7417 10.9313 8.47184 10.7394C8.20199 10.5455 7.98063 10.3114 7.80776 10.0353C7.68759 9.84342 7.59483 9.63471 7.52737 9.41334C7.49785 9.31637 7.47255 9.21939 7.45147 9.11609C7.38822 8.78088 7.38822 8.43935 7.45569 8.08939C7.52104 7.74364 7.64332 7.42741 7.82462 7.13858C8.00593 6.84976 8.22729 6.60731 8.49082 6.41336C8.75434 6.2194 9.04528 6.08026 9.36573 5.99804C9.68617 5.91582 10.0214 5.90739 10.3713 5.97274C10.7171 6.0381 11.0291 6.1667 11.3095 6.35855C11.5899 6.5525 11.8218 6.7844 12.0052 7.05847C12.1886 7.33254 12.3193 7.63612 12.3931 7.965C12.3973 7.98398 12.3994 8.00295 12.4037 8.02192C12.4669 8.33605 12.4732 8.65439 12.4226 8.97694ZM14.5519 5.12313C14.4086 5.09573 14.2652 5.06832 14.124 5.0388C14.0755 5.02826 14.027 5.01983 13.9806 5.0114L13.618 4.93129C13.4915 4.90599 13.3903 4.92496 13.3144 4.9861C13.2385 5.04724 13.19 5.13578 13.1668 5.24963L12.9982 5.94112C12.8738 5.73873 12.7325 5.54478 12.5744 5.36347C12.4142 5.18005 12.2371 5.01351 12.041 4.86382C11.845 4.71414 11.6299 4.58554 11.3938 4.48013C11.1577 4.37472 10.9005 4.29671 10.6201 4.2419C10.228 4.16811 9.84007 4.14914 9.4606 4.18287C9.08112 4.21871 8.7185 4.29882 8.37276 4.42531C8.02701 4.55181 7.70445 4.72257 7.40087 4.93761C7.0994 5.15265 6.82744 5.40142 6.5871 5.68392C6.34677 5.96642 6.14227 6.28265 5.97572 6.6305C5.80917 6.97836 5.6869 7.3494 5.61311 7.74364C5.53932 8.13998 5.51613 8.53 5.54565 8.91159C5.57516 9.29318 5.65106 9.65579 5.77544 9.99943C5.77755 10.0058 5.77966 10.0121 5.78387 10.0184C5.90615 10.3557 6.06637 10.6719 6.26876 10.9671C6.47326 11.2686 6.7157 11.5384 6.99188 11.7745C7.26806 12.0128 7.57796 12.213 7.91949 12.3775C8.26102 12.5419 8.62996 12.66 9.02209 12.7338C9.30248 12.7865 9.56811 12.8055 9.81899 12.7886C10.0699 12.7717 10.3102 12.7317 10.5337 12.6621C10.7593 12.5946 10.9743 12.504 11.1788 12.3922C11.3833 12.2805 11.5793 12.1582 11.767 12.0212C11.7438 12.1034 11.6025 12.7612 11.2968 13.1828C11.2694 13.2187 11.242 13.2545 11.2125 13.2882C11.0312 13.4906 10.8014 13.6382 10.5421 13.752C10.287 13.8638 10.0087 13.9333 9.70515 13.9629C9.69882 13.9629 9.69461 13.965 9.68828 13.965C9.37838 13.9924 9.06004 13.9755 8.73748 13.9144C8.60677 13.8891 8.45919 13.8532 8.29265 13.8026C8.12821 13.7542 7.96587 13.693 7.80565 13.6192C7.68337 13.5644 7.29335 13.303 7.04248 13.0331C6.91388 12.894 6.7663 12.9088 6.75576 12.9109C6.66511 12.9151 6.5871 12.9446 6.53018 12.9994L5.82182 13.6846C5.80074 13.7036 5.78387 13.7246 5.76912 13.7436C5.7649 13.752 5.75858 13.7605 5.75436 13.7689C5.73749 13.8047 5.72695 13.8385 5.72063 13.8743C5.70587 13.9481 5.7143 14.0135 5.74171 14.0725C5.76912 14.1294 5.80917 14.18 5.85766 14.2264C6.00945 14.3993 6.18443 14.5637 6.38261 14.7155C6.58078 14.8673 6.7916 15.0043 7.01718 15.1266C7.23854 15.2447 7.46623 15.348 7.70446 15.4365C7.71078 15.4386 7.715 15.4407 7.72132 15.4428C7.96377 15.5314 8.21043 15.5988 8.45919 15.6452C8.87662 15.7232 9.28561 15.7548 9.68828 15.7422C9.85483 15.738 10.0193 15.7253 10.1816 15.7064C10.7403 15.6347 11.2505 15.4639 11.7143 15.192C12.176 14.92 12.5744 14.5426 12.9033 14.0598C13.2069 13.615 13.4282 13.0732 13.5653 12.4323C13.5779 12.3754 13.5906 12.3206 13.6011 12.2615L14.4444 7.78159L14.7206 6.31006L14.8492 5.63332L14.8597 5.58062C14.8639 5.55742 14.8661 5.53634 14.8661 5.51315C14.8703 5.42672 14.8471 5.35082 14.7965 5.28336C14.7332 5.19481 14.6531 5.14211 14.5519 5.12313Z\" fill=\"#EE2554\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'home'\">\r\n    <path d=\"M7.67039 1.89862L1.67039 7.38861C1.42851 7.6116 1.23528 7.88216 1.10278 8.18329C0.970288 8.48442 0.901381 8.80963 0.900391 9.13861V15.4386C0.900391 16.0672 1.15009 16.67 1.59455 17.1144C2.03901 17.5589 2.64183 17.8086 3.27039 17.8086H16.6604C17.289 17.8086 17.8918 17.5589 18.3362 17.1144C18.7807 16.67 19.0304 16.0672 19.0304 15.4386V9.13861C19.0294 8.80963 18.9605 8.48442 18.828 8.18329C18.6955 7.88216 18.5023 7.6116 18.2604 7.38861L12.2604 1.89862C11.6358 1.32091 10.8162 1 9.96539 1C9.11456 1 8.29503 1.32091 7.67039 1.89862V1.89862Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.9502 17.4787V12.1587\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'home-active'\">\r\n    <path d=\"M7.66991 1.89862L1.66991 7.38861C1.42803 7.6116 1.23479 7.88216 1.10229 8.18329C0.969799 8.48442 0.900893 8.80963 0.899902 9.13861V15.4386C0.899902 16.0672 1.1496 16.67 1.59406 17.1144C2.03852 17.5589 2.64134 17.8086 3.26991 17.8086H16.6599C17.2885 17.8086 17.8913 17.5589 18.3357 17.1144C18.7802 16.67 19.0299 16.0672 19.0299 15.4386V9.13861C19.0289 8.80963 18.96 8.48442 18.8275 8.18329C18.695 7.88216 18.5018 7.6116 18.2599 7.38861L12.2599 1.89862C11.6353 1.32091 10.8157 1 9.9649 1C9.11407 1 8.29454 1.32091 7.66991 1.89862Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M9.94995 18.3587V12.1587\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"22\" height=\"19\" viewBox=\"0 0 22 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'item'\">\r\n    <path d=\"M19.1202 1.40002H15.1202C14.885 1.40777 14.6591 1.49353 14.4781 1.6438C14.297 1.79407 14.1711 2.00033 14.1202 2.23004C13.9351 2.92416 13.526 3.53773 12.9564 3.9754C12.3868 4.41308 11.6886 4.65033 10.9702 4.65033C10.2519 4.65033 9.55358 4.41308 8.98395 3.9754C8.41432 3.53773 8.00522 2.92416 7.82019 2.23004C7.76926 2.00033 7.64339 1.79407 7.46234 1.6438C7.28129 1.49353 7.05535 1.40777 6.82019 1.40002H2.82019C2.39054 1.40002 1.97849 1.5707 1.67468 1.87451C1.37087 2.17832 1.2002 2.59043 1.2002 3.02008V6.59003C1.2002 7.01968 1.37087 7.43173 1.67468 7.73553C1.97849 8.03934 2.39054 8.21002 2.82019 8.21002H4.43018V15.8901C4.4328 16.3189 4.60435 16.7294 4.90759 17.0327C5.21083 17.3359 5.62133 17.5074 6.05017 17.5101H15.8902C16.3198 17.5101 16.7319 17.3394 17.0357 17.0356C17.3395 16.7318 17.5102 16.3197 17.5102 15.8901V8.21002H19.1302C19.559 8.2074 19.9696 8.03591 20.2728 7.73267C20.5761 7.42942 20.7476 7.01887 20.7502 6.59003V3.02008C20.7475 2.58951 20.5747 2.17743 20.2693 1.8739C19.9639 1.57038 19.5508 1.40002 19.1202 1.40002V1.40002Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.39 8.20996H12.29\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"22\" height=\"19\" viewBox=\"0 0 22 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'item-active'\">\r\n    <path d=\"M19.1202 1.3999H15.1202C14.885 1.40764 14.6591 1.4934 14.4781 1.64368C14.297 1.79395 14.1711 2.00021 14.1202 2.22992C13.9351 2.92404 13.526 3.53761 12.9564 3.97528C12.3868 4.41295 11.6886 4.65021 10.9702 4.65021C10.2519 4.65021 9.55358 4.41295 8.98395 3.97528C8.41432 3.53761 8.00522 2.92404 7.82019 2.22992C7.76926 2.00021 7.64339 1.79395 7.46234 1.64368C7.28129 1.4934 7.05535 1.40764 6.82019 1.3999H2.82019C2.39054 1.3999 1.97849 1.57058 1.67468 1.87439C1.37087 2.1782 1.2002 2.59031 1.2002 3.01996V6.5899C1.2002 7.01956 1.37087 7.4316 1.67468 7.73541C1.97849 8.03922 2.39054 8.2099 2.82019 8.2099H4.43018V15.89C4.4328 16.3188 4.60435 16.7293 4.90759 17.0325C5.21083 17.3358 5.62133 17.5073 6.05017 17.5099H15.8902C16.3198 17.5099 16.7319 17.3393 17.0357 17.0355C17.3395 16.7317 17.5102 16.3196 17.5102 15.89V8.2099H19.1302C19.559 8.20728 19.9696 8.03579 20.2728 7.73254C20.5761 7.4293 20.7476 7.01875 20.7502 6.5899V3.01996C20.7475 2.58939 20.5747 2.1773 20.2693 1.87378C19.9639 1.57025 19.5508 1.39989 19.1202 1.3999Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.39 8.20996H12.29\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'store'\">\r\n    <path d=\"M2.10059 8.3501V14.9401C2.10058 15.7659 2.42791 16.5579 3.01086 17.1428C3.59382 17.7276 4.38489 18.0575 5.21063 18.0601H14.8506C15.6763 18.0575 16.4673 17.7276 17.0503 17.1428C17.6332 16.5579 17.9606 15.7659 17.9606 14.9401V8.3501\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.1504 11.55V13.57\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M17.4404 0.900024H2.62042C2.16425 0.900024 1.72674 1.08125 1.40417 1.40381C1.08161 1.72637 0.900391 2.16388 0.900391 2.62006V5.96002C0.900391 6.76628 1.22072 7.53951 1.79083 8.10962C2.36094 8.67973 3.13417 9.00006 3.94043 9.00006C4.74669 9.00006 5.51992 8.67973 6.09003 8.10962C6.66014 7.53951 6.98041 6.76628 6.98041 5.96002C6.98041 6.75567 7.29646 7.51875 7.85907 8.08136C8.42168 8.64397 9.18476 8.96002 9.98041 8.96002C10.7761 8.96002 11.5391 8.64397 12.1017 8.08136C12.6644 7.51875 12.9804 6.75567 12.9804 5.96002C12.9804 6.76628 13.3007 7.53951 13.8708 8.10962C14.4409 8.67973 15.2142 9.00006 16.0204 9.00006C16.8267 9.00006 17.5999 8.67973 18.17 8.10962C18.7402 7.53951 19.0604 6.76628 19.0604 5.96002V2.62006C19.0612 2.18069 18.8938 1.7577 18.5925 1.43787C18.2913 1.11803 17.8791 0.925568 17.4404 0.900024Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.98047 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9805 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'store-active'\">\r\n    <path d=\"M2.10059 8.3501V14.9401C2.10058 15.7659 2.42791 16.5579 3.01086 17.1428C3.59382 17.7276 4.38489 18.0575 5.21063 18.0601H14.8506C15.6763 18.0575 16.4673 17.7276 17.0503 17.1428C17.6332 16.5579 17.9606 15.7659 17.9606 14.9401V8.3501\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M14.1504 11.55V13.57\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M17.4404 0.900024H2.62042C2.16425 0.900024 1.72674 1.08125 1.40417 1.40381C1.08161 1.72637 0.900391 2.16388 0.900391 2.62006V5.96002C0.900391 6.76628 1.22072 7.53951 1.79083 8.10962C2.36094 8.67973 3.13417 9.00006 3.94043 9.00006C4.74669 9.00006 5.51992 8.67973 6.09003 8.10962C6.66014 7.53951 6.98041 6.76628 6.98041 5.96002C6.98041 6.75567 7.29646 7.51875 7.85907 8.08136C8.42168 8.64397 9.18476 8.96002 9.98041 8.96002C10.7761 8.96002 11.5391 8.64397 12.1017 8.08136C12.6644 7.51875 12.9804 6.75567 12.9804 5.96002C12.9804 6.76628 13.3007 7.53951 13.8708 8.10962C14.4409 8.67973 15.2142 9.00006 16.0204 9.00006C16.8267 9.00006 17.5999 8.67973 18.17 8.10962C18.7402 7.53951 19.0604 6.76628 19.0604 5.96002V2.62006C19.0612 2.18069 18.8938 1.7577 18.5925 1.43787C18.2913 1.11803 17.8791 0.925568 17.4404 0.900024Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M6.98047 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M12.9805 5.95005V4.68005\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'trend'\">\r\n    <path d=\"M15.4 1.5H4.59996C2.72772 1.5 1.20996 3.01775 1.20996 4.89V15.69C1.20996 17.5622 2.72772 19.08 4.59996 19.08H15.4C17.2722 19.08 18.79 17.5622 18.79 15.69V4.89C18.79 3.01775 17.2722 1.5 15.4 1.5Z\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.48047 13.98L6.87042 11.59C6.94761 11.512 7.03954 11.45 7.14081 11.4078C7.24208 11.3655 7.35071 11.3437 7.46045 11.3438C7.57019 11.3437 7.67882 11.3655 7.78009 11.4078C7.88136 11.45 7.97329 11.512 8.05048 11.59L8.70044 12.24C8.85886 12.3927 9.07039 12.4781 9.29047 12.4781C9.51054 12.4781 9.72201 12.3927 9.88043 12.24L14.9705 7.15002\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.04 6.59998H14.69C14.9101 6.59998 15.1213 6.68742 15.2769 6.84308C15.4326 6.99873 15.52 7.20986 15.52 7.42999V9.08002\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'trend-active'\">\r\n    <path d=\"M15.4 1.5H4.59996C2.72772 1.5 1.20996 3.01775 1.20996 4.89V15.69C1.20996 17.5622 2.72772 19.08 4.59996 19.08H15.4C17.2722 19.08 18.79 17.5622 18.79 15.69V4.89C18.79 3.01775 17.2722 1.5 15.4 1.5Z\" [attr.fill]=\"color\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M4.48047 13.98L6.87042 11.59C6.94761 11.512 7.03954 11.45 7.14081 11.4078C7.24208 11.3655 7.35071 11.3437 7.46045 11.3438C7.57019 11.3437 7.67882 11.3655 7.78009 11.4078C7.88136 11.45 7.97329 11.512 8.05048 11.59L8.70044 12.24C8.85886 12.3927 9.07039 12.4781 9.29047 12.4781C9.51054 12.4781 9.72201 12.3927 9.88043 12.24L14.9705 7.15002\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n    <path d=\"M13.04 6.59998H14.69C14.9101 6.59998 15.1213 6.68742 15.2769 6.84308C15.4326 6.99873 15.52 7.20986 15.52 7.42999V9.08002\" stroke=\"white\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'info'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04006 1.2666C3.85153 1.2666 1.26672 3.85141 1.26672 7.03994C1.26672 10.2285 3.85153 12.8133 7.04006 12.8133C10.2286 12.8133 12.8134 10.2285 12.8134 7.03994C12.8134 3.85141 10.2286 1.2666 7.04006 1.2666ZM0.266724 7.03994C0.266724 3.29913 3.29925 0.266602 7.04006 0.266602C10.7809 0.266602 13.8134 3.29913 13.8134 7.03994C13.8134 10.7807 10.7809 13.8133 7.04006 13.8133C3.29925 13.8133 0.266724 10.7807 0.266724 7.03994Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04004 5.91342C7.31618 5.91342 7.54004 6.13728 7.54004 6.41342V10.1868C7.54004 10.4629 7.31618 10.6868 7.04004 10.6868C6.7639 10.6868 6.54004 10.4629 6.54004 10.1868V6.41342C6.54004 6.13728 6.7639 5.91342 7.04004 5.91342Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04003 3.82675C6.66816 3.82675 6.3667 4.12821 6.3667 4.50008C6.3667 4.87196 6.66816 5.17342 7.04003 5.17342C7.4119 5.17342 7.71337 4.87196 7.71337 4.50008C7.71337 4.12821 7.4119 3.82675 7.04003 3.82675Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n\r\n  <svg width=\"10\" height=\"6\" viewBox=\"0 0 10 6\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'chevron-down'\">\r\n    <path d=\"M8.79143 1.43999L5.52736 4.66221C5.38047 4.80714 5.18128 4.88855 4.9736 4.88855C4.76591 4.88855 4.56673 4.80714 4.41983 4.66221L1.15576 1.43999\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n  </svg>\r\n\r\n  <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'help'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.23023 4.55633C7.35845 4.6038 7.47573 4.6761 7.57519 4.76898C7.66603 4.86073 7.73718 4.96965 7.78437 5.08921C7.83228 5.21062 7.85448 5.34042 7.84959 5.47062C7.8493 5.47854 7.84922 5.48648 7.84936 5.49441C7.85215 5.64856 7.82323 5.80168 7.76436 5.94449C7.70815 6.08081 7.62577 6.20504 7.52181 6.31036L6.69715 6.96163L6.68497 6.97161C6.51403 7.11689 6.38164 7.30121 6.29931 7.50852C6.29425 7.52127 6.2898 7.53425 6.28598 7.54742C6.22688 7.75125 6.20065 7.96297 6.20825 8.17481V8.56667C6.20825 8.60597 6.21061 8.6627 6.22592 8.72415C6.24186 8.78811 6.27846 8.88343 6.36709 8.9651C6.45823 9.04909 6.55869 9.0766 6.62017 9.08637C6.659 9.09255 6.69659 9.09336 6.71297 9.0934C6.78023 9.09536 6.84726 9.08458 6.91043 9.06163C6.98196 9.03565 7.047 8.99463 7.10101 8.94132C7.15506 8.88796 7.19659 8.82373 7.22288 8.75318C7.24633 8.69029 7.25723 8.62353 7.25501 8.55659V8.17334C7.25501 8.16572 7.2548 8.15811 7.2544 8.1505C7.24872 8.0443 7.26084 7.93802 7.29016 7.83592C7.33988 7.76781 7.40058 7.70809 7.46991 7.65913L7.47452 7.65578C7.81351 7.40972 8.12816 7.13257 8.41427 6.828C8.42212 6.81964 8.42963 6.81098 8.43679 6.80204C8.74253 6.42017 8.90477 5.94572 8.89627 5.4594C8.90862 5.1882 8.86357 4.91738 8.76392 4.66422C8.66235 4.40618 8.50638 4.1724 8.30635 3.97838C8.11065 3.78652 7.87685 3.63671 7.61965 3.53838C7.36701 3.44179 7.09716 3.39692 6.8265 3.40645C6.44101 3.39819 6.06149 3.50247 5.73561 3.70636C5.40517 3.91311 5.14502 4.21283 4.98871 4.56687C4.96459 4.62149 4.95215 4.68043 4.95215 4.74001V4.87334C4.95215 4.90567 4.95377 4.96067 4.96941 5.02183C4.98634 5.08799 5.02645 5.18715 5.1236 5.2683C5.21831 5.34742 5.31846 5.36813 5.36907 5.37492C5.4108 5.38051 5.45157 5.38008 5.45788 5.38001L5.45864 5.38001C5.48755 5.38001 5.5164 5.37719 5.54475 5.37159L5.61228 5.35825C5.74895 5.33126 5.86452 5.2418 5.92366 5.1172C6.01548 4.92376 6.15009 4.75323 6.31748 4.61811C6.45749 4.53085 6.62104 4.48719 6.7868 4.49306C6.79876 4.49348 6.81073 4.49342 6.82269 4.49288C6.96148 4.48658 7.10013 4.50817 7.23023 4.55633ZM6.95954 9.40353C6.8715 9.37467 6.77821 9.36502 6.68613 9.37517C6.60555 9.38158 6.52677 9.40252 6.45373 9.437C6.38188 9.47093 6.31691 9.51733 6.26188 9.57392C6.20151 9.63156 6.15314 9.70041 6.11959 9.77659C6.08267 9.86042 6.06458 9.95114 6.06653 10.0425C6.06667 10.0488 6.06694 10.0552 6.06736 10.0615C6.07814 10.225 6.1484 10.3791 6.26498 10.4955C6.37542 10.6094 6.5233 10.6811 6.68242 10.6976C6.69388 10.6988 6.70538 10.6996 6.7169 10.6999C6.8147 10.7024 6.91181 10.6827 7.0008 10.6425C7.08435 10.6047 7.15863 10.5496 7.21867 10.4811C7.32351 10.3677 7.38589 10.2224 7.39557 10.0693C7.40483 9.98024 7.39488 9.89016 7.36624 9.80501C7.33476 9.71142 7.28159 9.62643 7.21102 9.55676C7.14043 9.48708 7.05433 9.4346 6.95954 9.40353Z\" [attr.fill]=\"color\"/>\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.91062 1.2666C3.68068 1.2666 1.0623 3.85141 1.0623 7.03994C1.0623 10.2285 3.68068 12.8133 6.91062 12.8133C10.1405 12.8133 12.7589 10.2285 12.7589 7.03994C12.7589 3.85141 10.1405 1.2666 6.91062 1.2666ZM0.0493164 7.03994C0.0493164 3.29913 3.12122 0.266602 6.91062 0.266602C10.7 0.266602 13.7719 3.29913 13.7719 7.03994C13.7719 10.7807 10.7 13.8133 6.91062 13.8133C3.12123 13.8133 0.0493164 10.7807 0.0493164 7.03994Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n\r\n  <svg width=\"23\" height=\"19\" viewBox=\"0 0 23 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'back'\">\r\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.07698 8.65039L9.38861 1.29891C9.68071 1.00522 9.67942 0.530346 9.38573 0.23825C9.09204 -0.0538467 8.61717 -0.0525554 8.32508 0.241132L0.985516 7.6207C0.514506 8.09307 0.25 8.73293 0.25 9.40002C0.25 10.0673 0.514939 10.7076 0.986155 11.18L8.32616 18.53C8.61885 18.8231 9.09372 18.8234 9.38682 18.5307C9.67991 18.238 9.68023 17.7631 9.38754 17.47L2.07783 10.1504L21.6869 10.1504C22.1011 10.1504 22.4369 9.8146 22.4369 9.40039C22.4369 8.98618 22.1011 8.65039 21.6869 8.65039L2.07698 8.65039Z\" [attr.fill]=\"color\"/>\r\n  </svg>\r\n</div>\r\n\r\n\r\n\r\n\r\n", styles: [":host{display:inline-block}.wrap{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.wrap svg{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { contentElem: [{
                type: ViewChild,
                args: ['contentElem']
            }], color: [{
                type: Input
            }] } });

class RippleDirective {
    constructor(_el, renderer) {
        this._el = _el;
        this.renderer = renderer;
        this.renderer.addClass(_el.nativeElement, 'ripple');
    }
    onClick(event) {
        let elem;
        for (let i = 0; i < event.path.length; i++) {
            const e = event.path[i];
            if (e.classList.contains('ripple')) {
                elem = e;
                break;
            }
        }
        let x = event.clientX - elem.offsetLeft;
        let y = event.clientY - elem.offsetTop;
        let rippleElement = this.renderer.createElement('span');
        this.renderer.addClass(rippleElement, 'ripple-effect');
        rippleElement.style.left = x + 'px';
        rippleElement.style.top = y + 'px';
        this._el.nativeElement.appendChild(rippleElement);
        setTimeout(function () {
            rippleElement.remove();
        }, 300);
    }
}
RippleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RippleDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
RippleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.3", type: RippleDirective, selector: "[ripple]", host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RippleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ripple]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class NgCommonModule {
}
NgCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, declarations: [CommaSeparateNumberPipe,
        ConfirmDialogComponent,
        ImageMagnifierDialogComponent,
        LoadingComponent,
        LazyImageDirective,
        IconComponent,
        RippleDirective], imports: [MatDialogModule,
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule], exports: [CommaSeparateNumberPipe,
        LoadingComponent,
        ConfirmDialogComponent,
        LazyImageDirective,
        IconComponent,
        RippleDirective,
        MatDialogModule] });
NgCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, providers: [
        CommaSeparateNumberPipe
    ], imports: [[
            MatDialogModule,
            CommonModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatButtonModule
        ], MatDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CommaSeparateNumberPipe,
                        ConfirmDialogComponent,
                        ImageMagnifierDialogComponent,
                        LoadingComponent,
                        LazyImageDirective,
                        IconComponent,
                        RippleDirective,
                    ],
                    imports: [
                        MatDialogModule,
                        CommonModule,
                        MatIconModule,
                        MatProgressSpinnerModule,
                        MatButtonModule
                    ],
                    providers: [
                        CommaSeparateNumberPipe
                    ],
                    exports: [
                        CommaSeparateNumberPipe,
                        LoadingComponent,
                        ConfirmDialogComponent,
                        LazyImageDirective,
                        IconComponent,
                        RippleDirective,
                        MatDialogModule
                    ],
                    entryComponents: [
                        ConfirmDialogComponent,
                        ImageMagnifierDialogComponent
                    ]
                }]
        }] });

class GollalaMatDialogConfig extends MatDialogConfig {
}
class DialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    alert(message, options) {
        const defaultOptions = {
            width: '32rem',
            data: { message, mode: 'alert' },
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        return this.dialog.open(ConfirmDialogComponent, config).afterClosed();
    }
    confirm(message, options) {
        const defaultOptions = {
            width: '32rem',
            data: { message, mode: 'confirm' },
            disableClose: true,
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        return this.dialog.open(ConfirmDialogComponent, config).afterClosed();
    }
    magnifyImage(src) {
        return this.dialog.open(ImageMagnifierDialogComponent, {
            data: {
                src,
            },
            panelClass: 'magnify',
        }).afterClosed();
    }
    open(componentOrTemplateRef, options) {
        const defaultOptions = {
            width: '32rem',
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        const open = this.dialog.open(componentOrTemplateRef, config);
        open.afterOpened().subscribe(() => {
            if (options && options.scrollBlock) {
                document.body.style.overflow = 'hidden';
                document.documentElement.classList.add('cdk-global-scrollblock');
            }
        });
        open.beforeClosed().subscribe(() => {
            if (options && options.scrollBlock) {
                document.body.style.overflow = '';
                document.documentElement.classList.remove('cdk-global-scrollblock');
            }
        });
        return open;
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });

class RestService {
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
        return this.request(url, Object.assign(Object.assign({}, options), { method }));
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
RestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, deps: [{ token: i1$1.HttpClient }, { token: DialogService }, { token: LoadingService }], target: i0.ɵɵFactoryTarget.Injectable });
RestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }, { type: DialogService }, { type: LoadingService }]; } });

class LocalStorageService {
    constructor() {
        this.localStorage = window.localStorage;
    }
    get isLocalStorageSupported() {
        return !!this.localStorage;
    }
    set(key, item) {
        if (!this.isLocalStorageSupported) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(item));
    }
    setOn(ns, key, item, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        this.set(namespaced, item);
    }
    get(key, parse = true) {
        if (!this.isLocalStorageSupported) {
            return null;
        }
        if (parse) {
            let parsed = null;
            try {
                parsed = JSON.parse(localStorage.getItem(key));
            }
            catch (e) {
                console.error(`JSON parsing error, key: ${key}`, e);
            }
            return parsed;
        }
        return localStorage.getItem(key);
    }
    getOn(ns, key, parse = true, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        return this.get(namespaced, parse);
    }
    remove(key) {
        if (!this.isLocalStorageSupported) {
            return;
        }
        localStorage.removeItem(key);
    }
    removeOn(ns, key, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        localStorage.removeItem(namespaced);
    }
    removeNamespace(ns, separator = ':') {
        const namespaced = ns.join(separator);
        const keys = Object.keys(localStorage);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            if (key.indexOf(namespaced) >= 0) {
                this.remove(key);
            }
        }
    }
    joinBy(ns, key, separator) {
        return [...ns, key].join(separator);
    }
}
LocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const SIGNIN_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/login';
const SIGNEDIN_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/info';
const SEND_EMAIL = 'https://gollala-email-zaj3pqrsqq-du.a.run.app/api/email/send/verification/';
const SIGNOUT_ENDPOINT = '/api/security/v3/signout';
const SIGNUP_ENDPOINT = 'https://commerce-api.gollala.org/customer/auth/register';
const CHANGE_USER_ENDPOINT = '/api/security/v3/changeUser';
const GET_SERVICE_USER_ENDPOINT = '/api/account/serviceUser/get/';
const cypher = {
    initVector: 'wiseSecretVector',
    secretKey: 'wise$billing$key'
};
class SecurityService {
    constructor(restService) {
        this.restService = restService;
        this._signedIn = false;
        this.signedIn$ = new BehaviorSubject(this._signedIn);
    }
    get signedIn() {
        return this._signedIn;
    }
    signUpReqeust(body) {
        return this.restService.POST(SIGNUP_ENDPOINT, {
            body,
            handleError: true,
            responseType: 'text'
        });
    }
    sendEmail(body) {
        return this.restService.POST(SEND_EMAIL, {
            body,
            handleError: true
        });
    }
    getUserInfo() {
        return this.restService.GET(SIGNEDIN_ENDPOINT, {
            handleError: true
        });
    }
    isExpiredToken(token) {
        const { date } = JSON.parse(token);
        const current = +new Date();
        const diff = current - date;
        return diff > 604800000 ? true : false;
    }
    signInRequest(userId, password) {
        return this.restService.POST(SIGNIN_ENDPOINT, {
            body: {
                userId,
                password
            },
            handleError: true,
            responseType: 'text'
        }).pipe(catchError$1((e) => {
            console.log(e);
            return throwError(e);
        }), mergeMap$1(token => {
            const gollalaToken = {
                token,
                date: +new Date()
            };
            localStorage.setItem('gollala_token', JSON.stringify(gollalaToken));
            return this.signedInRequest();
        }));
    }
    signedInRequest() {
        return this.restService.GET(SIGNEDIN_ENDPOINT, {
            handleError: true
        }).pipe(catchError$1(e => {
            this._signedIn = false;
            this.signedIn$.next(false);
            return throwError(e);
        }), map$1((signedIn) => {
            const gollalaToken = localStorage.getItem('gollala_token');
            if (!gollalaToken || (gollalaToken && this.isExpiredToken(gollalaToken))) {
                this._signedIn = false;
                return false;
            }
            this._signedIn = signedIn;
            this.signedIn$.next(Object.assign({}, signedIn));
            return true;
        }));
    }
    signInWithGoogleRequest(idToken, provider) {
        return this.restService.POST(`https://commerce-api.gollala.org/customer/auth/social`, {
            params: {
                idToken,
                provider,
            },
            handleError: true,
            responseType: 'text'
        }).pipe(catchError$1((e) => {
            console.log(e);
            return throwError(e);
        }), mergeMap$1(token => {
            const gollalaToken = {
                token,
                date: +new Date()
            };
            localStorage.setItem('gollala_token', JSON.stringify(gollalaToken));
            return this.signedInRequest();
        }));
    }
    signout() {
        localStorage.removeItem('gollala_token');
        this._signedIn = false;
        this.signedIn$.next(null);
    }
    /**
     * This method will be deprecated after menus and paths are properly set.
     */
    signOutRequest() {
        return this.restService.GET(SIGNOUT_ENDPOINT, {
            responseType: 'text',
            handleError: true,
        }).pipe(catchError$1(e => {
            return throwError(e);
        }), mergeMap$1(result => {
            this._signedIn = false;
            return of(true);
        }));
    }
    changeUser(body) {
        return this.restService.POST(CHANGE_USER_ENDPOINT, {
            body,
            handleError: true,
        });
    }
    fileUploadToPath(file) {
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
    encrypt(text) {
        // 이미 암호화 코드 상태이면 반환
        if (Number.isNaN(+text)) {
            return text;
        }
        const iv = CryptoJS.enc.Utf8.parse(cypher.initVector);
        const key = CryptoJS.enc.Utf8.parse(cypher.secretKey);
        const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 }).toString();
        return encodeURIComponent(encrypted);
    }
    decrypt(text) {
        let decodeText = text;
        let decodeURI = decodeURIComponent(decodeText);
        while (decodeURI != decodeText) {
            decodeText = decodeURI;
            decodeURI = decodeURIComponent(decodeText);
        }
        const iv = CryptoJS.enc.Utf8.parse(cypher.initVector);
        const key = CryptoJS.enc.Utf8.parse(cypher.secretKey);
        const decrypted = CryptoJS.AES.decrypt(decodeURI, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
SecurityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: SecurityService, deps: [{ token: i1$2.RestService }], target: i0.ɵɵFactoryTarget.Injectable });
SecurityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: SecurityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: SecurityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1$2.RestService }]; } });

/*
 * Public API Surface of ng-common-module
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CommaSeparateNumberPipe, ConfirmDialogComponent, DialogService, IconComponent, LazyImageDirective, LoadingComponent, LoadingService, LocalStorageService, NgCommonModule, RestService, RippleDirective, SecurityService };
//# sourceMappingURL=ng-common.mjs.map
