import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class ConfirmDialogComponent implements OnInit {
    private dialogRef;
    data: {
        message: string;
        mode: string;
    };
    handleKeyboardEvent(event: KeyboardEvent): void;
    constructor(dialogRef: MatDialogRef<ConfirmDialogComponent>, data: {
        message: string;
        mode: string;
    });
    ngOnInit(): void;
    onCloseDialog(boolean?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmDialogComponent, "lib-confirm-dialog", never, {}, {}, never, never>;
}
