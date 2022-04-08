import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {SecurityService} from "../../service/security-service.service";
import {DialogService} from "../../service/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('500ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class LoginDialogComponent implements OnInit {
  @ViewChild('dialog') element: any;

  accountId = new FormControl('', [Validators.required]);
  accountPassword = new FormControl('', [Validators.required]);

  type = 'signin';
  loader = false;
  errorMessage$: Subject<string> = new Subject<string>();
  errorMessage = '';
  loginErrorTimer: any;
  url = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private securityService: SecurityService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.url = data ? data.url : '';
  }

  ngOnInit() {
    this.errorMessage$.subscribe((msg) => {
      this.errorMessage = msg;

      if (msg) {
        /* 로그인 에러 메세지 창이 열리면 1.5초 후에 자동으로 닫게 함 */
        clearTimeout(this.loginErrorTimer);
        this.loginErrorTimer =  setTimeout(() => {
          this.errorMessage = '';
        }, 1500);
      }
    });
  }

  signin(event: any) {
    event.preventDefault();

    if (this.accountId.value === '') {
      // this.dialogService.alert('<div class="dialog-l-text bold">아이디를 입력해주세요.</div>');
      this.errorMessage$.next('아이디를 입력해주세요');
      return;
    }

    if (this.accountPassword.value === '') {
      // this.dialogService.alert('<div class="dialog-l-text bold">비밀번호를 입력해주세요.</div>');
      this.errorMessage$.next('비밀번호를 입력해주세요');
      return;
    }

    if (!this.accountId.valid || !this.accountPassword.valid) {
      // this.dialogService.alert('<div class="dialog-l-text bold">아이디와 비밀번호를 다시 확인하세요.</div>');
      this.dialogService.alert('아이디와 비밀번호를 다시 확인하세요');
      return;
    }

    const accountId = this.accountId.value;
    const accountPassword = this.accountPassword.value;

    this.loader = true;
    this.securityService.signInRequest(accountId, accountPassword)
      .subscribe(signinResult => {
        this.loader = false;
        this.dialogRef.close(signinResult);
      }, (err: HttpErrorResponse) => {
        this.loader = false;
        if (err.status === 401) {
          this.dialogService.alert('아이디와 비밀번호를 다시 확인하세요.');
        } else {
          this.dialogService.alert(err.message);
        }
      });
  }

  clickSignUp(event: any) {
    event.stopPropagation();
    event.preventDefault();

    // 추천인 코드 입력 창을 제거해서 바로 회원 가입 팝업이 뜰 수 있도록 구현한다.
    this.type = 'signup';
  }

  onCloseDialog(goLinkType?: string) {
    this.dialogRef.close(goLinkType);
  }

  isCompleteSignup(complete: boolean) {
    if(complete) {
      this.onCloseDialog('/main/commerce/domestic/signup/complete');
    }
  }
}
