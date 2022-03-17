import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {DialogService, RestService, SecurityService} from "../../projects/ng-common/src/public-api";
import {SharedSecurityService} from "@gollala/retail-shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  id: string = '';
  password: string = '';
  signedIn: any;

  subscriptions: Subscription[] = [];

  constructor(
    private matDialog: MatDialog,
    private dialogService: DialogService,
    private restService: RestService,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private securityService: SecurityService
  ) {
    SharedSecurityService.signedIn$((signedIn: any) => {
      this.signedIn = signedIn;
      console.log(this.signedIn);
    });
  }

  login() {
    //SharedSecurityService.signInRequest(this.id, this.password);
    console.log('login');
    this.securityService.signInRequest(this.id, this.password).subscribe(res => {
      console.log(res);
    })
  }
}
