import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SecurityService} from "../../projects/ng-common/src/lib/service/security-service.service";
import {DialogService} from "../../projects/ng-common/src/lib/service/dialog.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {CommaSeparateNumberPipe} from "../../projects/ng-common/src/lib/pipe/comma-separate-number.pipe";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CommaSeparateNumberPipe
      ],
      imports: [
          HttpClientTestingModule,
          MatDialogModule
      ],
      providers: [
        SecurityService,
        DialogService,
        CommaSeparateNumberPipe
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
