import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'lib-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  customer: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.min(4), Validators.max(20)]],
    password: ['', [
      Validators.required,
      Validators.pattern('(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}'),
      Validators.min(4),
      Validators.max(18)
    ]],
    passwordConfirm : ['', [
      Validators.required,
    ]],
    company: [''],
    phone: ['', [Validators.required]],
    agree: [false, [
      Validators.requiredTrue
    ]],
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  signup(event: any) {

  }

}
