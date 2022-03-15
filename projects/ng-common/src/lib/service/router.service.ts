import { Injectable } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import {filter, pairwise} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  urlRedirects: string[] = [];

  constructor(
    private router: Router
  ) {
    router.events
      .pipe(filter(event => event instanceof RoutesRecognized), pairwise())
      .subscribe((event: any) => {
        this.urlRedirects = event.map((d: any) => d.urlAfterRedirects);
      });
  }
}
