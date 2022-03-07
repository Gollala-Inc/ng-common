import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
export class ImageMagnifierDialogComponent {
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
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9jb21wb25lbnQvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy9pbWFnZS1tYWduaWZpZXItZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2NvbXBvbmVudC9pbWFnZS1tYWduaWZpZXItZGlhbG9nL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDOzs7QUFPdkUsTUFBTSxPQUFPLDZCQUE2QjtJQUV4QyxZQUNTLFNBQXNELEVBQzdCLElBQXFCO1FBRDlDLGNBQVMsR0FBVCxTQUFTLENBQTZDO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWlCO0lBQ25ELENBQUM7SUFFTCxRQUFRO0lBQ1IsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7OzBIQVpVLDZCQUE2Qiw4Q0FJOUIsZUFBZTs4R0FKZCw2QkFBNkIsa0VDUjFDLDZEQUNBOzJGRE9hLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSw0QkFBNEI7OzBCQVFuQyxNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudD4sXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IHsgc3JjOiBzdHJpbmcgfSxcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG9uQ2xvc2VEaWFsb2coKSB7XHJcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiPGltZyBbc3JjXT1cImRhdGEuc3JjXCIgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCIvPlxyXG4iXX0=