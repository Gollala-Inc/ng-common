import {Directive, ElementRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  filter,
  map,
  mergeMap,
  Observable,
  Subscription,
  throwError,
  timer
} from 'rxjs';
import {EntryAndObserver, IntersectionObserverService} from '../service/intersection-observer.service';
import {ajax, AjaxResponse} from 'rxjs/ajax';

const IMAGE_LOADING_PATH = 'assets/images/loading-message.png';
const IMAGE_NOT_FOUND_PATH = 'assets/images/not-found.png';

interface LazyImageEvent {
  el: ElementRef;
  src: string;
  intersectionObserver: IntersectionObserver | undefined;
  event?: Event | null;
}

interface LoadEvent {
  src: string;
  event: Event | null;
}

@Directive({
  selector: '[lazyImage]'
})
export class LazyImageDirective {
  @Input('lazyImage') lazySrc: string | undefined;
  @Input() ioOptions: any;
  @Input() retryLimit = 1;
  @Output() beforeLoad: EventEmitter<LazyImageEvent> = new EventEmitter();
  @Output() afterLoad: EventEmitter<LazyImageEvent> = new EventEmitter();
  @Output() onError: EventEmitter<LazyImageEvent> = new EventEmitter();

  load$ = new BehaviorSubject<LoadEvent | null>(null);
  retry$ = new BehaviorSubject<number>(-1);

  status = 'INIT';

  subscriptions: Subscription[] = [];

  ne: HTMLElement | undefined;

  observer: IntersectionObserver | undefined;

  constructor(
    private el: ElementRef,
    private ioService: IntersectionObserverService,
  ) {

  }

  ngOnInit(): void {
    this.setup();
    this.initSubscriptions();
    this.attachIntersectionObserver();
    this.beforeLoaded();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['lazySrc'].firstChange) {
      // 만약 재시도 중이었다면 취소시킴
      const currentRetryCount = this.retry$.value;
      if (currentRetryCount !== -1) {
        this.retry$.next(-1);
      }
      this.beforeLoaded();
      const src = changes['lazySrc'].currentValue;
      this.loadImage(src)
        .subscribe(
            (data: any) => { this.load$.next({ src: data, event: null }); },
          () => { this.retry$.next(this.retryLimit - 1); }
        );
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private setup() {
    this.ne = this.el.nativeElement;
  }

  private initSubscriptions() {
    const loadSub = this.load$
      .pipe(filter(Boolean))
      .subscribe((loadEvent: LoadEvent) => {
        const {event, src} = loadEvent;
        if (this.ne) {
          if (this.ne.tagName === 'IMG') {
            const imgTag = this.ne as HTMLImageElement;
            imgTag.src = src;
          }
          else {
            this.populateBackgroundStyles(this.ne, src);
          }

          this.afterLoad.emit({
            el: this.el,
            src,
            intersectionObserver: this.observer,
            event,
          });
        }
      });

    this.subscriptions.push(loadSub);

    const retrySub = this.retry$
      .pipe(
        filter(x => x !== -1),
        filter(x => this.status !== 'LOAD'),
        delay(3000),
      )
      .subscribe(retryCount => {
        if (retryCount <= 0) {
          this.error();
          return;
        }
        if (this.lazySrc) {
          this.loadImage(this.lazySrc)
            .subscribe(
              data => { this.load$.next({ src: data, event: null }); },
              err => { this.retry$.next(retryCount - 1); }
            );
        }
      });

    this.subscriptions.push(retrySub);
  }

  private unsubscribeAll() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  /**
   * try retrieve image from cache. if the image doesn't exist, try request.
   * @param url
   */
  private loadImage(url: string): Observable<string> {
    return this.loadImageFromUrl(url);
  }

  private loadImageFromUrl(url: string): Observable<any> {
    return ajax({
      url,
      crossDomain: true,
      responseType: 'arraybuffer',
    }).pipe(
      map((ajaxResponse: AjaxResponse<any>) => {
        if (ajaxResponse.status >= 400) {
          throw new Error('Cannot image url');
        }
        return ajaxResponse.response;
      }),
      mergeMap((bufferArray: ArrayBuffer) => {
        return Observable.create((observer: { next: (arg0: string | ArrayBuffer | null) => void; complete: () => void; error: (arg0: ProgressEvent<FileReader>) => void; }) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            observer.next(reader.result);
            observer.complete();
          };
          reader.onerror = (e) => {
            observer.error(e);
          };
          reader.readAsDataURL(new Blob([bufferArray]));
        });
      }),
      catchError(e => throwError(e)),
    );
  }

  private attachIntersectionObserver() {
    /**
     * Lazy Loading
     */
    if (this.ne) {
      const {ixIn, ixOut} = this.ioService.observe(this.ne);

      let timerSub: Subscription;
      const inSub = ixIn.subscribe((value: EntryAndObserver) => {
        const {entry, observer} = value;
        if (timerSub && timerSub.closed) {
          timerSub.unsubscribe();
        }
        this.status = 'LOADING';
        timerSub = timer(200)
          .pipe(mergeMap(_ => this.loadImage(this.lazySrc || '')))
          .subscribe(data => {
            this.load$.next({ src: data, event: null });
            observer.unobserve(entry.target);
          }, err => {
            this.retry$.next(this.retryLimit);
          });
      });

      const outSub = ixOut.subscribe((value: EntryAndObserver) => {
        if (timerSub) {
          this.status = 'INIT';
          timerSub.unsubscribe();
        }
      });

      this.subscriptions.push(inSub, outSub);
    }

  }

  private beforeLoaded() {
    if (this.ne) {
      if (this.ne.tagName === 'IMG') {
        const imgTag = this.ne as HTMLImageElement;
        imgTag.src = IMAGE_LOADING_PATH;
      }
      else {
        this.populateBackgroundStyles(this.ne, IMAGE_LOADING_PATH);
      }

      this.beforeLoad.emit({
        el: this.el,
        src: IMAGE_LOADING_PATH,
        intersectionObserver: this.observer
      });
    }
  }

  private error() {
    if (this.ne) {
      if (this.ne.tagName === 'IMG') {
        const imgTag = this.el.nativeElement as HTMLImageElement;
        imgTag.src = IMAGE_NOT_FOUND_PATH;
      }
      else {
        this.populateBackgroundStyles(this.ne, IMAGE_NOT_FOUND_PATH);
      }

      this.ioService.unobserve(this.ne);

      this.onError.emit({
        el: this.el,
        src: IMAGE_NOT_FOUND_PATH,
        intersectionObserver: this.observer,
        event,
      });
    }
  }


  private populateBackgroundStyles(placeholder: HTMLElement, imagePath: string) {
    placeholder.style.backgroundImage = `url(${imagePath})`;
    placeholder.style.backgroundPosition = 'center';
    placeholder.style.backgroundRepeat = 'no-repeat';
    placeholder.style.backgroundSize = 'contain';
  }

}
