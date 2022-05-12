import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface Control {
  show: boolean;
  message: string;
  type?: 'success' | 'error';
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public control$: BehaviorSubject<Control> = new BehaviorSubject<Control>({
    show: false,
    delay: 5000,
    message: ''
  });
  public status: string = 'closed';
  private reopenTimer: any = null;
  constructor() {}

  open(message: string, type?: 'success' | 'error') {
    if(this.status === 'opening') {
      clearTimeout(this.reopenTimer);
      this.close();
      this.reopenTimer = setTimeout(() => {
        this.open(message);
      }, 200);
      return;
    }

    const control = {
        show: true,
        delay: 5000,
        message,
        type: type || 'success'
    }
    this.status = 'opening';
    this.control$.next(control);
  }

  close() {
    const control = {
      show: false,
      delay: 5000,
      message: ''
    };
    this.status = 'closed';
    this.control$.next(control);
  }
}
