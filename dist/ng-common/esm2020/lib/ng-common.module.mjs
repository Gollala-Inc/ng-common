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
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from "./service/dialog.service";
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
        MatProgressSpinnerModule,
        MatButtonModule], exports: [CommaSeparateNumberPipe,
        LoadingComponent,
        ConfirmDialogComponent,
        LazyImageDirective,
        IconComponent,
        RippleDirective,
        MatDialogModule] });
NgCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: NgCommonModule, providers: [
        CommaSeparateNumberPipe,
        DialogService
    ], imports: [[
            MatDialogModule,
            CommonModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatButtonModule
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
                        MatProgressSpinnerModule,
                        MatButtonModule
                    ],
                    providers: [
                        CommaSeparateNumberPipe,
                        DialogService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL25nLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxxRUFBcUUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0FBc0N2RCxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQWpDdkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qiw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsZUFBZSxhQUdmLGVBQWU7UUFDZixZQUFZO1FBQ1osYUFBYTtRQUNiLHdCQUF3QjtRQUN4QixlQUFlLGFBT2YsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlO1FBQ2YsZUFBZTs0R0FPTixjQUFjLGFBbEJkO1FBQ1QsdUJBQXVCO1FBQ3ZCLGFBQWE7S0FDZCxZQVZRO1lBQ1AsZUFBZTtZQUNmLFlBQVk7WUFDWixhQUFhO1lBQ2Isd0JBQXdCO1lBQ3hCLGVBQWU7U0FDaEIsRUFZQyxlQUFlOzJGQU9OLGNBQWM7a0JBbkMxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjt3QkFDdEIsNkJBQTZCO3dCQUM3QixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixZQUFZO3dCQUNaLGFBQWE7d0JBQ2Isd0JBQXdCO3dCQUN4QixlQUFlO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsdUJBQXVCO3dCQUN2QixhQUFhO3FCQUNkO29CQUNELE9BQU8sRUFBRTt3QkFDUCx1QkFBdUI7d0JBQ3ZCLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixlQUFlO3FCQUNoQjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2Ysc0JBQXNCO3dCQUN0Qiw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tYVNlcGFyYXRlTnVtYmVyUGlwZX0gZnJvbSAnLi9waXBlL2NvbW1hLXNlcGFyYXRlLW51bWJlci5waXBlJztcclxuaW1wb3J0IHtDb25maXJtRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQge0ltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9pbWFnZS1tYWduaWZpZXItZGlhbG9nL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHtMb2FkaW5nQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50JztcclxuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQge01hdFByb2dyZXNzU3Bpbm5lck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XHJcbmltcG9ydCB7IExhenlJbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2xhenktaW1hZ2UuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2ljb24vaWNvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSaXBwbGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9yaXBwbGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7RGlhbG9nU2VydmljZX0gZnJvbSBcIi4vc2VydmljZS9kaWFsb2cuc2VydmljZVwiO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcclxuICAgIENvbmZpcm1EaWFsb2dDb21wb25lbnQsXHJcbiAgICBJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudCxcclxuICAgIExvYWRpbmdDb21wb25lbnQsXHJcbiAgICBMYXp5SW1hZ2VEaXJlY3RpdmUsXHJcbiAgICBJY29uQ29tcG9uZW50LFxyXG4gICAgUmlwcGxlRGlyZWN0aXZlLFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcclxuICAgIERpYWxvZ1NlcnZpY2VcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIENvbW1hU2VwYXJhdGVOdW1iZXJQaXBlLFxyXG4gICAgTG9hZGluZ0NvbXBvbmVudCxcclxuICAgIENvbmZpcm1EaWFsb2dDb21wb25lbnQsXHJcbiAgICBMYXp5SW1hZ2VEaXJlY3RpdmUsXHJcbiAgICBJY29uQ29tcG9uZW50LFxyXG4gICAgUmlwcGxlRGlyZWN0aXZlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIENvbmZpcm1EaWFsb2dDb21wb25lbnQsXHJcbiAgICBJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nQ29tbW9uTW9kdWxlIHsgfVxyXG4iXX0=