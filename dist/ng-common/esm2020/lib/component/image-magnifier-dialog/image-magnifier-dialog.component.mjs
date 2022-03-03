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
ImageMagnifierDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ImageMagnifierDialogComponent, selector: "lib-image-magnifier-dialog", ngImport: i0, template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ImageMagnifierDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-image-magnifier-dialog', template: "<img [src]=\"data.src\" (click)=\"dialogRef.close()\"/>\n", styles: ["img{width:100%;height:100%;max-width:100vw;max-height:100vh;cursor:pointer;object-fit:contain;object-position:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9jb21wb25lbnQvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy9pbWFnZS1tYWduaWZpZXItZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2NvbXBvbmVudC9pbWFnZS1tYWduaWZpZXItZGlhbG9nL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDOzs7QUFPdkUsTUFBTSxPQUFPLDZCQUE2QjtJQUV4QyxZQUNTLFNBQXNELEVBQzdCLElBQXFCO1FBRDlDLGNBQVMsR0FBVCxTQUFTLENBQTZDO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWlCO0lBQ25ELENBQUM7SUFFTCxRQUFRO0lBQ1IsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7OzBIQVpVLDZCQUE2Qiw4Q0FJOUIsZUFBZTs4R0FKZCw2QkFBNkIsa0VDUjFDLDJEQUNBOzJGRE9hLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSw0QkFBNEI7OzBCQVFuQyxNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWltYWdlLW1hZ25pZmllci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IHsgc3JjOiBzdHJpbmcgfSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uQ2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG59XG4iLCI8aW1nIFtzcmNdPVwiZGF0YS5zcmNcIiAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIi8+XG4iXX0=