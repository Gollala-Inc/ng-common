import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class IntersectionObserverService {
    constructor(zone) {
        this.zone = zone;
        this.ixIn = new Subject();
        this.ixOut = new Subject();
        zone.runOutsideAngular(() => {
            // @ts-ignore
            IntersectionObserver.prototype['USE_MUTATION_OBSERVER'] = false;
            this.intersectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.ixIn.next({ entry, observer });
                    }
                    else {
                        this.ixOut.next({ entry, observer });
                    }
                });
            }, { rootMargin: '100px' });
            // @ts-ignore
            this.intersectionObserver['USE_MUTATION_OBSERVER'] = false;
        });
    }
    observe(elem) {
        // @ts-ignore
        this.intersectionObserver.observe(elem);
        return {
            ixIn: this.ixIn.pipe(filter(({ entry, observer }) => entry.target === elem)),
            ixOut: this.ixOut.pipe(filter(({ entry, observer }) => entry.target === elem)),
        };
    }
    unobserve(elem) {
        // @ts-ignore
        this.intersectionObserver.unobserve(elem);
    }
}
IntersectionObserverService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
IntersectionObserverService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2ludGVyc2VjdGlvbi1vYnNlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBVWpELE1BQU0sT0FBTywyQkFBMkI7SUFNdEMsWUFDVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpkLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUN2QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFLOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMxQixhQUFhO1lBQ2Isb0JBQW9CLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN6RSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3RDO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3ZDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFFM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBaUI7UUFDdkIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMxRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBaUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7d0hBdkNVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLEtBQUs7MkZBRU4sMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZmlsdGVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBFbnRyeUFuZE9ic2VydmVyIHtcbiAgZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk7XG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25PYnNlcnZlclNlcnZpY2Uge1xuICBwcml2YXRlIGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGl4SW4gPSBuZXcgU3ViamVjdDxFbnRyeUFuZE9ic2VydmVyPigpO1xuICBwcml2YXRlIGl4T3V0ID0gbmV3IFN1YmplY3Q8RW50cnlBbmRPYnNlcnZlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIEludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZVsnVVNFX01VVEFUSU9OX09CU0VSVkVSJ10gPSBmYWxzZTtcbiAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLml4SW4ubmV4dCh7IGVudHJ5LCBvYnNlcnZlciB9ICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXhPdXQubmV4dCh7IGVudHJ5LCBvYnNlcnZlciB9ICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sIHsgcm9vdE1hcmdpbjogJzEwMHB4J30pO1xuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyWydVU0VfTVVUQVRJT05fT0JTRVJWRVInXSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgb2JzZXJ2ZShlbGVtOiBIVE1MRWxlbWVudCk6IHsgaXhJbjogT2JzZXJ2YWJsZTxFbnRyeUFuZE9ic2VydmVyPiwgaXhPdXQ6IE9ic2VydmFibGU8RW50cnlBbmRPYnNlcnZlcj4gfSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtKTtcbiAgICByZXR1cm4ge1xuICAgICAgaXhJbjogdGhpcy5peEluLnBpcGUoZmlsdGVyKCh7ZW50cnksIG9ic2VydmVyfSkgPT4gZW50cnkudGFyZ2V0ID09PSBlbGVtKSksXG4gICAgICBpeE91dDogdGhpcy5peE91dC5waXBlKGZpbHRlcigoe2VudHJ5LCBvYnNlcnZlcn0pID0+IGVudHJ5LnRhcmdldCA9PT0gZWxlbSkpLFxuICAgIH07XG4gIH1cblxuICB1bm9ic2VydmUoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoZWxlbSk7XG4gIH1cbn1cbiJdfQ==