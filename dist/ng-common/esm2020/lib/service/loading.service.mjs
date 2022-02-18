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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2FkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyRCxNQUFNLE9BQU8sY0FBYztJQUl6QjtRQUZBLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUcvQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7UUFDVCxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2YsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxFQUFFLEdBQUcsSUFBSTtRQUN0QixFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ0wsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUNGLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDVixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzJHQXJDVSxjQUFjOytHQUFkLGNBQWMsY0FGYixNQUFNOzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGRlbGF5LCBvZiwgdGFwfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NlcnZpY2Uge1xuXG4gIGxvYWRpbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG4gIH1cblxuICBzdG9wKG1zID0gMCkge1xuICAgIGlmIChtcyA+IDApIHtcbiAgICAgIG9mKHRydWUpXG4gICAgICAgIC5waXBlKGRlbGF5KG1zKSlcbiAgICAgICAgLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTk9URTog64uk66W4IOuhnOuUqeqzvCDqsrnsuZjsp4Ag7JWK6rKMIOyCrOyaqe2VoCDqsoNcbiAgICogQHBhcmFtIG1zIOuhnOuUqSDrhbjstpwg7Iuc6rCEXG4gICAqL1xuICBkaXNwbGF5TG9hZGluZyhtcyA9IDEwMDApIHtcbiAgICBvZih0cnVlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChfID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBkZWxheShtcyksXG4gICAgICApLnN1YnNjcmliZShfID0+IHtcbiAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==