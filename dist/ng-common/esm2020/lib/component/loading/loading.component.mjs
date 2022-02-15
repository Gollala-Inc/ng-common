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
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.3", type: LoadingComponent, selector: "gollala-loading", inputs: { global: "global", backdrop: "backdrop", d: "d" }, outputs: { start: "start", end: "end" }, ngImport: i0, template: "<div class=\"loading-overlay\" [ngClass]=\"{\n    'active': backdrop && (!global || (loading$ && loading$.value)),\n    'loading': !global || (loading$ && loading$.value),\n    'global': global,\n    'fit': !global\n    }\">\n  <div class=\"spinner-container\">\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\n  </div>\n</div>\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"], components: [{ type: i2.MatProgressSpinner, selector: "mat-progress-spinner", inputs: ["color", "diameter", "strokeWidth", "mode", "value"], exportAs: ["matProgressSpinner"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'gollala-loading', template: "<div class=\"loading-overlay\" [ngClass]=\"{\n    'active': backdrop && (!global || (loading$ && loading$.value)),\n    'loading': !global || (loading$ && loading$.value),\n    'global': global,\n    'fit': !global\n    }\">\n  <div class=\"spinner-container\">\n    <mat-progress-spinner *ngIf=\"!global || (loading$ | async)\" mode=\"indeterminate\" [diameter]=\"d\"></mat-progress-spinner>\n  </div>\n</div>\n", styles: [".loading-overlay{z-index:-10}.loading-overlay.fit{top:0;right:0;bottom:0;left:0;position:absolute}.loading-overlay.global{top:0;right:0;bottom:0;left:0;position:fixed}.loading-overlay.active{background-color:#00000026}.loading-overlay.loading{z-index:10000}.loading-overlay .spinner-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}::ng-deep .mat-progress-spinner circle,.mat-spinner circle{stroke:#ee2554}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9jb21wb25lbnQvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2NvbXBvbmVudC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsZUFBZSxFQUFlLE1BQU0sTUFBTSxDQUFDOzs7OztBQVNuRCxNQUFNLE9BQU8sZ0JBQWdCO0lBYzNCLFlBQ1UsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBZC9CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWtCO1FBQ1QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixXQUFXO1FBQ0YsTUFBQyxHQUFHLEdBQUcsQ0FBQztRQUVQLFVBQUssR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxRQUFHLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRW5DLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUkzQyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7WUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksT0FBTyxFQUFFO29CQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3QixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs2R0FyQ1UsZ0JBQWdCO2lHQUFoQixnQkFBZ0IsNEpDVjdCLDhaQVVBOzJGREFhLGdCQUFnQjtrQkFMNUIsU0FBUzsrQkFDRSxpQkFBaUI7cUdBS2xCLE1BQU07c0JBQWQsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLENBQUM7c0JBQVQsS0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csR0FBRztzQkFBWixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtMb2FkaW5nU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZS9sb2FkaW5nLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dvbGxhbGEtbG9hZGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2FkaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9hZGluZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBnbG9iYWwgPSBmYWxzZTtcbiAgLy8gYmFja2dyb3VuZCDsnYzsmIHsspjrpqxcbiAgQElucHV0KCkgYmFja2Ryb3AgPSBmYWxzZTtcbiAgLy8gZGlhbWV0ZXJcbiAgQElucHV0KCkgZCA9IDEwMDtcblxuICBAT3V0cHV0KCkgc3RhcnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVuZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5nbG9iYWwpIHtcbiAgICAgIHRoaXMubG9hZGluZyQgPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLmxvYWRpbmckO1xuICAgICAgY29uc3QgbG9hZGluZ1N1YiA9IHRoaXMubG9hZGluZyQuc3Vic2NyaWJlKGxvYWRpbmcgPT4ge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgIHRoaXMuc3RhcnQubmV4dCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVuZC5uZXh0KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobG9hZGluZ1N1Yik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiB7XG4gICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXlcIiBbbmdDbGFzc109XCJ7XG4gICAgJ2FjdGl2ZSc6IGJhY2tkcm9wICYmICghZ2xvYmFsIHx8IChsb2FkaW5nJCAmJiBsb2FkaW5nJC52YWx1ZSkpLFxuICAgICdsb2FkaW5nJzogIWdsb2JhbCB8fCAobG9hZGluZyQgJiYgbG9hZGluZyQudmFsdWUpLFxuICAgICdnbG9iYWwnOiBnbG9iYWwsXG4gICAgJ2ZpdCc6ICFnbG9iYWxcbiAgICB9XCI+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNvbnRhaW5lclwiPlxuICAgIDxtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciAqbmdJZj1cIiFnbG9iYWwgfHwgKGxvYWRpbmckIHwgYXN5bmMpXCIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBbZGlhbWV0ZXJdPVwiZFwiPjwvbWF0LXByb2dyZXNzLXNwaW5uZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=