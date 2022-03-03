import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LoadingService {
    loading$: BehaviorSubject<boolean>;
    constructor();
    start(): void;
    stop(ms?: number): void;
    /**
     * NOTE: 다른 로딩과 겹치지 않게 사용할 것
     * @param ms 로딩 노출 시간
     */
    displayLoading(ms?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoadingService>;
}
