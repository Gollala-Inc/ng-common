import { NgModule } from '@angular/core';
import {CommaSeparateNumberPipe} from './pipe/comma-separate-number.pipe';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {ImageMagnifierDialogComponent} from './component/image-magnifier-dialog/image-magnifier-dialog.component';
import {LoadingComponent} from './component/loading/loading.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LazyImageDirective } from './directive/lazy-image.directive';
import { IconComponent } from './component/icon/icon.component';
import { RippleDirective } from './directive/ripple.directive';
import {MatButtonModule} from '@angular/material/button';
import {DialogService} from "./service/dialog.service";


@NgModule({
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
})
export class NgCommonModule { }
