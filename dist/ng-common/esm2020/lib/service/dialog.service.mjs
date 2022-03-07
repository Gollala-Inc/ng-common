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
    getDialogRef(componentName) {
        const dialogRefs = this.dialog.openDialogs;
        let dialogRef = null;
        for (let i = 0; i < dialogRefs.length; i++) {
            dialogRef = dialogRefs[i];
            if (dialogRef.componentInstance.constructor.name === componentName) {
                break;
            }
        }
        return dialogRef;
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
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFZLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWxGLE9BQU8sRUFBZ0Isa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQzs7O0FBSW5ILE1BQU0sc0JBQWdDLFNBQVEsZUFBZTtDQUU1RDtBQUtELE1BQU0sT0FBTyxhQUFhO0lBRXhCLFlBQ1UsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUN4QixDQUFDO0lBRUosWUFBWSxDQUFDLGFBQXFCO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksU0FBUyxHQUFPLElBQUksQ0FBQztRQUV6QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFCLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNsRSxNQUFNO2FBQ1A7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQWdDO1FBQ3JELE1BQU0sY0FBYyxHQUFHO1lBQ3JCLEtBQUssRUFBRSxP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TixhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Q29tcG9uZW50VHlwZSwgTm9vcFNjcm9sbFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbmZpcm1EaWFsb2dDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudC9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHtJbWFnZU1hZ25pZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50L2ltYWdlLW1hZ25pZmllci1kaWFsb2cvaW1hZ2UtbWFnbmlmaWVyLWRpYWxvZy5jb21wb25lbnQnO1xuXG5cblxuY2xhc3MgR29sbGFsYU1hdERpYWxvZ0NvbmZpZzxEID0gYW55PiBleHRlbmRzIE1hdERpYWxvZ0NvbmZpZyB7XG4gIHNjcm9sbEJsb2NrPzogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nXG4gICkge31cblxuICBnZXREaWFsb2dSZWYoY29tcG9uZW50TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGlhbG9nUmVmcyA9IHRoaXMuZGlhbG9nLm9wZW5EaWFsb2dzO1xuICAgIGxldCBkaWFsb2dSZWY6YW55ID0gbnVsbDtcblxuICAgIGZvcihsZXQgaT0wOyBpPGRpYWxvZ1JlZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRpYWxvZ1JlZiA9IGRpYWxvZ1JlZnNbaV07XG5cbiAgICAgIGlmIChkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY29uc3RydWN0b3IubmFtZSA9PT0gY29tcG9uZW50TmFtZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmO1xuICB9XG5cbiAgYWxlcnQobWVzc2FnZTogc3RyaW5nLCBvcHRpb25zPzogR29sbGFsYU1hdERpYWxvZ0NvbmZpZykge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgd2lkdGg6ICczMnJlbScsXG4gICAgICBkYXRhOiB7bWVzc2FnZSwgbW9kZTogJ2FsZXJ0J30sXG4gICAgICBzY3JvbGxTdHJhdGVneTogbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpLFxuICAgICAgY2xvc2VPbk5hdmlnYXRpb246IHRydWVcbiAgICB9O1xuXG4gICAgbGV0IGNvbmZpZyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kaWFsb2cub3BlbihDb25maXJtRGlhbG9nQ29tcG9uZW50LCBjb25maWcpLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBjb25maXJtKG1lc3NhZ2U6IHN0cmluZywgb3B0aW9ucz86IE1hdERpYWxvZ0NvbmZpZykge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgd2lkdGg6ICczMnJlbScsXG4gICAgICBkYXRhOiB7bWVzc2FnZSwgbW9kZTogJ2NvbmZpcm0nfSxcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiBuZXcgTm9vcFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZVxuICAgIH07XG5cbiAgICBsZXQgY29uZmlnID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKENvbmZpcm1EaWFsb2dDb21wb25lbnQsIGNvbmZpZykuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxuXG4gIG1hZ25pZnlJbWFnZShzcmM6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oSW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3JjLFxuICAgICAgfSxcbiAgICAgIHBhbmVsQ2xhc3M6ICdtYWduaWZ5JyxcbiAgICB9KS5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgb3BlbjxULCBEID0gYW55LCBSID0gYW55Pihjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sIG9wdGlvbnM/OiBHb2xsYWxhTWF0RGlhbG9nQ29uZmlnPEQ+KTogTWF0RGlhbG9nUmVmPFQsIFI+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgIGNsb3NlT25OYXZpZ2F0aW9uOiB0cnVlXG4gICAgfTtcblxuICAgIGxldCBjb25maWcgPSBkZWZhdWx0T3B0aW9ucztcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmRpYWxvZy5vcGVuKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIGNvbmZpZyk7XG4gICAgb3Blbi5hZnRlck9wZW5lZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNjcm9sbEJsb2NrKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG9wZW4uYmVmb3JlQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2Nyb2xsQmxvY2spIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cbn1cbiJdfQ==