import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogService, SecurityService} from "../../projects/ng-common/src/public-api";
import {SharedSecurityService} from "@gollala/retail-shared";
import {LoginDialogComponent} from "../../projects/ng-common/src/lib/component/login-dialog/login-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  id: string = '';
  password: string = '';
  signedIn: any;
  restService: any;

  subscriptions: Subscription[] = [];

  constructor(
    private securityService: SecurityService,
    private dialogService: DialogService
  ) {
    this.securityService.signedIn$.subscribe(signedin => this.signedIn = signedin);
    this.securityService.signedInRequest().subscribe(res => {
      this.signedIn = res;
    })
  }

  login() {
    this.dialogService.open(LoginDialogComponent, {
      width: 'auto',
      panelClass: 'login',
      disableClose: true,
      scrollBlock: true,
    }).afterClosed().subscribe((response) => {
      if (response) {
        /* 로그인 됐을 때만 새로고침 */
        window.location.reload();
        return;
      }
    });
  }

  logOut() {
    this.securityService.signout();
  }
}
