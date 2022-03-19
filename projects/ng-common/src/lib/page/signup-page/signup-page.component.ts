import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../service/rest.service";
import {DialogService} from "../../service/dialog.service";
import {timer} from "rxjs";
import {SecurityService} from "../../service/security-service.service";
import {LoadingService} from "../../service/loading.service";
import {SharedSecurityService} from "@gollala/retail-shared";

@Component({
  selector: 'lib-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  customer: FormGroup = this.formBuilder.group({});
  authorizing = false;
  isFirstToken = true;
  authorized = false;
  authInValid = false;
  timer: number = 0;
  timeLeft:number = 120;
  timeSubscriber: any;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private dialogService: DialogService,
    private securityService: SecurityService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.customer = this.formBuilder.group({
      userId: [''],
      email: ['', [
        Validators.required,
        Validators.min(4),
        Validators.max(20),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-zA-Z])(?=.*?[0-9]).{4,18}'),
      ]],
      passwordConfirm : ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-zA-Z])(?=.*?[0-9]).{4,18}'),
      ]],
      company: [''],
      phone: ['', [
        Validators.required,
        Validators.pattern('^(0)(1)[0|1|6|7|8|9][0-9]{7,8}$'),
      ]],
      authToken: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*$'),
      ]],
      agree: [false, [
        Validators.requiredTrue
      ]],
      recommender: ['', []],
      marketingConsent: [false, []]
    });
  }

  signup(event: any) {
    if (!this.customer.valid || !this.authorized) {
      return ;
    }
    // userId 에 email 값 추가
    this.customer.get('userId')?.setValue(this.customer.get('email')?.value);

    const body = this.customer.value;
    // 인증용 필드 제거
    delete body.agree;
    delete body.passwordConfirm;
    delete body.authToken;

    this.loadingService.start();
    SharedSecurityService.validationEmail(body.email)
      .then((valid) => {
        if (!valid) {
          this.dialogService.alert('이미 가입된 이메일 입니다.');
          this.loadingService.stop();
          return ;
        }
        this.securityService.signUpReqeust(body).subscribe(
          (token) => {
            if (token) {
              const message = '가입이 성공적으로 처리되었습니다.';
              this.loadingService.stop();
              const gollalaToken = {
                token,
                date: +new Date()
              };

              localStorage.setItem('gollala_token', JSON.stringify(gollalaToken));
              this.dialogService.alert(message).subscribe(
                () => {
                  window.location.reload();
                });
            }
          },
          (error) => {
            this.loadingService.stop();
            this.dialogService.alert('회원 가입에 실패하였습니다. 골라라로 문의바랍니다.');
          }
        );
      })
      .catch(error => {
        this.loadingService.stop();
        this.dialogService.alert('회원 가입에 실패하였습니다. 골라라로 문의바랍니다.');
      });
  }

  checkValid(type: string) {
    let valid = this.customer.get(type)?.valid;
    if (type === 'passwordConfirm') {
      valid = valid && this.customer.get('password')?.value === this.customer.get('passwordConfirm')?.value;
    }
    if (type === 'authToken') {
      valid = valid && this.authorized;
    }
    return valid;
  }

  checkValue(type: string) {
    return this.customer.get(type)?.value;
  }

  requestAuthorize() {
    if (!this.customer.get('phone')?.value || (this.customer.get('phone')?.value === '')) {
      this.dialogService.alert('<div class="dialog-l-text bold">휴대폰번호를 입력해주세요.</div>');
      return;
    }
    if (!this.customer.get('phone')?.valid) {
      this.dialogService.alert('<div class="dialog-l-text bold">휴대폰번호를 다시 입력해주세요.</div>');
      return;
    }

    this.customer.get('authToken')?.reset('');
    if (this.authorizing) {
      this.timeSubscriber.unsubscribe();
    }

    // 인증 초기화
    this.authorized = false;
    this.authInValid = false;

    this.restService.request('/api/security/v3/sendAuthorize', {
      method: 'POST',
      params: {
        authCode: this.customer.get('phone')?.value,
      },
    }).subscribe(result => {
      this.dialogService.alert('<div class="dialog-l-text bold">인증코드가 카카오톡으로 전송되었습니다. 2분내에 인증하세요.</div>');
      this.observableTimer();
      this.authorizing = true;
    });
  }

  authorizeToken() {
    if (this.authorized) {
      return ;
    }
    if (!this.customer.get('authToken')?.value || (this.customer.get('authToken')?.value === '')) {
      this.dialogService.alert('<div class="dialog-l-text bold">카카오톡 인증번호를 입력해주세요.</div>');
      return;
    }

    if (!this.customer.get('authToken')?.valid) {
      this.dialogService.alert('<div class="dialog-l-text bold">카카오톡 인증번호를 다시 입력해주세요.</div>');
      return;
    }

    this.restService.request('/api/security/v3/authorizeByType', {
      method: 'POST',
      params: {
        authCode: this.customer.get('phone')?.value,
        authToken: this.customer.get('authToken')?.value,
      },
    }).subscribe(result => {
      if (!result.isValid) {
        this.authInValid = true;
        this.dialogService.alert('<div class="dialog-l-text bold">인증번호가 틀립니다. 다시 시도해주세요.</div>');
        return;
      } else {
        this.dialogService.alert('<div class="dialog-l-text bold">인증이 완료되었습니다.</div>');
      }

      this.authorized = true;
      this.authorizing = false;
    });
  }

  observableTimer() {
    const source = timer(0, 1000);
    if (!!this.timeSubscriber) {
      this.timeSubscriber.unsubscribe();
    }

    this.timeSubscriber = source.subscribe(val => {
      this.timer = this.timeLeft - val;
      if (this.timeLeft === val) {
        this.timeSubscriber.unsubscribe();
        this.isFirstToken = false;
        this.authorizing = false;
      }
    });
  }

  timeParser(time: number) {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  toLink(event:any, link: string) {
    event.stopPropagation();
    event.preventDefault();
    window.open(link, '_blank');
  }

}