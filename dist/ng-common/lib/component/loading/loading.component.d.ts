import { EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
import * as i0 from "@angular/core";
export declare class LoadingComponent implements OnInit {
    private loadingService;
    global: boolean;
    backdrop: boolean;
    d: number;
    start: EventEmitter<boolean>;
    end: EventEmitter<boolean>;
    subscriptions: Subscription[];
    loading$: BehaviorSubject<boolean>;
    constructor(loadingService: LoadingService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingComponent, "gollala-loading", never, { "global": "global"; "backdrop": "backdrop"; "d": "d"; }, { "start": "start"; "end": "end"; }, never, never>;
}
