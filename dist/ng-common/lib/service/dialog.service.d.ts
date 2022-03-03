import { TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import * as i0 from "@angular/core";
declare class GollalaMatDialogConfig<D = any> extends MatDialogConfig {
    scrollBlock?: boolean;
}
export declare class DialogService {
    private dialog;
    constructor(dialog: MatDialog);
    getDialogRef(componentName: string): any;
    alert(message: string, options?: GollalaMatDialogConfig): Observable<any>;
    confirm(message: string, options?: MatDialogConfig): Observable<any>;
    magnifyImage(src: string): Observable<any>;
    open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, options?: GollalaMatDialogConfig<D>): MatDialogRef<T, R>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}
export {};
