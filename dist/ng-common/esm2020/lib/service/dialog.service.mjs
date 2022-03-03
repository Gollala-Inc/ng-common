import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { ImageMagnifierDialogComponent } from '../component/image-magnifier-dialog/image-magnifier-dialog.component';
import { NgCommonModule } from "../ng-common.module";
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
class GollalaMatDialogConfig extends MatDialogConfig {
}
export class DialogService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    alert(message, options) {
        const defaultOptions = {
            width: '32rem',
            data: { message, mode: 'alert' },
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        return this.dialog.open(ConfirmDialogComponent, config).afterClosed();
    }
    confirm(message, options) {
        const defaultOptions = {
            width: '32rem',
            data: { message, mode: 'confirm' },
            disableClose: true,
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        return this.dialog.open(ConfirmDialogComponent, config).afterClosed();
    }
    magnifyImage(src) {
        return this.dialog.open(ImageMagnifierDialogComponent, {
            data: {
                src,
            },
            panelClass: 'magnify',
        }).afterClosed();
    }
    open(componentOrTemplateRef, options) {
        const defaultOptions = {
            width: '32rem',
            scrollStrategy: new NoopScrollStrategy(),
            closeOnNavigation: true
        };
        let config = defaultOptions;
        if (options) {
            config = Object.assign(defaultOptions, options);
        }
        const open = this.dialog.open(componentOrTemplateRef, config);
        open.afterOpened().subscribe(() => {
            if (options && options.scrollBlock) {
                document.body.style.overflow = 'hidden';
                document.documentElement.classList.add('cdk-global-scrollblock');
            }
        });
        open.beforeClosed().subscribe(() => {
            if (options && options.scrollBlock) {
                document.body.style.overflow = '';
                document.documentElement.classList.remove('cdk-global-scrollblock');
            }
        });
        return open;
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, deps: [{ token: i1.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, providedIn: NgCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: NgCommonModule
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFZLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWxGLE9BQU8sRUFBZ0Isa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQztBQUNuSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7OztBQUluRCxNQUFNLHNCQUFnQyxTQUFRLGVBQWU7Q0FFNUQ7QUFLRCxNQUFNLE9BQU8sYUFBYTtJQUV4QixZQUNVLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDeEIsQ0FBQztJQUVKLEtBQUssQ0FBQyxPQUFlLEVBQUUsT0FBZ0M7UUFDckQsTUFBTSxjQUFjLEdBQUc7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztZQUM5QixjQUFjLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBZSxFQUFFLE9BQXlCO1FBQ2hELE1BQU0sY0FBYyxHQUFHO1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7WUFDaEMsWUFBWSxFQUFFLElBQUk7WUFDbEIsY0FBYyxFQUFFLElBQUksa0JBQWtCLEVBQUU7WUFDeEMsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUNyRCxJQUFJLEVBQUU7Z0JBQ0osR0FBRzthQUNKO1lBQ0QsVUFBVSxFQUFFLFNBQVM7U0FDdEIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLENBQXNCLHNCQUF5RCxFQUFFLE9BQW1DO1FBQ3RILE1BQU0sY0FBYyxHQUFHO1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsY0FBYyxFQUFFLElBQUksa0JBQWtCLEVBQUU7WUFDeEMsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDeEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDbEU7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2xDLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ3JFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OzBHQTNFVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixjQUFjOzJGQUVmLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLGNBQWM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtDb21wb25lbnRUeXBlLCBOb29wU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHtDb25maXJtRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnQvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHtJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50L2ltYWdlLW1hZ25pZmllci1kaWFsb2cvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQge05nQ29tbW9uTW9kdWxlfSBmcm9tIFwiLi4vbmctY29tbW9uLm1vZHVsZVwiO1xyXG5cclxuXHJcblxyXG5jbGFzcyBHb2xsYWxhTWF0RGlhbG9nQ29uZmlnPEQgPSBhbnk+IGV4dGVuZHMgTWF0RGlhbG9nQ29uZmlnIHtcclxuICBzY3JvbGxCbG9jaz86IGJvb2xlYW47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiBOZ0NvbW1vbk1vZHVsZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xyXG4gICkge31cclxuXHJcbiAgYWxlcnQobWVzc2FnZTogc3RyaW5nLCBvcHRpb25zPzogR29sbGFsYU1hdERpYWxvZ0NvbmZpZykge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxyXG4gICAgICBkYXRhOiB7bWVzc2FnZSwgbW9kZTogJ2FsZXJ0J30sXHJcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiBuZXcgTm9vcFNjcm9sbFN0cmF0ZWd5KCksXHJcbiAgICAgIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb25maWcgPSBkZWZhdWx0T3B0aW9ucztcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1EaWFsb2dDb21wb25lbnQsIGNvbmZpZykuYWZ0ZXJDbG9zZWQoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm0obWVzc2FnZTogc3RyaW5nLCBvcHRpb25zPzogTWF0RGlhbG9nQ29uZmlnKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgd2lkdGg6ICczMnJlbScsXHJcbiAgICAgIGRhdGE6IHttZXNzYWdlLCBtb2RlOiAnY29uZmlybSd9LFxyXG4gICAgICBkaXNhYmxlQ2xvc2U6IHRydWUsXHJcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiBuZXcgTm9vcFNjcm9sbFN0cmF0ZWd5KCksXHJcbiAgICAgIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb25maWcgPSBkZWZhdWx0T3B0aW9ucztcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1EaWFsb2dDb21wb25lbnQsIGNvbmZpZykuYWZ0ZXJDbG9zZWQoKTtcclxuICB9XHJcblxyXG4gIG1hZ25pZnlJbWFnZShzcmM6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgc3JjLFxyXG4gICAgICB9LFxyXG4gICAgICBwYW5lbENsYXNzOiAnbWFnbmlmeScsXHJcbiAgICB9KS5hZnRlckNsb3NlZCgpO1xyXG4gIH1cclxuXHJcbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55Pihjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sIG9wdGlvbnM/OiBHb2xsYWxhTWF0RGlhbG9nQ29uZmlnPEQ+KTogTWF0RGlhbG9nUmVmPFQsIFI+IHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICB3aWR0aDogJzMycmVtJyxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKSxcclxuICAgICAgY2xvc2VPbk5hdmlnYXRpb246IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbmZpZyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcGVuID0gdGhpcy5kaWFsb2cub3Blbihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb25maWcpO1xyXG4gICAgb3Blbi5hZnRlck9wZW5lZCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2Nyb2xsQmxvY2spIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgb3Blbi5iZWZvcmVDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNjcm9sbEJsb2NrKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjZGstZ2xvYmFsLXNjcm9sbGJsb2NrJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvcGVuO1xyXG4gIH1cclxufVxyXG4iXX0=