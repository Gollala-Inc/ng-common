import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RestService} from "./rest.service";
import {DialogService} from "./dialog.service";
import {LoadingService} from "./loading.service";
import {MatDialogModule} from "@angular/material/dialog";

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        RestService,
        DialogService,
        LoadingService
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('#getCartsCount should return value from API', (done: DoneFn) => {
    service.getCartCounts().subscribe((count) => {
      expect(count).toBe(1);
      done();
    })
  })
});
