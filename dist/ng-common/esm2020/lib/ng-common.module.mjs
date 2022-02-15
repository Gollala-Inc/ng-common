import { NgModule } from '@angular/core';
import { CommaSeparateNumberPipe } from './pipe/comma-separate-number.pipe';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { ImageMagnifierDialogComponent } from './component/image-magnifier-dialog/image-magnifier-dialog.component';
import { LoadingComponent } from './component/loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LazyImageDirective } from './directive/lazy-image.directive';
import { IconComponent } from './component/icon/icon.component';
import { RippleDirective } from './directive/ripple.directive';
import * as i0 from "@angular/core";
export class NgCommonModule {
}
NgCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, declarations: [CommaSeparateNumberPipe,
        ConfirmDialogComponent,
        ImageMagnifierDialogComponent,
        LoadingComponent,
        LazyImageDirective,
        IconComponent,
        RippleDirective], imports: [MatDialogModule,
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule], exports: [CommaSeparateNumberPipe,
        LoadingComponent,
        ConfirmDialogComponent,
        LazyImageDirective,
        IconComponent,
        RippleDirective,
        MatDialogModule] });
NgCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, providers: [
        CommaSeparateNumberPipe
    ], imports: [[
            MatDialogModule,
            CommonModule,
            MatIconModule,
            MatProgressSpinnerModule
        ], MatDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CommaSeparateNumberPipe,
                        ConfirmDialogComponent,
                        ImageMagnifierDialogComponent,
                        LoadingComponent,
                        LazyImageDirective,
                        IconComponent,
                        RippleDirective,
                    ],
                    imports: [
                        MatDialogModule,
                        CommonModule,
                        MatIconModule,
                        MatProgressSpinnerModule
                    ],
                    providers: [
                        CommaSeparateNumberPipe
                    ],
                    exports: [
                        CommaSeparateNumberPipe,
                        LoadingComponent,
                        ConfirmDialogComponent,
                        LazyImageDirective,
                        IconComponent,
                        RippleDirective,
                        MatDialogModule
                    ],
                    entryComponents: [
                        ConfirmDialogComponent,
                        ImageMagnifierDialogComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL25nLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxxRUFBcUUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQW9DL0QsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkEvQnZCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsNkJBQTZCO1FBQzdCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGVBQWUsYUFHZixlQUFlO1FBQ2YsWUFBWTtRQUNaLGFBQWE7UUFDYix3QkFBd0IsYUFNeEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlO1FBQ2YsZUFBZTs0R0FPTixjQUFjLGFBakJkO1FBQ1QsdUJBQXVCO0tBQ3hCLFlBUlE7WUFDUCxlQUFlO1lBQ2YsWUFBWTtZQUNaLGFBQWE7WUFDYix3QkFBd0I7U0FDekIsRUFXQyxlQUFlOzJGQU9OLGNBQWM7a0JBakMxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsNkJBQTZCO3dCQUM3QixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2Isd0JBQXdCO3FCQUN6QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsZUFBZTtxQkFDaEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHNCQUFzQjt3QkFDdEIsNkJBQTZCO3FCQUM5QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1hU2VwYXJhdGVOdW1iZXJQaXBlfSBmcm9tICcuL3BpcGUvY29tbWEtc2VwYXJhdGUtbnVtYmVyLnBpcGUnO1xuaW1wb3J0IHtDb25maXJtRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHtJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy9pbWFnZS1tYWduaWZpZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQge0xvYWRpbmdDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdFByb2dyZXNzU3Bpbm5lck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XG5pbXBvcnQgeyBMYXp5SW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9sYXp5LWltYWdlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSaXBwbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9yaXBwbGUuZGlyZWN0aXZlJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50LFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgTGF6eUltYWdlRGlyZWN0aXZlLFxuICAgIEljb25Db21wb25lbnQsXG4gICAgUmlwcGxlRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ29tbWFTZXBhcmF0ZU51bWJlclBpcGUsXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIExhenlJbWFnZURpcmVjdGl2ZSxcbiAgICBJY29uQ29tcG9uZW50LFxuICAgIFJpcHBsZURpcmVjdGl2ZSxcbiAgICBNYXREaWFsb2dNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQ29tbW9uTW9kdWxlIHsgfVxuIl19