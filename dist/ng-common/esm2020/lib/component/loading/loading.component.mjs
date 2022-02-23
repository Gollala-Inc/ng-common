import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../service/loading.service";
import * as i2 from "@angular/material/progress-spinner";
import * as i3 from "@angular/common";
export class LoadingComponent {
    constructor(loadingService) {
        this.loadingService = loadingService;
        this.global = false;
        // background 음영처리
        this.backdrop = false;
        // diameter
        this.d = 100;
        this.start = new EventEmitter();
        this.end = new EventEmitter();
        this.subscriptions = [];
        this.loading$ = new BehaviorSubject(false);
    }
    ngOnInit() {
        if (this.global) {
            this.loading$ = this.loadingService.loading$;
            const loadingSub = this.loading$.subscribe(loading => {
                if (loading) {
                    this.start.next(true);
                }
                else {
                    this.end.next(true);
                }
            });
            this.subscriptions.push(loadingSub);
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, deps: [{ token: i1.LoadingService }], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: LoadingComponent, selector: "gollala-loading", inputs: { global: "global", backdrop: "backdrop", d: "d" }, outputs: { start: "start", end: "end" }, ngImport: i0, template: "<div class=\"loading-overlay\" [ngClass]=\"{\r\n    'active': backdrop && (!global || (loading$ && loading$.value)),\r\n    'loading': !global || (loading$ && loading$.value),\r\n    'global': global,\r\n    'fit': !global\r\n    }\">\r\n  <div class=\"spinner-container\">\r\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\r\n  </div>\r\n</div>\r\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"], components: [{ type: i2.MatProgressSpinner, selector: "mat-progress-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-loading', template: "<div class=\"loading-overlay\" [ngClass]=\"{\r\n    'active': backdrop && (!global || (loading$ && loading$.value)),\r\n    'loading': !global || (loading$ && loading$.value),\r\n    'global': global,\r\n    'fit': !global\r\n    }\">\r\n  <div class=\"spinner-container\">\r\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\r\n  </div>\r\n</div>\r\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.LoadingService }]; }, propDecorators: { global: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], d: [{
                type: Input
            }], start: [{
                type: Output
            }], end: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9jb21wb25lbnQvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2NvbXBvbmVudC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFlLE1BQU0sTUFBTSxDQUFDOzs7OztBQVNuRCxNQUFNLE9BQU8sZ0JBQWdCO0lBYzNCLFlBQ1UsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBZC9CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWtCO1FBQ1QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixXQUFXO1FBQ0YsTUFBQyxHQUFHLEdBQUcsQ0FBQztRQUVQLFVBQUssR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxRQUFHLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRW5DLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUkzQyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7WUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksT0FBTyxFQUFFO29CQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3QixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs2R0FyQ1UsZ0JBQWdCO2lHQUFoQixnQkFBZ0IsNEpDVjdCLGtiQVVBOzJGREFhLGdCQUFnQjtrQkFMNUIsU0FBUzsrQkFDRSxpQkFBaUI7cUdBS2xCLE1BQU07c0JBQWQsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLENBQUM7c0JBQVQsS0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csR0FBRztzQkFBWixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7TG9hZGluZ1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvbG9hZGluZy5zZXJ2aWNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dvbGxhbGEtbG9hZGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvYWRpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xvYWRpbmcuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZ2xvYmFsID0gZmFsc2U7XHJcbiAgLy8gYmFja2dyb3VuZCDsnYzsmIHsspjrpqxcclxuICBASW5wdXQoKSBiYWNrZHJvcCA9IGZhbHNlO1xyXG4gIC8vIGRpYW1ldGVyXHJcbiAgQElucHV0KCkgZCA9IDEwMDtcclxuXHJcbiAgQE91dHB1dCgpIHN0YXJ0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGVuZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZyQgPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLmxvYWRpbmckO1xyXG4gICAgICBjb25zdCBsb2FkaW5nU3ViID0gdGhpcy5sb2FkaW5nJC5zdWJzY3JpYmUobG9hZGluZyA9PiB7XHJcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcclxuICAgICAgICAgIHRoaXMuc3RhcnQubmV4dCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5lbmQubmV4dCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobG9hZGluZ1N1Yik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImxvYWRpbmctb3ZlcmxheVwiIFtuZ0NsYXNzXT1cIntcclxuICAgICdhY3RpdmUnOiBiYWNrZHJvcCAmJiAoIWdsb2JhbCB8fCAobG9hZGluZyQgJiYgbG9hZGluZyQudmFsdWUpKSxcclxuICAgICdsb2FkaW5nJzogIWdsb2JhbCB8fCAobG9hZGluZyQgJiYgbG9hZGluZyQudmFsdWUpLFxyXG4gICAgJ2dsb2JhbCc6IGdsb2JhbCxcclxuICAgICdmaXQnOiAhZ2xvYmFsXHJcbiAgICB9XCI+XHJcbiAgPGRpdiBjbGFzcz1cInNwaW5uZXItY29udGFpbmVyXCI+XHJcbiAgICA8bWF0LXByb2dyZXNzLXNwaW5uZXIgKm5nSWY9XCIhZ2xvYmFsIHx8IChsb2FkaW5nJCB8IGFzeW5jKVwiIG1vZGU9XCJpbmRldGVybWluYXRlXCIgW2RpYW1ldGVyXT1cImRcIj48L21hdC1wcm9ncmVzcy1zcGlubmVyPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19