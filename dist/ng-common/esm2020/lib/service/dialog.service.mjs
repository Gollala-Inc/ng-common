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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFZLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWxGLE9BQU8sRUFBZ0Isa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQzs7O0FBRW5ILE1BQU0sc0JBQWdDLFNBQVEsZUFBZTtDQUU1RDtBQUtELE1BQU0sT0FBTyxhQUFhO0lBRXhCLFlBQ1UsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUUzQixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWUsRUFBRSxPQUFnQztRQUNyRCxNQUFNLGNBQWMsR0FBRztZQUNyQixLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO1lBQzlCLGNBQWMsRUFBRSxJQUFJLGtCQUFrQixFQUFFO1lBQ3hDLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUM1QixJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsT0FBeUI7UUFDaEQsTUFBTSxjQUFjLEdBQUc7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztZQUNoQyxZQUFZLEVBQUUsSUFBSTtZQUNsQixjQUFjLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3JELElBQUksRUFBRTtnQkFDSixHQUFHO2FBQ0o7WUFDRCxVQUFVLEVBQUUsU0FBUztTQUN0QixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksQ0FBc0Isc0JBQXlELEVBQUUsT0FBbUM7UUFDdEgsTUFBTSxjQUFjLEdBQUc7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxjQUFjLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN4QyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNsRTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDckU7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7MEdBNUVVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbXBvbmVudFR5cGUsIE5vb3BTY3JvbGxTdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDb25maXJtRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnQvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7SW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudC9pbWFnZS1tYWduaWZpZXItZGlhbG9nL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50JztcblxuY2xhc3MgR29sbGFsYU1hdERpYWxvZ0NvbmZpZzxEID0gYW55PiBleHRlbmRzIE1hdERpYWxvZ0NvbmZpZyB7XG4gIHNjcm9sbEJsb2NrPzogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHtcbiAgfVxuXG4gIGFsZXJ0KG1lc3NhZ2U6IHN0cmluZywgb3B0aW9ucz86IEdvbGxhbGFNYXREaWFsb2dDb25maWcpIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxuICAgICAgZGF0YToge21lc3NhZ2UsIG1vZGU6ICdhbGVydCd9LFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlXG4gICAgfTtcblxuICAgIGxldCBjb25maWcgPSBkZWZhdWx0T3B0aW9ucztcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybURpYWxvZ0NvbXBvbmVudCwgY29uZmlnKS5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgY29uZmlybShtZXNzYWdlOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXREaWFsb2dDb25maWcpIHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxuICAgICAgZGF0YToge21lc3NhZ2UsIG1vZGU6ICdjb25maXJtJ30sXG4gICAgICBkaXNhYmxlQ2xvc2U6IHRydWUsXG4gICAgICBzY3JvbGxTdHJhdGVneTogbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpLFxuICAgICAgY2xvc2VPbk5hdmlnYXRpb246IHRydWVcbiAgICB9O1xuXG4gICAgbGV0IGNvbmZpZyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCBjb25maWcpLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBtYWduaWZ5SW1hZ2Uoc3JjOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHNyYyxcbiAgICAgIH0sXG4gICAgICBwYW5lbENsYXNzOiAnbWFnbmlmeScsXG4gICAgfSkuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxuXG4gIG9wZW48VCwgRCA9IGFueSwgUiA9IGFueT4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LCBvcHRpb25zPzogR29sbGFsYU1hdERpYWxvZ0NvbmZpZzxEPik6IE1hdERpYWxvZ1JlZjxULCBSPiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICB3aWR0aDogJzMycmVtJyxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiBuZXcgTm9vcFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZVxuICAgIH07XG5cbiAgICBsZXQgY29uZmlnID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjb25zdCBvcGVuID0gdGhpcy5kaWFsb2cub3Blbihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb25maWcpO1xuICAgIG9wZW4uYWZ0ZXJPcGVuZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zY3JvbGxCbG9jaykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjZGstZ2xvYmFsLXNjcm9sbGJsb2NrJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBvcGVuLmJlZm9yZUNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNjcm9sbEJsb2NrKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBvcGVuO1xuICB9XG59XG4iXX0=