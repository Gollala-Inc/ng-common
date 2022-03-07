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
LoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2FkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyRCxNQUFNLE9BQU8sY0FBYztJQUl6QjtRQUZBLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUcvQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDVCxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2YsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxFQUFFLEdBQUcsSUFBSTtRQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ0wsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUNGLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDVixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzJHQXJDVSxjQUFjOytHQUFkLGNBQWMsY0FGYixLQUFLOzJGQUVOLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLEtBQUs7aUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgZGVsYXksIG9mLCB0YXB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdhbnknXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nU2VydmljZSB7XHJcblxyXG4gIGxvYWRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzdG9wKG1zID0gMCkge1xyXG4gICAgaWYgKG1zID4gMCkge1xyXG4gICAgICBvZih0cnVlKVxyXG4gICAgICAgIC5waXBlKGRlbGF5KG1zKSlcclxuICAgICAgICAuc3Vic2NyaWJlKF8gPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOT1RFOiDri6Trpbgg66Gc65Sp6rO8IOqyuey5mOyngCDslYrqsowg7IKs7Jqp7ZWgIOqyg1xyXG4gICAqIEBwYXJhbSBtcyDroZzrlKkg64W47LacIOyLnOqwhFxyXG4gICAqL1xyXG4gIGRpc3BsYXlMb2FkaW5nKG1zID0gMTAwMCkge1xyXG4gICAgb2YodHJ1ZSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKF8gPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGRlbGF5KG1zKSxcclxuICAgICAgKS5zdWJzY3JpYmUoXyA9PiB7XHJcbiAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19