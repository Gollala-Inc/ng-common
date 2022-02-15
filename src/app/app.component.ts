import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from './component/alert/alert.component';
import {DialogService, RestService} from 'ng-common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subscriptions: Subscription[] = [];

  constructor(
    private matDialog: MatDialog,
    private dialogService: DialogService,
    private restService: RestService,
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) {
    //this.matDialog.open(AlertComponent);
    const headers = new HttpHeaders(
      {
        'x-api-key':  '123a',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU0ZDIzMTc4ZWNjMGE3ZTY2NTllOGIiLCJ1c2VySWQiOiJtYXNvbkBnb2xsYWxhLmNvbSIsImxhc3RMb2dnZWRJbkF0IjoiMjAyMi0wMS0xOFQwNjo0MzoyMS40ODVaIiwiaWF0IjoxNjQyNDg4MjAxLCJpc3MiOiJnb2xsYWxhLmNvbSIsInN1YiI6ImN1c3RvbWVyIn0.ZcCaAOwk2HH74h8AUyiW2XLUlUuCAbBB3xzH0iW9gnI'
      });

    const aaa = this.httpClient.get('https://commerce-api.gollala.org/customer/auth/info', {headers}).subscribe(res => {
      console.log(res);
    });

    const bbb = this.restService.GET('https://commerce-api.gollala.org/customer/auth/info', {headers}).subscribe(res => {
      console.log(res);
    });

    this.subscriptions.push(aaa, bbb);

    this.dialogService.alert('안녕하세요');
    console.log(this.dialog.openDialogs, this.dialog.openDialogs.find(d => d.componentInstance instanceof AppComponent));




  }
}
