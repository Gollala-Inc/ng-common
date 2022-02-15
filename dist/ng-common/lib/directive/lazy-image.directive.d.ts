import { ElementRef, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IntersectionObserverService } from '../service/intersection-observer.service';
import * as i0 from "@angular/core";
interface LazyImageEvent {
    el: ElementRef;
    src: string;
    intersectionObserver: IntersectionObserver | undefined;
    event?: Event | null;
}
interface LoadEvent {
    src: string;
    event: Event | null;
}
export declare class LazyImageDirective {
    private el;
    private ioService;
    lazySrc: string | undefined;
    ioOptions: any;
    retryLimit: number;
    beforeLoad: EventEmitter<LazyImageEvent>;
    afterLoad: EventEmitter<LazyImageEvent>;
    onError: EventEmitter<LazyImageEvent>;
    load$: BehaviorSubject<LoadEvent | null>;
    retry$: BehaviorSubject<number>;
    status: string;
    subscriptions: Subscription[];
    ne: HTMLElement | undefined;
    observer: IntersectionObserver | undefined;
    constructor(el: ElementRef, ioService: IntersectionObserverService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private setup;
    private initSubscriptions;
    private unsubscribeAll;
    /**
     * try retrieve image from cache. if the image doesn't exist, try request.
     * @param url
     */
    private loadImage;
    private loadImageFromUrl;
    private attachIntersectionObserver;
    private beforeLoaded;
    private error;
    private populateBackgroundStyles;
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyImageDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LazyImageDirective, "[lazyImage]", never, { "lazySrc": "lazyImage"; "ioOptions": "ioOptions"; "retryLimit": "retryLimit"; }, { "beforeLoad": "beforeLoad"; "afterLoad": "afterLoad"; "onError": "onError"; }, never>;
}
export {};
