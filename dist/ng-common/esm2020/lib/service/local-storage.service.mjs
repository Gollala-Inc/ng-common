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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSx1QkFBdUI7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUNELEdBQVcsRUFBRSxJQUFTO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQ0gsRUFBWSxFQUFFLEdBQVcsRUFBRSxJQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7UUFFckQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQ0QsR0FBVyxFQUNYLFFBQWlCLElBQUk7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSTtnQkFDRixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBUyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FDSCxFQUFZLEVBQ1osR0FBVyxFQUNYLFFBQWlCLElBQUksRUFDckIsWUFBb0IsR0FBRztRQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxZQUFvQixHQUFHO1FBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBWSxFQUFFLFlBQW9CLEdBQUc7UUFDbkQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0QyxNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxTQUFpQjtRQUN6RCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dIQXZGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixLQUFLOzJGQUVOLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ2FueSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xyXG4gIGxvY2FsU3RvcmFnZTogU3RvcmFnZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gISF0aGlzLmxvY2FsU3RvcmFnZTtcclxuICB9XHJcblxyXG4gIHNldChcclxuICAgIGtleTogc3RyaW5nLCBpdGVtOiBhbnlcclxuICApIHtcclxuICAgIGlmICghdGhpcy5pc0xvY2FsU3RvcmFnZVN1cHBvcnRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcclxuICB9XHJcblxyXG4gIHNldE9uKFxyXG4gICAgbnM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZywgaXRlbTogYW55LCBzZXBhcmF0b3IgPSAnOidcclxuICApIHtcclxuICAgIGNvbnN0IG5hbWVzcGFjZWQgPSB0aGlzLmpvaW5CeShucywga2V5LCBzZXBhcmF0b3IpO1xyXG5cclxuICAgIHRoaXMuc2V0KG5hbWVzcGFjZWQsIGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0KFxyXG4gICAga2V5OiBzdHJpbmcsXHJcbiAgICBwYXJzZTogYm9vbGVhbiA9IHRydWUsXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAocGFyc2UpIHtcclxuICAgICAgbGV0IHBhcnNlZCA9IG51bGw7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZSg8c3RyaW5nPmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgSlNPTiBwYXJzaW5nIGVycm9yLCBrZXk6ICR7a2V5fWAsIGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgfVxyXG5cclxuICBnZXRPbihcclxuICAgIG5zOiBzdHJpbmdbXSxcclxuICAgIGtleTogc3RyaW5nLFxyXG4gICAgcGFyc2U6IGJvb2xlYW4gPSB0cnVlLFxyXG4gICAgc2VwYXJhdG9yOiBzdHJpbmcgPSAnOicsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXQobmFtZXNwYWNlZCwgcGFyc2UpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZU9uKG5zOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nID0gJzonKSB7XHJcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lc3BhY2VkKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZU5hbWVzcGFjZShuczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJzonKSB7XHJcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gbnMuam9pbihzZXBhcmF0b3IpO1xyXG5cclxuICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICBpZiAoa2V5LmluZGV4T2YobmFtZXNwYWNlZCkgPj0gMCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgam9pbkJ5KG5zOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gWy4uLm5zLCBrZXldLmpvaW4oc2VwYXJhdG9yKTtcclxuICB9XHJcbn1cclxuIl19