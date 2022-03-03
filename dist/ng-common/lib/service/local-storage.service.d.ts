import * as i0 from "@angular/core";
export declare class LocalStorageService {
    localStorage: Storage;
    constructor();
    get isLocalStorageSupported(): boolean;
    set(key: string, item: any): void;
    setOn(ns: string[], key: string, item: any, separator?: string): void;
    get(key: string, parse?: boolean): any;
    getOn(ns: string[], key: string, parse?: boolean, separator?: string): any;
    remove(key: string): void;
    removeOn(ns: string[], key: string, separator?: string): void;
    removeNamespace(ns: string[], separator?: string): void;
    private joinBy;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}
