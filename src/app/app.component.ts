import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {SecurityService} from "../../projects/ng-common/src/public-api";
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
  restService: any;

  subscriptions: Subscription[] = [];

  constructor(
    private securityService: SecurityService
  ) {
    SharedSecurityService.signedIn$((signedIn: any) => {
      this.signedIn = signedIn;
      console.log(this.signedIn);
    });

    this.restService = SharedSecurityService['restService'];
    console.log(this.restService);

    this.securityService.signedInRequest().subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  login() {
    //SharedSecurityService.signInRequest(this.id, this.password);
    console.log('login');
    this.securityService.signInRequest(this.id, this.password).subscribe(res => {
      console.log(res);
    })

  }
}
