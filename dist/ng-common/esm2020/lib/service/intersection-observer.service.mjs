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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2ludGVyc2VjdGlvbi1vYnNlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBVWpELE1BQU0sT0FBTywyQkFBMkI7SUFNdEMsWUFDVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpkLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUN2QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFLOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMxQixhQUFhO1lBQ2Isb0JBQW9CLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN6RSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3RDO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3ZDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFFM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBaUI7UUFDdkIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMxRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBaUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7d0hBdkNVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLEtBQUs7MkZBRU4sMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtmaWx0ZXIsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbnRyeUFuZE9ic2VydmVyIHtcclxuICBlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeTtcclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAnYW55J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIGludGVyc2VjdGlvbk9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgcHJpdmF0ZSBpeEluID0gbmV3IFN1YmplY3Q8RW50cnlBbmRPYnNlcnZlcj4oKTtcclxuICBwcml2YXRlIGl4T3V0ID0gbmV3IFN1YmplY3Q8RW50cnlBbmRPYnNlcnZlcj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlWydVU0VfTVVUQVRJT05fT0JTRVJWRVInXSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5peEluLm5leHQoeyBlbnRyeSwgb2JzZXJ2ZXIgfSApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5peE91dC5uZXh0KHsgZW50cnksIG9ic2VydmVyIH0gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSwgeyByb290TWFyZ2luOiAnMTAwcHgnfSk7XHJcblxyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXJbJ1VTRV9NVVRBVElPTl9PQlNFUlZFUiddID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9ic2VydmUoZWxlbTogSFRNTEVsZW1lbnQpOiB7IGl4SW46IE9ic2VydmFibGU8RW50cnlBbmRPYnNlcnZlcj4sIGl4T3V0OiBPYnNlcnZhYmxlPEVudHJ5QW5kT2JzZXJ2ZXI+IH0ge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKGVsZW0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXhJbjogdGhpcy5peEluLnBpcGUoZmlsdGVyKCh7ZW50cnksIG9ic2VydmVyfSkgPT4gZW50cnkudGFyZ2V0ID09PSBlbGVtKSksXHJcbiAgICAgIGl4T3V0OiB0aGlzLml4T3V0LnBpcGUoZmlsdGVyKCh7ZW50cnksIG9ic2VydmVyfSkgPT4gZW50cnkudGFyZ2V0ID09PSBlbGVtKSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdW5vYnNlcnZlKGVsZW06IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLnVub2JzZXJ2ZShlbGVtKTtcclxuICB9XHJcbn1cclxuIl19