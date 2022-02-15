import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {LoadingService} from '../../service/loading.service';


@Component({
  selector: 'gollala-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() global = false;
  // background 음영처리
  @Input() backdrop = false;
  // diameter
  @Input() d = 100;

  @Output() start: EventEmitter<boolean> = new EventEmitter();
  @Output() end: EventEmitter<boolean> = new EventEmitter();

  subscriptions: Subscription[] = [];

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    if (this.global) {
      this.loading$ = this.loadingService.loading$;
      const loadingSub = this.loading$.subscribe(loading => {
        if (loading) {
          this.start.next(true);
        } else {
          this.end.next(true);
        }
      });

      this.subscriptions.push(loadingSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }
}
