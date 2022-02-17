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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLW9ic2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9zZXJ2aWNlL2ludGVyc2VjdGlvbi1vYnNlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBVWpELE1BQU0sT0FBTywyQkFBMkI7SUFNdEMsWUFDVSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpkLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQztRQUN2QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFLOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMxQixhQUFhO1lBQ2Isb0JBQW9CLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUN6RSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3RDO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7cUJBQ3ZDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFFM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBaUI7UUFDdkIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMxRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBaUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7d0hBdkNVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRjFCLE1BQU07MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtmaWx0ZXIsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbnRyeUFuZE9ic2VydmVyIHtcclxuICBlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeTtcclxuICBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGlvbk9ic2VydmVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gIHByaXZhdGUgaXhJbiA9IG5ldyBTdWJqZWN0PEVudHJ5QW5kT2JzZXJ2ZXI+KCk7XHJcbiAgcHJpdmF0ZSBpeE91dCA9IG5ldyBTdWJqZWN0PEVudHJ5QW5kT2JzZXJ2ZXI+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIEludGVyc2VjdGlvbk9ic2VydmVyLnByb3RvdHlwZVsnVVNFX01VVEFUSU9OX09CU0VSVkVSJ10gPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcclxuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXhJbi5uZXh0KHsgZW50cnksIG9ic2VydmVyIH0gKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXhPdXQubmV4dCh7IGVudHJ5LCBvYnNlcnZlciB9ICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIHsgcm9vdE1hcmdpbjogJzEwMHB4J30pO1xyXG5cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyWydVU0VfTVVUQVRJT05fT0JTRVJWRVInXSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvYnNlcnZlKGVsZW06IEhUTUxFbGVtZW50KTogeyBpeEluOiBPYnNlcnZhYmxlPEVudHJ5QW5kT2JzZXJ2ZXI+LCBpeE91dDogT2JzZXJ2YWJsZTxFbnRyeUFuZE9ic2VydmVyPiB9IHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGl4SW46IHRoaXMuaXhJbi5waXBlKGZpbHRlcigoe2VudHJ5LCBvYnNlcnZlcn0pID0+IGVudHJ5LnRhcmdldCA9PT0gZWxlbSkpLFxyXG4gICAgICBpeE91dDogdGhpcy5peE91dC5waXBlKGZpbHRlcigoe2VudHJ5LCBvYnNlcnZlcn0pID0+IGVudHJ5LnRhcmdldCA9PT0gZWxlbSkpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHVub2JzZXJ2ZShlbGVtOiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlci51bm9ic2VydmUoZWxlbSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==