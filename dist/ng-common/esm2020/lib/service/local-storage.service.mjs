import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalStorageService {
    constructor() {
        this.localStorage = window.localStorage;
    }
    get isLocalStorageSupported() {
        return !!this.localStorage;
    }
    set(key, item) {
        if (!this.isLocalStorageSupported) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(item));
    }
    setOn(ns, key, item, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        this.set(namespaced, item);
    }
    get(key, parse = true) {
        if (!this.isLocalStorageSupported) {
            return null;
        }
        if (parse) {
            let parsed = null;
            try {
                parsed = JSON.parse(localStorage.getItem(key));
            }
            catch (e) {
                console.error(`JSON parsing error, key: ${key}`, e);
            }
            return parsed;
        }
        return localStorage.getItem(key);
    }
    getOn(ns, key, parse = true, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        return this.get(namespaced, parse);
    }
    remove(key) {
        if (!this.isLocalStorageSupported) {
            return;
        }
        localStorage.removeItem(key);
    }
    removeOn(ns, key, separator = ':') {
        const namespaced = this.joinBy(ns, key, separator);
        localStorage.removeItem(namespaced);
    }
    removeNamespace(ns, separator = ':') {
        const namespaced = ns.join(separator);
        const keys = Object.keys(localStorage);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            if (key.indexOf(namespaced) >= 0) {
                this.remove(key);
            }
        }
    }
    joinBy(ns, key, separator) {
        return [...ns, key].join(separator);
    }
}
LocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSx1QkFBdUI7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUNELEdBQVcsRUFBRSxJQUFTO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQ0gsRUFBWSxFQUFFLEdBQVcsRUFBRSxJQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7UUFFckQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQ0QsR0FBVyxFQUNYLFFBQWlCLElBQUk7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSTtnQkFDRixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBUyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FDSCxFQUFZLEVBQ1osR0FBVyxFQUNYLFFBQWlCLElBQUksRUFDckIsWUFBb0IsR0FBRztRQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxZQUFvQixHQUFHO1FBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBWSxFQUFFLFlBQW9CLEdBQUc7UUFDbkQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0QyxNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxTQUFpQjtRQUN6RCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dIQXZGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixLQUFLOzJGQUVOLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XG4gIGxvY2FsU3RvcmFnZTogU3RvcmFnZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH1cblxuICBnZXQgaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5sb2NhbFN0b3JhZ2U7XG4gIH1cblxuICBzZXQoXG4gICAga2V5OiBzdHJpbmcsIGl0ZW06IGFueVxuICApIHtcbiAgICBpZiAoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG4gIH1cblxuICBzZXRPbihcbiAgICBuczogc3RyaW5nW10sIGtleTogc3RyaW5nLCBpdGVtOiBhbnksIHNlcGFyYXRvciA9ICc6J1xuICApIHtcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcblxuICAgIHRoaXMuc2V0KG5hbWVzcGFjZWQsIGl0ZW0pO1xuICB9XG5cbiAgZ2V0KFxuICAgIGtleTogc3RyaW5nLFxuICAgIHBhcnNlOiBib29sZWFuID0gdHJ1ZSxcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHBhcnNlKSB7XG4gICAgICBsZXQgcGFyc2VkID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoPHN0cmluZz5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgSlNPTiBwYXJzaW5nIGVycm9yLCBrZXk6ICR7a2V5fWAsIGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGdldE9uKFxuICAgIG5zOiBzdHJpbmdbXSxcbiAgICBrZXk6IHN0cmluZyxcbiAgICBwYXJzZTogYm9vbGVhbiA9IHRydWUsXG4gICAgc2VwYXJhdG9yOiBzdHJpbmcgPSAnOicsXG4gICkge1xuICAgIGNvbnN0IG5hbWVzcGFjZWQgPSB0aGlzLmpvaW5CeShucywga2V5LCBzZXBhcmF0b3IpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0KG5hbWVzcGFjZWQsIHBhcnNlKTtcbiAgfVxuXG4gIHJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5pc0xvY2FsU3RvcmFnZVN1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgcmVtb3ZlT24obnM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnOicpIHtcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcblxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG5hbWVzcGFjZWQpO1xuICB9XG5cbiAgcmVtb3ZlTmFtZXNwYWNlKG5zOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnOicpIHtcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gbnMuam9pbihzZXBhcmF0b3IpO1xuXG4gICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoa2V5LmluZGV4T2YobmFtZXNwYWNlZCkgPj0gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgam9pbkJ5KG5zOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFsuLi5ucywga2V5XS5qb2luKHNlcGFyYXRvcik7XG4gIH1cbn1cbiJdfQ==