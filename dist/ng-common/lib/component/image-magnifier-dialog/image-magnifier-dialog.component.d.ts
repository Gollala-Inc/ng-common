import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class ImageMagnifierDialogComponent implements OnInit {
    dialogRef: MatDialogRef<ImageMagnifierDialogComponent>;
    data: {
        src: string;
    };
    constructor(dialogRef: MatDialogRef<ImageMagnifierDialogComponent>, data: {
        src: string;
    });
    ngOnInit(): void;
    onCloseDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageMagnifierDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageMagnifierDialogComponent, "lib-image-magnifier-dialog", never, {}, {}, never, never>;
}
