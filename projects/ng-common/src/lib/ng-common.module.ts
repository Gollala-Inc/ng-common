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
import { LoginDialogComponent } from './component/login-dialog/login-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    CommaSeparateNumberPipe,
    ConfirmDialogComponent,
    ImageMagnifierDialogComponent,
    LoadingComponent,
    LazyImageDirective,
    IconComponent,
    RippleDirective,
    LoginDialogComponent,
    SignupPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
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
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    LoginDialogComponent,
    SignupPageComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ImageMagnifierDialogComponent
  ]
})
export class NgCommonModule { }
