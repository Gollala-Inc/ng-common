import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ComponentType, NoopScrollStrategy} from '@angular/cdk/overlay';
import {ConfirmDialogComponent} from '../component/confirm-dialog/confirm-dialog.component';
import {ImageMagnifierDialogComponent} from '../component/image-magnifier-dialog/image-magnifier-dialog.component';



class GollalaMatDialogConfig<D = any> extends MatDialogConfig {
  scrollBlock?: boolean;
}

@Injectable({
  providedIn: 'any'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  alert(message: string, options?: GollalaMatDialogConfig) {
    const defaultOptions = {
      width: '32rem',
      data: {message, mode: 'alert'},
      scrollStrategy: new NoopScrollStrategy(),
      closeOnNavigation: true
    };

    let config = defaultOptions;
    if (options) {
      config = Object.assign(defaultOptions, options);
    }

    return this.dialog.open(ConfirmDialogComponent, config).afterClosed();
  }

  confirm(message: string, options?: MatDialogConfig) {
    const defaultOptions = {
      width: '32rem',
      data: {message, mode: 'confirm'},
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

  magnifyImage(src: string): Observable<any> {
    return this.dialog.open(ImageMagnifierDialogComponent, {
      data: {
        src,
      },
      panelClass: 'magnify',
    }).afterClosed();
  }

  open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, options?: GollalaMatDialogConfig<D>): MatDialogRef<T, R> {
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
