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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL25nLWNvbW1vbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxxRUFBcUUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFxQ3pELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBaEN2Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLDZCQUE2QjtRQUM3QixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlLGFBR2YsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2Isd0JBQXdCO1FBQ3hCLGVBQWUsYUFNZix1QkFBdUI7UUFDdkIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGVBQWU7UUFDZixlQUFlOzRHQU9OLGNBQWMsYUFqQmQ7UUFDVCx1QkFBdUI7S0FDeEIsWUFUUTtZQUNQLGVBQWU7WUFDZixZQUFZO1lBQ1osYUFBYTtZQUNiLHdCQUF3QjtZQUN4QixlQUFlO1NBQ2hCLEVBV0MsZUFBZTsyRkFPTixjQUFjO2tCQWxDMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLDZCQUE2Qjt3QkFDN0IsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixhQUFhO3dCQUNiLHdCQUF3Qjt3QkFDeEIsZUFBZTtxQkFDaEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsZ0JBQWdCO3dCQUNoQixzQkFBc0I7d0JBQ3RCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGVBQWU7cUJBQ2hCO29CQUNELGVBQWUsRUFBRTt3QkFDZixzQkFBc0I7d0JBQ3RCLDZCQUE2QjtxQkFDOUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1hU2VwYXJhdGVOdW1iZXJQaXBlfSBmcm9tICcuL3BpcGUvY29tbWEtc2VwYXJhdGUtbnVtYmVyLnBpcGUnO1xyXG5pbXBvcnQge0NvbmZpcm1EaWFsb2dDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2NvbmZpcm0tZGlhbG9nL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2ltYWdlLW1hZ25pZmllci1kaWFsb2cvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xvYWRpbmdDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQnO1xyXG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7TWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcclxuaW1wb3J0IHsgTGF6eUltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvbGF6eS1pbWFnZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvaWNvbi9pY29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJpcHBsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3JpcHBsZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29tbWFTZXBhcmF0ZU51bWJlclBpcGUsXHJcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgSW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnQsXHJcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxyXG4gICAgTGF6eUltYWdlRGlyZWN0aXZlLFxyXG4gICAgSWNvbkNvbXBvbmVudCxcclxuICAgIFJpcHBsZURpcmVjdGl2ZSxcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ29tbWFTZXBhcmF0ZU51bWJlclBpcGUsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBDb21tYVNlcGFyYXRlTnVtYmVyUGlwZSxcclxuICAgIExvYWRpbmdDb21wb25lbnQsXHJcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgTGF6eUltYWdlRGlyZWN0aXZlLFxyXG4gICAgSWNvbkNvbXBvbmVudCxcclxuICAgIFJpcHBsZURpcmVjdGl2ZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBDb25maXJtRGlhbG9nQ29tcG9uZW50LFxyXG4gICAgSW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ0NvbW1vbk1vZHVsZSB7IH1cclxuIl19