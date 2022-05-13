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

  closeTimer: any = null;
  autoCloseTimer:any = null;

  constructor(
    private snackBarService: SnackbarService
  ){
  }

  ngOnInit(): void {
    this.getSnackbarControl();
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeTimer);
    clearTimeout(this.autoCloseTimer);
  }

  public onClose() {
    this.snackBar.nativeElement.classList.remove('in');
    this.snackBar.nativeElement.classList.add('out');

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
      if(show) {
        this.snackBar.nativeElement.classList.remove('out');
        this.snackBar.nativeElement.classList.add('in');
        this.autoClose();
      }
    })
  }
}

