import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { ImageMagnifierDialogComponent } from '../component/image-magnifier-dialog/image-magnifier-dialog.component';
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
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFZLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWxGLE9BQU8sRUFBZ0Isa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQzs7O0FBRW5ILE1BQU0sc0JBQWdDLFNBQVEsZUFBZTtDQUU1RDtBQUtELE1BQU0sT0FBTyxhQUFhO0lBRXhCLFlBQ1UsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUUzQixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWUsRUFBRSxPQUFnQztRQUNyRCxNQUFNLGNBQWMsR0FBRztZQUNyQixLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO1lBQzlCLGNBQWMsRUFBRSxJQUFJLGtCQUFrQixFQUFFO1lBQ3hDLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUM1QixJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsT0FBeUI7UUFDaEQsTUFBTSxjQUFjLEdBQUc7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztZQUNoQyxZQUFZLEVBQUUsSUFBSTtZQUNsQixjQUFjLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3JELElBQUksRUFBRTtnQkFDSixHQUFHO2FBQ0o7WUFDRCxVQUFVLEVBQUUsU0FBUztTQUN0QixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBc0Isc0JBQXlELEVBQUUsT0FBbUM7UUFDdEgsTUFBTSxjQUFjLEdBQUc7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxjQUFjLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN4QyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNsRTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDckU7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7MEdBNUVVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbXBvbmVudFR5cGUsIE5vb3BTY3JvbGxTdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQge0NvbmZpcm1EaWFsb2dDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudC9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQge0ltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnQvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy9pbWFnZS1tYWduaWZpZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5jbGFzcyBHb2xsYWxhTWF0RGlhbG9nQ29uZmlnPEQgPSBhbnk+IGV4dGVuZHMgTWF0RGlhbG9nQ29uZmlnIHtcclxuICBzY3JvbGxCbG9jaz86IGJvb2xlYW47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcclxuICApIHtcclxuICB9XHJcblxyXG4gIGFsZXJ0KG1lc3NhZ2U6IHN0cmluZywgb3B0aW9ucz86IEdvbGxhbGFNYXREaWFsb2dDb25maWcpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICB3aWR0aDogJzMycmVtJyxcclxuICAgICAgZGF0YToge21lc3NhZ2UsIG1vZGU6ICdhbGVydCd9LFxyXG4gICAgICBzY3JvbGxTdHJhdGVneTogbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpLFxyXG4gICAgICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29uZmlnID0gZGVmYXVsdE9wdGlvbnM7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCBjb25maWcpLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG5cclxuICBjb25maXJtKG1lc3NhZ2U6IHN0cmluZywgb3B0aW9ucz86IE1hdERpYWxvZ0NvbmZpZykge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxyXG4gICAgICBkYXRhOiB7bWVzc2FnZSwgbW9kZTogJ2NvbmZpcm0nfSxcclxuICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlLFxyXG4gICAgICBzY3JvbGxTdHJhdGVneTogbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpLFxyXG4gICAgICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29uZmlnID0gZGVmYXVsdE9wdGlvbnM7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCBjb25maWcpLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG5cclxuICBtYWduaWZ5SW1hZ2Uoc3JjOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oSW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnQsIHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHNyYyxcclxuICAgICAgfSxcclxuICAgICAgcGFuZWxDbGFzczogJ21hZ25pZnknLFxyXG4gICAgfSkuYWZ0ZXJDbG9zZWQoKTtcclxuICB9XHJcblxyXG4gIG9wZW48VCwgRCA9IGFueSwgUiA9IGFueT4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LCBvcHRpb25zPzogR29sbGFsYU1hdERpYWxvZ0NvbmZpZzxEPik6IE1hdERpYWxvZ1JlZjxULCBSPiB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgd2lkdGg6ICczMnJlbScsXHJcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiBuZXcgTm9vcFNjcm9sbFN0cmF0ZWd5KCksXHJcbiAgICAgIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjb25maWcgPSBkZWZhdWx0T3B0aW9ucztcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuZGlhbG9nLm9wZW4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgY29uZmlnKTtcclxuICAgIG9wZW4uYWZ0ZXJPcGVuZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNjcm9sbEJsb2NrKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjZGstZ2xvYmFsLXNjcm9sbGJsb2NrJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG9wZW4uYmVmb3JlQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zY3JvbGxCbG9jaykge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3BlbjtcclxuICB9XHJcbn1cclxuIl19