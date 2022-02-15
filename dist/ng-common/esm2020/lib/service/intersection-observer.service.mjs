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
IntersectionObserverService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: IntersectionObserverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2ludGVyc2VjdGlvbi1vYnNlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBVWpELE1BQU0sT0FBTywyQkFBMkI7SUFNdEMsWUFDVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpkLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUN2QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFLOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMxQixhQUFhO1lBQ2Isb0JBQW9CLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN6RSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3RDO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3ZDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFFM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBaUI7UUFDdkIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMxRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBaUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7d0hBdkNVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZmlsdGVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBFbnRyeUFuZE9ic2VydmVyIHtcbiAgZW50cnk6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnk7XG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBpeEluID0gbmV3IFN1YmplY3Q8RW50cnlBbmRPYnNlcnZlcj4oKTtcbiAgcHJpdmF0ZSBpeE91dCA9IG5ldyBTdWJqZWN0PEVudHJ5QW5kT2JzZXJ2ZXI+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBJbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGVbJ1VTRV9NVVRBVElPTl9PQlNFUlZFUiddID0gZmFsc2U7XG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5peEluLm5leHQoeyBlbnRyeSwgb2JzZXJ2ZXIgfSApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLml4T3V0Lm5leHQoeyBlbnRyeSwgb2JzZXJ2ZXIgfSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LCB7IHJvb3RNYXJnaW46ICcxMDBweCd9KTtcblxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlclsnVVNFX01VVEFUSU9OX09CU0VSVkVSJ10gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIG9ic2VydmUoZWxlbTogSFRNTEVsZW1lbnQpOiB7IGl4SW46IE9ic2VydmFibGU8RW50cnlBbmRPYnNlcnZlcj4sIGl4T3V0OiBPYnNlcnZhYmxlPEVudHJ5QW5kT2JzZXJ2ZXI+IH0ge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoZWxlbSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl4SW46IHRoaXMuaXhJbi5waXBlKGZpbHRlcigoe2VudHJ5LCBvYnNlcnZlcn0pID0+IGVudHJ5LnRhcmdldCA9PT0gZWxlbSkpLFxuICAgICAgaXhPdXQ6IHRoaXMuaXhPdXQucGlwZShmaWx0ZXIoKHtlbnRyeSwgb2JzZXJ2ZXJ9KSA9PiBlbnRyeS50YXJnZXQgPT09IGVsZW0pKSxcbiAgICB9O1xuICB9XG5cbiAgdW5vYnNlcnZlKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW0pO1xuICB9XG59XG4iXX0=