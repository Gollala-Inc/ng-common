import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface EntryAndObserver {
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
}
export declare class IntersectionObserverService {
    private zone;
    private intersectionObserver;
    private ixIn;
    private ixOut;
    constructor(zone: NgZone);
    observe(elem: HTMLElement): {
        ixIn: Observable<EntryAndObserver>;
        ixOut: Observable<EntryAndObserver>;
    };
    unobserve(elem: HTMLElement): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntersectionObserverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IntersectionObserverService>;
}
