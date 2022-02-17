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
ConfirmDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ConfirmDialogComponent, selector: "lib-confirm-dialog", host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, ngImport: i0, template: "<div class=\"dialog-container\">\n  <div class=\"dialog-header\">\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\n  </div>\n  <div class=\"dialog-body\">\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\n  </div>\n  <div class=\"dialog-footer\">\n    <div class=\"dialog-footer-controls\">\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\n    </div>\n  </div>\n</div>\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}button{border:none}.cancel-btn{background-color:#b2b2b2}\n"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-confirm-dialog', template: "<div class=\"dialog-container\">\n  <div class=\"dialog-header\">\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\n  </div>\n  <div class=\"dialog-body\">\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\n  </div>\n  <div class=\"dialog-footer\">\n    <div class=\"dialog-footer-controls\">\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\n    </div>\n  </div>\n</div>\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}button{border:none}.cancel-btn{background-color:#b2b2b2}\n"] }]
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
ImageMagnifierDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ImageMagnifierDialogComponent, selector: "lib-image-magnifier-dialog", ngImport: i0, template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImageMagnifierDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-image-magnifier-dialog', template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] }]
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
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: LoadingComponent, selector: "gollala-loading", inputs: { global: "global", backdrop: "backdrop", d: "d" }, outputs: { start: "start", end: "end" }, ngImport: i0, template: "<div class=\"loading-overlay\" [ngClass]=\"{\n    'active': backdrop && (!global || (loading$ && loading$.value)),\n    'loading': !global || (loading$ && loading$.value),\n    'global': global,\n    'fit': !global\n    }\">\n  <div class=\"spinner-container\">\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\n  </div>\n</div>\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"], components: [{ type: i2$1.MatProgressSpinner, selector: "mat-progress-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }], directives: [{ type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3$1.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-loading', template: "<div class=\"loading-overlay\" [ngClass]=\"{\n    'active': backdrop && (!global || (loading$ && loading$.value)),\n    'loading': !global || (loading$ && loading$.value),\n    'global': global,\n    'fit': !global\n    }\">\n  <div class=\"spinner-container\">\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\n  </div>\n</div>\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"] }]
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
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: IconComponent, selector: "gollala-icon", inputs: { color: "color" }, viewQueries: [{ propertyName: "contentElem", first: true, predicate: ["contentElem"], descendants: true }], ngImport: i0, template: "<div #contentElem style=\"display: none\">\n  <ng-content></ng-content>\n</div>\n<div class=\"wrap\">\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'cart'\">\n    <path d=\"M25.19 8.5H10.81C9.53422 8.5 8.5 9.53422 8.5 10.81V25.19C8.5 26.4658 9.53422 27.5 10.81 27.5H25.19C26.4658 27.5 27.5 26.4658 27.5 25.19V10.81C27.5 9.53422 26.4658 8.5 25.19 8.5Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M22.3299 12.99V14.53C22.3299 15.6784 21.8737 16.7797 21.0617 17.5918C20.2497 18.4038 19.1483 18.86 17.9999 18.86C16.8516 18.86 15.7502 18.4038 14.9381 17.5918C14.1261 16.7797 13.6699 15.6784 13.6699 14.53V12.99\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'excel'\">\n    <path d=\"M11.7 21.288L3.23999 19.938C2.89379 19.8811 2.57908 19.7031 2.35196 19.4356C2.12484 19.1682 2.0001 18.8288 2 18.478V5.82798C2.00045 5.4783 2.12555 5.14025 2.35281 4.87449C2.58008 4.60874 2.89462 4.43268 3.23999 4.37797L11.7 3.01799C11.9102 2.98491 12.1251 2.99756 12.33 3.05506C12.5348 3.11257 12.7249 3.21355 12.8872 3.35118C13.0495 3.4888 13.1803 3.65982 13.2705 3.85255C13.3607 4.04528 13.4083 4.25521 13.41 4.468V19.838C13.41 20.0513 13.3635 20.2621 13.2738 20.4556C13.1841 20.6492 13.0534 20.8209 12.8907 20.9589C12.728 21.0969 12.5372 21.1978 12.3316 21.2546C12.126 21.3114 11.9105 21.3228 11.7 21.288V21.288Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 4.7681H20.6702C20.8916 4.76678 21.1112 4.80926 21.3161 4.8931C21.5211 4.97693 21.7075 5.10047 21.8646 5.25661C22.0216 5.41274 22.1463 5.59839 22.2313 5.80287C22.3164 6.00735 22.3602 6.22663 22.3602 6.4481V17.8481C22.3602 18.2937 22.1832 18.721 21.8681 19.036C21.553 19.3511 21.1257 19.5281 20.6802 19.5281H13.4102V4.7681Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 8.86792H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 12.158H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 15.438H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M6.06982 14.6879L9.32982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9.32982 14.6879L6.06982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user'\">\n    <path d=\"M18.0299 17.22C20.576 17.22 22.6399 15.156 22.6399 12.61C22.6399 10.064 20.576 8 18.0299 8C15.4839 8 13.4199 10.064 13.4199 12.61C13.4199 15.156 15.4839 17.22 18.0299 17.22Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9 27.1601V24.9601C9 24.3512 9.12009 23.7483 9.35339 23.186C9.5867 22.6236 9.92862 22.1127 10.3596 21.6826C10.7906 21.2526 11.3022 20.9117 11.8651 20.6796C12.428 20.4475 13.0311 20.3288 13.64 20.3301H22.43C23.6579 20.3301 24.8356 20.8179 25.7039 21.6862C26.5722 22.5545 27.06 23.7321 27.06 24.9601V27.1601\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'camera'\">\n    <path d=\"M25.86 11.3399H22.64V10.52C22.64 10.1699 22.5008 9.8341 22.2533 9.58655C22.0057 9.339 21.67 9.19995 21.3199 9.19995H13.86C13.5099 9.19995 13.1742 9.339 12.9266 9.58655C12.6791 9.8341 12.5399 10.1699 12.5399 10.52V11.3399H9.31995C8.96986 11.3399 8.63414 11.479 8.3866 11.7266C8.13905 11.9741 8 12.3098 8 12.6599V24.2499C8 24.6 8.13905 24.9357 8.3866 25.1833C8.63414 25.4308 8.96986 25.5699 9.31995 25.5699H25.86C26.2101 25.5699 26.5458 25.4308 26.7933 25.1833C27.0409 24.9357 27.1799 24.6 27.1799 24.2499V12.6599C27.1799 12.3098 27.0409 11.9741 26.7933 11.7266C26.5458 11.479 26.2101 11.3399 25.86 11.3399ZM18.2999 22.0399C17.5313 22.1827 16.7372 22.0749 16.0344 21.7324C15.3316 21.3899 14.7574 20.8308 14.3962 20.1374C14.0351 19.444 13.9061 18.653 14.0283 17.8809C14.1505 17.1087 14.5174 16.3961 15.075 15.8481C15.6325 15.3001 16.3513 14.9456 17.1255 14.8368C17.8997 14.728 18.6884 14.8707 19.3754 15.2438C20.0624 15.6169 20.6115 16.2008 20.9418 16.9094C21.272 17.618 21.366 18.4139 21.21 19.1799C21.0648 19.8922 20.7103 20.545 20.1919 21.0545C19.6734 21.564 19.0146 21.9072 18.2999 22.0399Z\"\n          [attr.fill]=\"color\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'search'\">\n    <path d=\"M16.9406 23.8813C20.7738 23.8813 23.8813 20.7738 23.8813 16.9406C23.8813 13.1074 20.7738 10 16.9406 10C13.1074 10 10 13.1074 10 16.9406C10 20.7738 13.1074 23.8813 16.9406 23.8813Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M22.0181 22.0181L25.9998 25.9998\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"40\" height=\"48\" viewBox=\"0 0 40 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'upload'\">\n    <path d=\"M15.0371 23.5107L19.1356 19.3906C19.2262 19.2965 19.3347 19.2216 19.4547 19.1705C19.5746 19.1194 19.7036 19.093 19.8339 19.093C19.9642 19.093 20.0931 19.1194 20.2131 19.1705C20.3331 19.2216 20.4416 19.2965 20.5322 19.3906L24.6307 23.5107\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M19.8345 19.1008V29.8283\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M14.0359 33.8264H25.6484\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M24.1453 12.5544C24.1493 13.5149 24.5317 14.4348 25.2088 15.1126C25.8859 15.7904 26.8025 16.1709 27.758 16.1709H33.2834L24.1756 7.01514L24.1453 12.5544Z\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M24.145 7H9.99749C9.04335 7 8.12829 7.38102 7.45361 8.05925C6.77893 8.73748 6.3999 9.65735 6.3999 10.6165V37.0309C6.39989 37.9915 6.77843 38.9129 7.45268 39.5936C8.12693 40.2742 9.04195 40.6586 9.99749 40.6627H29.7311C30.6866 40.6586 31.6017 40.2742 32.2759 39.5936C32.9502 38.9129 33.3287 37.9915 33.3287 37.0309V16.171L24.145 7Z\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'download'\">\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"21\" height=\"19\" viewBox=\"0 0 21 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'edit'\">\n    <path d=\"M13.9698 1.38071L17.2498 4.66071C17.3858 4.79553 17.4939 4.95594 17.5676 5.13273C17.6413 5.30952 17.6792 5.49918 17.6792 5.69071C17.6792 5.88225 17.6413 6.07188 17.5676 6.24866C17.4939 6.42545 17.3858 6.5859 17.2498 6.72071L6.51981 17.4507C6.25496 17.7185 5.89633 17.8727 5.51981 17.8807H2.23978C1.85256 17.8807 1.48123 17.7269 1.20743 17.4531C0.933625 17.1793 0.779785 16.8079 0.779785 16.4207V13.1807C0.792848 12.8053 0.946286 12.4484 1.20978 12.1807L11.9398 1.45069C12.2016 1.17546 12.5609 1.01395 12.9405 1.00086C13.3201 0.987772 13.6897 1.12417 13.9698 1.38071V1.38071Z\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9.98975 3.30078L15.2397 8.55078\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M5.8999 17.8806H19.3099\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"17\" height=\"13\" viewBox=\"0 0 17 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'check'\">\n    <path d=\"M5.63642 8.85536L2.10684 5.17599C2.04398 5.11067 1.96918 5.05882 1.88678 5.02344C1.80439 4.98807 1.716 4.96985 1.62674 4.96985C1.53748 4.96985 1.4491 4.98807 1.3667 5.02344C1.2843 5.05882 1.20951 5.11067 1.14665 5.17599L0.200036 6.15157C0.13666 6.21636 0.0863284 6.29344 0.0520003 6.37836C0.0176721 6.46327 0 6.55434 0 6.64633C0 6.73833 0.0176721 6.82941 0.0520003 6.91433C0.0863284 6.99925 0.13666 7.07633 0.200036 7.14111L5.60938 12.7995C5.73806 12.9281 5.91022 13 6.08944 13C6.26866 13 6.44086 12.9281 6.56953 12.7995L16.8067 2.16558C16.9306 2.03532 17 1.8602 17 1.6778C17 1.4954 16.9306 1.32026 16.8067 1.18999L15.8601 0.200455C15.7314 0.0718872 15.5592 0 15.38 0C15.2008 0 15.0286 0.0718872 14.8999 0.200455L6.56953 8.85536C6.50783 8.92026 6.43418 8.97182 6.35291 9.00701C6.27163 9.04221 6.18436 9.06033 6.09621 9.06033C6.00805 9.06033 5.92078 9.04221 5.83951 9.00701C5.75823 8.97182 5.68458 8.92026 5.62288 8.85536H5.63642Z\"\n          [attr.fill]=\"color\"/>\n  </svg>\n\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'remove'\">\n    <path d=\"M9.61768 11.0579H22.4443V21.7245C22.4443 22.4318 22.1634 23.11 21.6633 23.6101C21.1632 24.1102 20.4849 24.3912 19.7777 24.3912H12.3288C11.6215 24.3912 10.9433 24.1102 10.4432 23.6101C9.94307 23.11 9.66212 22.4318 9.66212 21.7245V11.0579H9.61768Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M8 11.0579H24.08\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.2355 8H18.8888C19.2141 8 19.5261 8.12924 19.7562 8.35928C19.9862 8.58933 20.1155 8.90133 20.1155 9.22667V11.0578H12.0088V9.22667C12.0088 8.90133 12.138 8.58933 12.3681 8.35928C12.5981 8.12924 12.9101 8 13.2355 8V8Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.0356 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M19.1646 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M12.9155 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n\n</div>\n\n\n\n\n", styles: [":host{display:inline-block}.wrap{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.wrap svg{width:100%;height:100%}\n"], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-icon', template: "<div #contentElem style=\"display: none\">\n  <ng-content></ng-content>\n</div>\n<div class=\"wrap\">\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'cart'\">\n    <path d=\"M25.19 8.5H10.81C9.53422 8.5 8.5 9.53422 8.5 10.81V25.19C8.5 26.4658 9.53422 27.5 10.81 27.5H25.19C26.4658 27.5 27.5 26.4658 27.5 25.19V10.81C27.5 9.53422 26.4658 8.5 25.19 8.5Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M22.3299 12.99V14.53C22.3299 15.6784 21.8737 16.7797 21.0617 17.5918C20.2497 18.4038 19.1483 18.86 17.9999 18.86C16.8516 18.86 15.7502 18.4038 14.9381 17.5918C14.1261 16.7797 13.6699 15.6784 13.6699 14.53V12.99\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'excel'\">\n    <path d=\"M11.7 21.288L3.23999 19.938C2.89379 19.8811 2.57908 19.7031 2.35196 19.4356C2.12484 19.1682 2.0001 18.8288 2 18.478V5.82798C2.00045 5.4783 2.12555 5.14025 2.35281 4.87449C2.58008 4.60874 2.89462 4.43268 3.23999 4.37797L11.7 3.01799C11.9102 2.98491 12.1251 2.99756 12.33 3.05506C12.5348 3.11257 12.7249 3.21355 12.8872 3.35118C13.0495 3.4888 13.1803 3.65982 13.2705 3.85255C13.3607 4.04528 13.4083 4.25521 13.41 4.468V19.838C13.41 20.0513 13.3635 20.2621 13.2738 20.4556C13.1841 20.6492 13.0534 20.8209 12.8907 20.9589C12.728 21.0969 12.5372 21.1978 12.3316 21.2546C12.126 21.3114 11.9105 21.3228 11.7 21.288V21.288Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 4.7681H20.6702C20.8916 4.76678 21.1112 4.80926 21.3161 4.8931C21.5211 4.97693 21.7075 5.10047 21.8646 5.25661C22.0216 5.41274 22.1463 5.59839 22.2313 5.80287C22.3164 6.00735 22.3602 6.22663 22.3602 6.4481V17.8481C22.3602 18.2937 22.1832 18.721 21.8681 19.036C21.553 19.3511 21.1257 19.5281 20.6802 19.5281H13.4102V4.7681Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 8.86792H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 12.158H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.4102 15.438H17.2302\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M6.06982 14.6879L9.32982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9.32982 14.6879L6.06982 9.61792\" [attr.stroke]=\"color\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'user'\">\n    <path d=\"M18.0299 17.22C20.576 17.22 22.6399 15.156 22.6399 12.61C22.6399 10.064 20.576 8 18.0299 8C15.4839 8 13.4199 10.064 13.4199 12.61C13.4199 15.156 15.4839 17.22 18.0299 17.22Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9 27.1601V24.9601C9 24.3512 9.12009 23.7483 9.35339 23.186C9.5867 22.6236 9.92862 22.1127 10.3596 21.6826C10.7906 21.2526 11.3022 20.9117 11.8651 20.6796C12.428 20.4475 13.0311 20.3288 13.64 20.3301H22.43C23.6579 20.3301 24.8356 20.8179 25.7039 21.6862C26.5722 22.5545 27.06 23.7321 27.06 24.9601V27.1601\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'camera'\">\n    <path d=\"M25.86 11.3399H22.64V10.52C22.64 10.1699 22.5008 9.8341 22.2533 9.58655C22.0057 9.339 21.67 9.19995 21.3199 9.19995H13.86C13.5099 9.19995 13.1742 9.339 12.9266 9.58655C12.6791 9.8341 12.5399 10.1699 12.5399 10.52V11.3399H9.31995C8.96986 11.3399 8.63414 11.479 8.3866 11.7266C8.13905 11.9741 8 12.3098 8 12.6599V24.2499C8 24.6 8.13905 24.9357 8.3866 25.1833C8.63414 25.4308 8.96986 25.5699 9.31995 25.5699H25.86C26.2101 25.5699 26.5458 25.4308 26.7933 25.1833C27.0409 24.9357 27.1799 24.6 27.1799 24.2499V12.6599C27.1799 12.3098 27.0409 11.9741 26.7933 11.7266C26.5458 11.479 26.2101 11.3399 25.86 11.3399ZM18.2999 22.0399C17.5313 22.1827 16.7372 22.0749 16.0344 21.7324C15.3316 21.3899 14.7574 20.8308 14.3962 20.1374C14.0351 19.444 13.9061 18.653 14.0283 17.8809C14.1505 17.1087 14.5174 16.3961 15.075 15.8481C15.6325 15.3001 16.3513 14.9456 17.1255 14.8368C17.8997 14.728 18.6884 14.8707 19.3754 15.2438C20.0624 15.6169 20.6115 16.2008 20.9418 16.9094C21.272 17.618 21.366 18.4139 21.21 19.1799C21.0648 19.8922 20.7103 20.545 20.1919 21.0545C19.6734 21.564 19.0146 21.9072 18.2999 22.0399Z\"\n          [attr.fill]=\"color\"/>\n  </svg>\n\n  <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'search'\">\n    <path d=\"M16.9406 23.8813C20.7738 23.8813 23.8813 20.7738 23.8813 16.9406C23.8813 13.1074 20.7738 10 16.9406 10C13.1074 10 10 13.1074 10 16.9406C10 20.7738 13.1074 23.8813 16.9406 23.8813Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M22.0181 22.0181L25.9998 25.9998\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"40\" height=\"48\" viewBox=\"0 0 40 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'upload'\">\n    <path d=\"M15.0371 23.5107L19.1356 19.3906C19.2262 19.2965 19.3347 19.2216 19.4547 19.1705C19.5746 19.1194 19.7036 19.093 19.8339 19.093C19.9642 19.093 20.0931 19.1194 20.2131 19.1705C20.3331 19.2216 20.4416 19.2965 20.5322 19.3906L24.6307 23.5107\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M19.8345 19.1008V29.8283\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M14.0359 33.8264H25.6484\" [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M24.1453 12.5544C24.1493 13.5149 24.5317 14.4348 25.2088 15.1126C25.8859 15.7904 26.8025 16.1709 27.758 16.1709H33.2834L24.1756 7.01514L24.1453 12.5544Z\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M24.145 7H9.99749C9.04335 7 8.12829 7.38102 7.45361 8.05925C6.77893 8.73748 6.3999 9.65735 6.3999 10.6165V37.0309C6.39989 37.9915 6.77843 38.9129 7.45268 39.5936C8.12693 40.2742 9.04195 40.6586 9.99749 40.6627H29.7311C30.6866 40.6586 31.6017 40.2742 32.2759 39.5936C32.9502 38.9129 33.3287 37.9915 33.3287 37.0309V16.171L24.145 7Z\"\n          [attr.stroke]=\"color\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'download'\">\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M20.8044 15.4148L17.0426 19.1668C16.9589 19.2509 16.8594 19.3176 16.7498 19.3632C16.6402 19.4087 16.5227 19.4321 16.4041 19.4321C16.2854 19.4321 16.1679 19.4087 16.0583 19.3632C15.9487 19.3176 15.8492 19.2509 15.7655 19.1668L12.0037 15.4148\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.4089 19.4341V8\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M25.0316 20.1072V21.8297C25.029 22.2018 24.88 22.5578 24.617 22.8209C24.3539 23.084 23.9978 23.2329 23.6258 23.2355H9.18223C8.81112 23.2329 8.45611 23.0836 8.19462 22.8203C7.93313 22.5569 7.78637 22.2009 7.78638 21.8297V20.1072\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"21\" height=\"19\" viewBox=\"0 0 21 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'edit'\">\n    <path d=\"M13.9698 1.38071L17.2498 4.66071C17.3858 4.79553 17.4939 4.95594 17.5676 5.13273C17.6413 5.30952 17.6792 5.49918 17.6792 5.69071C17.6792 5.88225 17.6413 6.07188 17.5676 6.24866C17.4939 6.42545 17.3858 6.5859 17.2498 6.72071L6.51981 17.4507C6.25496 17.7185 5.89633 17.8727 5.51981 17.8807H2.23978C1.85256 17.8807 1.48123 17.7269 1.20743 17.4531C0.933625 17.1793 0.779785 16.8079 0.779785 16.4207V13.1807C0.792848 12.8053 0.946286 12.4484 1.20978 12.1807L11.9398 1.45069C12.2016 1.17546 12.5609 1.01395 12.9405 1.00086C13.3201 0.987772 13.6897 1.12417 13.9698 1.38071V1.38071Z\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M9.98975 3.30078L15.2397 8.55078\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M5.8999 17.8806H19.3099\" [attr.stroke]=\"color\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n  <svg width=\"17\" height=\"13\" viewBox=\"0 0 17 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'check'\">\n    <path d=\"M5.63642 8.85536L2.10684 5.17599C2.04398 5.11067 1.96918 5.05882 1.88678 5.02344C1.80439 4.98807 1.716 4.96985 1.62674 4.96985C1.53748 4.96985 1.4491 4.98807 1.3667 5.02344C1.2843 5.05882 1.20951 5.11067 1.14665 5.17599L0.200036 6.15157C0.13666 6.21636 0.0863284 6.29344 0.0520003 6.37836C0.0176721 6.46327 0 6.55434 0 6.64633C0 6.73833 0.0176721 6.82941 0.0520003 6.91433C0.0863284 6.99925 0.13666 7.07633 0.200036 7.14111L5.60938 12.7995C5.73806 12.9281 5.91022 13 6.08944 13C6.26866 13 6.44086 12.9281 6.56953 12.7995L16.8067 2.16558C16.9306 2.03532 17 1.8602 17 1.6778C17 1.4954 16.9306 1.32026 16.8067 1.18999L15.8601 0.200455C15.7314 0.0718872 15.5592 0 15.38 0C15.2008 0 15.0286 0.0718872 14.8999 0.200455L6.56953 8.85536C6.50783 8.92026 6.43418 8.97182 6.35291 9.00701C6.27163 9.04221 6.18436 9.06033 6.09621 9.06033C6.00805 9.06033 5.92078 9.04221 5.83951 9.00701C5.75823 8.97182 5.68458 8.92026 5.62288 8.85536H5.63642Z\"\n          [attr.fill]=\"color\"/>\n  </svg>\n\n  <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"content === 'remove'\">\n    <path d=\"M9.61768 11.0579H22.4443V21.7245C22.4443 22.4318 22.1634 23.11 21.6633 23.6101C21.1632 24.1102 20.4849 24.3912 19.7777 24.3912H12.3288C11.6215 24.3912 10.9433 24.1102 10.4432 23.6101C9.94307 23.11 9.66212 22.4318 9.66212 21.7245V11.0579H9.61768Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M8 11.0579H24.08\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M13.2355 8H18.8888C19.2141 8 19.5261 8.12924 19.7562 8.35928C19.9862 8.58933 20.1155 8.90133 20.1155 9.22667V11.0578H12.0088V9.22667C12.0088 8.90133 12.138 8.58933 12.3681 8.35928C12.5981 8.12924 12.9101 8 13.2355 8V8Z\"\n          [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M16.0356 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M19.1646 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path d=\"M12.9155 17.6533V21.0489\" [attr.stroke]=\"color\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  </svg>\n\n\n</div>\n\n\n\n\n", styles: [":host{display:inline-block}.wrap{display:flex;width:100%;height:100%;align-items:center;justify-content:center}.wrap svg{width:100%;height:100%}\n"] }]
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

/*
 * Public API Surface of ng-common-module
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CommaSeparateNumberPipe, ConfirmDialogComponent, DialogService, IconComponent, LazyImageDirective, LoadingComponent, LoadingService, LocalStorageService, NgCommonModule, RestService, RippleDirective };
//# sourceMappingURL=ng-common.mjs.map
