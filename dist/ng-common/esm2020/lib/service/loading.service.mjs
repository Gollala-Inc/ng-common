import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import * as i0 from "@angular/core";
export class LoadingService {
    constructor() {
        this.loading$ = new BehaviorSubject(false);
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
        }
        else {
            this.loading$.next(false);
        }
    }
    /**
     * NOTE: 다른 로딩과 겹치지 않게 사용할 것
     * @param ms 로딩 노출 시간
     */
    displayLoading(ms = 1000) {
        of(true)
            .pipe(tap(_ => {
            this.loading$.next(true);
        }), delay(ms)).subscribe(_ => {
            this.loading$.next(false);
        });
    }
}
LoadingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2FkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyRCxNQUFNLE9BQU8sY0FBYztJQUl6QjtRQUZBLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUcvQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDVCxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2YsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxFQUFFLEdBQUcsSUFBSTtRQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ0wsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUNGLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDVixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzJHQXJDVSxjQUFjOytHQUFkLGNBQWMsY0FGYixNQUFNOzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgZGVsYXksIG9mLCB0YXB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NlcnZpY2Uge1xyXG5cclxuICBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc3RvcChtcyA9IDApIHtcclxuICAgIGlmIChtcyA+IDApIHtcclxuICAgICAgb2YodHJ1ZSlcclxuICAgICAgICAucGlwZShkZWxheShtcykpXHJcbiAgICAgICAgLnN1YnNjcmliZShfID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTk9URTog64uk66W4IOuhnOuUqeqzvCDqsrnsuZjsp4Ag7JWK6rKMIOyCrOyaqe2VoCDqsoNcclxuICAgKiBAcGFyYW0gbXMg66Gc65SpIOuFuOy2nCDsi5zqsIRcclxuICAgKi9cclxuICBkaXNwbGF5TG9hZGluZyhtcyA9IDEwMDApIHtcclxuICAgIG9mKHRydWUpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRhcChfID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBkZWxheShtcyksXHJcbiAgICAgICkuc3Vic2NyaWJlKF8gPT4ge1xyXG4gICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==