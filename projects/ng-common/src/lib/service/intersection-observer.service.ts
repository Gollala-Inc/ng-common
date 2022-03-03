import {Injectable, NgZone} from '@angular/core';
import {filter, Observable, Subject} from 'rxjs';

export interface EntryAndObserver {
  entry: IntersectionObserverEntry;
  observer: IntersectionObserver;
}

@Injectable({
  providedIn: 'any'
})
export class IntersectionObserverService {
  private intersectionObserver: IntersectionObserver | undefined;

  private ixIn = new Subject<EntryAndObserver>();
  private ixOut = new Subject<EntryAndObserver>();

  constructor(
    private zone: NgZone
  ) {
    zone.runOutsideAngular(() => {
      // @ts-ignore
      IntersectionObserver.prototype['USE_MUTATION_OBSERVER'] = false;
      this.intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ixIn.next({ entry, observer } );
          } else {
            this.ixOut.next({ entry, observer } );
          }
        });
      }, { rootMargin: '100px'});

      // @ts-ignore
      this.intersectionObserver['USE_MUTATION_OBSERVER'] = false;
    });
  }

  observe(elem: HTMLElement): { ixIn: Observable<EntryAndObserver>, ixOut: Observable<EntryAndObserver> } {
    // @ts-ignore
    this.intersectionObserver.observe(elem);
    return {
      ixIn: this.ixIn.pipe(filter(({entry, observer}) => entry.target === elem)),
      ixOut: this.ixOut.pipe(filter(({entry, observer}) => entry.target === elem)),
    };
  }

  unobserve(elem: HTMLElement) {
    // @ts-ignore
    this.intersectionObserver.unobserve(elem);
  }
}
