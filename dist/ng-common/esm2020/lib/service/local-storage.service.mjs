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
LocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSx1QkFBdUI7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUNELEdBQVcsRUFBRSxJQUFTO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQ0gsRUFBWSxFQUFFLEdBQVcsRUFBRSxJQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7UUFFckQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQ0QsR0FBVyxFQUNYLFFBQWlCLElBQUk7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSTtnQkFDRixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBUyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FDSCxFQUFZLEVBQ1osR0FBVyxFQUNYLFFBQWlCLElBQUksRUFDckIsWUFBb0IsR0FBRztRQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxZQUFvQixHQUFHO1FBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBWSxFQUFFLFlBQW9CLEdBQUc7UUFDbkQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0QyxNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxTQUFpQjtRQUN6RCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dIQXZGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcclxuICBsb2NhbFN0b3JhZ2U6IFN0b3JhZ2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5sb2NhbFN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICBzZXQoXHJcbiAgICBrZXk6IHN0cmluZywgaXRlbTogYW55XHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XHJcbiAgfVxyXG5cclxuICBzZXRPbihcclxuICAgIG5zOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIGl0ZW06IGFueSwgc2VwYXJhdG9yID0gJzonXHJcbiAgKSB7XHJcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcclxuXHJcbiAgICB0aGlzLnNldChuYW1lc3BhY2VkLCBpdGVtKTtcclxuICB9XHJcblxyXG4gIGdldChcclxuICAgIGtleTogc3RyaW5nLFxyXG4gICAgcGFyc2U6IGJvb2xlYW4gPSB0cnVlLFxyXG4gICkge1xyXG4gICAgaWYgKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnNlKSB7XHJcbiAgICAgIGxldCBwYXJzZWQgPSBudWxsO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoPHN0cmluZz5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEpTT04gcGFyc2luZyBlcnJvciwga2V5OiAke2tleX1gLCBlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGFyc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0T24oXHJcbiAgICBuczogc3RyaW5nW10sXHJcbiAgICBrZXk6IHN0cmluZyxcclxuICAgIHBhcnNlOiBib29sZWFuID0gdHJ1ZSxcclxuICAgIHNlcGFyYXRvcjogc3RyaW5nID0gJzonLFxyXG4gICkge1xyXG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IHRoaXMuam9pbkJ5KG5zLCBrZXksIHNlcGFyYXRvcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0KG5hbWVzcGFjZWQsIHBhcnNlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShrZXk6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVPbihuczogc3RyaW5nW10sIGtleTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyA9ICc6Jykge1xyXG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IHRoaXMuam9pbkJ5KG5zLCBrZXksIHNlcGFyYXRvcik7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obmFtZXNwYWNlZCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVOYW1lc3BhY2UobnM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICc6Jykge1xyXG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IG5zLmpvaW4oc2VwYXJhdG9yKTtcclxuXHJcbiAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcclxuICAgICAgaWYgKGtleS5pbmRleE9mKG5hbWVzcGFjZWQpID49IDApIHtcclxuICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGpvaW5CeShuczogc3RyaW5nW10sIGtleTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIFsuLi5ucywga2V5XS5qb2luKHNlcGFyYXRvcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==