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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFZLGVBQWUsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWxGLE9BQU8sRUFBZ0Isa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM1RixPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxzRUFBc0UsQ0FBQzs7O0FBSW5ILE1BQU0sc0JBQWdDLFNBQVEsZUFBZTtDQUU1RDtBQUtELE1BQU0sT0FBTyxhQUFhO0lBRXhCLFlBQ1UsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUN4QixDQUFDO0lBRUosWUFBWSxDQUFDLGFBQXFCO1FBQ2hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksU0FBUyxHQUFPLElBQUksQ0FBQztRQUV6QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFCLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNsRSxNQUFNO2FBQ1A7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQWdDO1FBQ3JELE1BQU0sY0FBYyxHQUFHO1lBQ3JCLEtBQUssRUFBRSxP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TixhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Q29tcG9uZW50VHlwZSwgTm9vcFNjcm9sbFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7Q29uZmlybURpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50L2NvbmZpcm0tZGlhbG9nL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VNYWduaWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4uL2NvbXBvbmVudC9pbWFnZS1tYWduaWZpZXItZGlhbG9nL2ltYWdlLW1hZ25pZmllci1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcblxyXG5cclxuY2xhc3MgR29sbGFsYU1hdERpYWxvZ0NvbmZpZzxEID0gYW55PiBleHRlbmRzIE1hdERpYWxvZ0NvbmZpZyB7XHJcbiAgc2Nyb2xsQmxvY2s/OiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ2FueSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2dcclxuICApIHt9XHJcblxyXG4gIGdldERpYWxvZ1JlZihjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGRpYWxvZ1JlZnMgPSB0aGlzLmRpYWxvZy5vcGVuRGlhbG9ncztcclxuICAgIGxldCBkaWFsb2dSZWY6YW55ID0gbnVsbDtcclxuXHJcbiAgICBmb3IobGV0IGk9MDsgaTxkaWFsb2dSZWZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGRpYWxvZ1JlZiA9IGRpYWxvZ1JlZnNbaV07XHJcblxyXG4gICAgICBpZiAoZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWUgPT09IGNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkaWFsb2dSZWY7XHJcbiAgfVxyXG5cclxuICBhbGVydChtZXNzYWdlOiBzdHJpbmcsIG9wdGlvbnM/OiBHb2xsYWxhTWF0RGlhbG9nQ29uZmlnKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgd2lkdGg6ICczMnJlbScsXHJcbiAgICAgIGRhdGE6IHttZXNzYWdlLCBtb2RlOiAnYWxlcnQnfSxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKSxcclxuICAgICAgY2xvc2VPbk5hdmlnYXRpb246IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbmZpZyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybURpYWxvZ0NvbXBvbmVudCwgY29uZmlnKS5hZnRlckNsb3NlZCgpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybShtZXNzYWdlOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXREaWFsb2dDb25maWcpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICB3aWR0aDogJzMycmVtJyxcclxuICAgICAgZGF0YToge21lc3NhZ2UsIG1vZGU6ICdjb25maXJtJ30sXHJcbiAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKSxcclxuICAgICAgY2xvc2VPbk5hdmlnYXRpb246IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNvbmZpZyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLm9wZW4oQ29uZmlybURpYWxvZ0NvbXBvbmVudCwgY29uZmlnKS5hZnRlckNsb3NlZCgpO1xyXG4gIH1cclxuXHJcbiAgbWFnbmlmeUltYWdlKHNyYzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmRpYWxvZy5vcGVuKEltYWdlTWFnbmlmaWVyRGlhbG9nQ29tcG9uZW50LCB7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzcmMsXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhbmVsQ2xhc3M6ICdtYWduaWZ5JyxcclxuICAgIH0pLmFmdGVyQ2xvc2VkKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuPFQsIEQgPSBhbnksIFIgPSBhbnk+KGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPiwgb3B0aW9ucz86IEdvbGxhbGFNYXREaWFsb2dDb25maWc8RD4pOiBNYXREaWFsb2dSZWY8VCwgUj4ge1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIHdpZHRoOiAnMzJyZW0nLFxyXG4gICAgICBzY3JvbGxTdHJhdGVneTogbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpLFxyXG4gICAgICBjbG9zZU9uTmF2aWdhdGlvbjogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY29uZmlnID0gZGVmYXVsdE9wdGlvbnM7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmRpYWxvZy5vcGVuKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIGNvbmZpZyk7XHJcbiAgICBvcGVuLmFmdGVyT3BlbmVkKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zY3JvbGxCbG9jaykge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBvcGVuLmJlZm9yZUNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2Nyb2xsQmxvY2spIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG9wZW47XHJcbiAgfVxyXG59XHJcbiJdfQ==