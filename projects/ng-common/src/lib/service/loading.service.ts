import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  start() {
    this.loading$.next(true);
  }

  stop(ms = 0) {
    if (ms > 0) {
      of(true)
        .pipe(delay(ms))
        .subscribe(_ => {
          this.loading$.next(false);
        });
    } else {
      this.loading$.next(false);
    }
  }

  /**
   * NOTE: 다른 로딩과 겹치지 않게 사용할 것
   * @param ms 로딩 노출 시간
   */
  displayLoading(ms = 1000) {
    of(true)
      .pipe(
        tap(_ => {
          this.loading$.next(true);
        }),
        delay(ms),
      ).subscribe(_ => {
      this.loading$.next(false);
    });
  }
}
