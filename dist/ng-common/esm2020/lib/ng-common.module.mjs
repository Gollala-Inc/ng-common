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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL25nLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxxRUFBcUUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFxQ3pELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBaEN2Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLDZCQUE2QjtRQUM3QixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlLGFBR2YsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2Isd0JBQXdCO1FBQ3hCLGVBQWUsYUFNZix1QkFBdUI7UUFDdkIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGVBQWU7UUFDZixlQUFlOzRHQU9OLGNBQWMsYUFqQmQ7UUFDVCx1QkFBdUI7S0FDeEIsWUFUUTtZQUNQLGVBQWU7WUFDZixZQUFZO1lBQ1osYUFBYTtZQUNiLHdCQUF3QjtZQUN4QixlQUFlO1NBQ2hCLEVBV0MsZUFBZTsyRkFPTixjQUFjO2tCQWxDMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLDZCQUE2Qjt3QkFDN0IsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixhQUFhO3dCQUNiLHdCQUF3Qjt3QkFDeEIsZUFBZTtxQkFDaEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGVBQWU7cUJBQ2hCO29CQUNELGVBQWUsRUFBRTt3QkFDZixzQkFBc0I7d0JBQ3RCLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tYVNlcGFyYXRlTnVtYmVyUGlwZX0gZnJvbSAnLi9waXBlL2NvbW1hLXNlcGFyYXRlLW51bWJlci5waXBlJztcbmltcG9ydCB7Q29uZmlybURpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7SW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2ltYWdlLW1hZ25pZmllci1kaWFsb2cvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHtMb2FkaW5nQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuaW1wb3J0IHsgTGF6eUltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvbGF6eS1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L2ljb24vaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmlwcGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvcmlwcGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50LFxuICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgTGF6eUltYWdlRGlyZWN0aXZlLFxuICAgIEljb25Db21wb25lbnQsXG4gICAgUmlwcGxlRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29tbWFTZXBhcmF0ZU51bWJlclBpcGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxuICAgIENvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgTGF6eUltYWdlRGlyZWN0aXZlLFxuICAgIEljb25Db21wb25lbnQsXG4gICAgUmlwcGxlRGlyZWN0aXZlLFxuICAgIE1hdERpYWxvZ01vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdDb21tb25Nb2R1bGUgeyB9XG4iXX0=