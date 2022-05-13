import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SnackbarService} from '../../service/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @ViewChild('snackBar') snackBar!: ElementRef;
  public delay: number = 5000;
  public message: string = '';
  public show: boolean = false;
  public type!: 'success' | 'error' | 'none';
  public animeType: string = '';

  closeTimer: any = null;
  autoCloseTimer:any = null;

  constructor(
    private snackBarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.getSnackbarControl();
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeTimer);
    clearTimeout(this.autoCloseTimer);
  }

  public onClose() {
    this.animeType = 'out';
    clearTimeout(this.autoCloseTimer);
    this.closeTimer = setTimeout(() => {
      this.snackBarService.close();
    }, 200);
  }

  private autoClose() {
    clearTimeout(this.autoCloseTimer);
    this.autoCloseTimer = setTimeout(() => {
      this.onClose();
    }, this.delay);
  }

  private getSnackbarControl() {
    this.snackBarService.control$.subscribe(({show, delay, message, type}) => {
      this.delay = delay || 5000;
      this.show = show;
      this.message = message;
      this.type = type || 'success';
      this.animeType = 'in';

      if(show) {
        this.autoClose();
      }
    })
  }
}

