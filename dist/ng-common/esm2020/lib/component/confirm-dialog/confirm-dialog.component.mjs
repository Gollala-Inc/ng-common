import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/common";
export class ConfirmDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    handleKeyboardEvent(event) {
        if (event.key === 'Enter') {
            this.onCloseDialog(true);
        }
    }
    ngOnInit() {
    }
    onCloseDialog(boolean = false) {
        this.dialogRef.close(boolean);
    }
}
ConfirmDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ConfirmDialogComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ConfirmDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: ConfirmDialogComponent, selector: "lib-confirm-dialog", host: { listeners: { "document:keypress": "handleKeyboardEvent($event)" } }, ngImport: i0, template: "<div class=\"dialog-container\">\n  <div class=\"dialog-header\">\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\n  </div>\n  <div class=\"dialog-body\">\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\n  </div>\n  <div class=\"dialog-footer\">\n    <div class=\"dialog-footer-controls\">\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\n    </div>\n  </div>\n</div>\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}.cancel-btn{background-color:#b2b2b2}\n"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-confirm-dialog', template: "<div class=\"dialog-container\">\n  <div class=\"dialog-header\">\n    <mat-icon class=\"close-btn\" (click)=\"onCloseDialog()\">close</mat-icon>\n  </div>\n  <div class=\"dialog-body\">\n    <div class=\"dialog-body-container\" [innerHTML]=\"data.message\"></div>\n  </div>\n  <div class=\"dialog-footer\">\n    <div class=\"dialog-footer-controls\">\n      <button mat-flat-button (click)=\"onCloseDialog(true)\">\uD655\uC778</button>\n      <button *ngIf=\"data.mode !== 'alert'\" class=\"cancel-btn\" mat-flat-button (click)=\"onCloseDialog(false)\">\uCDE8\uC18C</button>\n    </div>\n  </div>\n</div>\n", styles: [".dialog-header{position:relative;height:3rem}.dialog-header .close-btn{top:0;right:0;position:absolute;width:2.4rem;height:2.4rem;font-size:2.4rem;cursor:pointer;-webkit-user-select:none;user-select:none}.dialog-body{font-size:1.6rem;font-weight:700;position:relative}.dialog-footer{position:relative;margin-top:2rem;height:5rem}.dialog-footer .dialog-footer-controls{width:100%;position:absolute;top:50%;transform:translateY(-50%);text-align:center;height:3.5rem}.dialog-footer .dialog-footer-controls button{width:10rem;height:3.5rem;line-height:3.5rem;background-color:#ee2554;color:#fff;cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.2rem}.dialog-footer .dialog-footer-controls button:hover{background:#d0103d}.dialog-footer .dialog-footer-controls button+button{margin-left:1rem}.dialog-footer .dialog-footer-controls button.cancel-btn{background-color:#b2b2b2}.dialog-footer .dialog-footer-controls button.cancel-btn:hover{background:#999999}.dialog-body-container{text-align:center;word-break:keep-all}.dialog-body-container ::ng-deep .accent{color:#ee2554;font-weight:700}.cancel-btn{background-color:#b2b2b2}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; }, propDecorators: { handleKeyboardEvent: [{
                type: HostListener,
                args: ['document:keypress', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvY29tcG9uZW50L2NvbmZpcm0tZGlhbG9nL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2NvbXBvbmVudC9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQU92RSxNQUFNLE9BQU8sc0JBQXNCO0lBU2pDLFlBQ1UsU0FBK0MsRUFDdkIsSUFBdUM7UUFEL0QsY0FBUyxHQUFULFNBQVMsQ0FBc0M7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBbUM7SUFFekUsQ0FBQztJQVZELG1CQUFtQixDQUFDLEtBQW9CO1FBQ3RDLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFRRCxRQUFRO0lBQ1IsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFPLEdBQUcsS0FBSztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDOzttSEFwQlUsc0JBQXNCLDhDQVd2QixlQUFlO3VHQVhkLHNCQUFzQix1SUNSbkMsaW1CQWNBOzJGRE5hLHNCQUFzQjtrQkFMbEMsU0FBUzsrQkFDRSxvQkFBb0I7OzBCQWUzQixNQUFNOzJCQUFDLGVBQWU7NENBUnpCLG1CQUFtQjtzQkFEbEIsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIEluamVjdCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1jb25maXJtLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maXJtLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybURpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5cHJlc3MnLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgdGhpcy5vbkNsb3NlRGlhbG9nKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29uZmlybURpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiB7IG1lc3NhZ2U6IHN0cmluZywgbW9kZTogc3RyaW5nIH0sXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkNsb3NlRGlhbG9nKGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGJvb2xlYW4pO1xuICB9XG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJkaWFsb2ctY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctaGVhZGVyXCI+XG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY2xvc2UtYnRuXCIgKGNsaWNrKT1cIm9uQ2xvc2VEaWFsb2coKVwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctYm9keS1jb250YWluZXJcIiBbaW5uZXJIVE1MXT1cImRhdGEubWVzc2FnZVwiPjwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1mb290ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWZvb3Rlci1jb250cm9sc1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xvc2VEaWFsb2codHJ1ZSlcIj7tmZXsnbg8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gKm5nSWY9XCJkYXRhLm1vZGUgIT09ICdhbGVydCdcIiBjbGFzcz1cImNhbmNlbC1idG5cIiBtYXQtZmxhdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xvc2VEaWFsb2coZmFsc2UpXCI+7Leo7IaMPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=