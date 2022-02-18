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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctY29tbW9uL3NyYy9saWIvc2VydmljZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSx1QkFBdUI7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUNELEdBQVcsRUFBRSxJQUFTO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQ0gsRUFBWSxFQUFFLEdBQVcsRUFBRSxJQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7UUFFckQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQ0QsR0FBVyxFQUNYLFFBQWlCLElBQUk7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSTtnQkFDRixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBUyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FDSCxFQUFZLEVBQ1osR0FBVyxFQUNYLFFBQWlCLElBQUksRUFDckIsWUFBb0IsR0FBRztRQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1NBQ1I7UUFDRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxZQUFvQixHQUFHO1FBQ3pELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxlQUFlLENBQUMsRUFBWSxFQUFFLFlBQW9CLEdBQUc7UUFDbkQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0QyxNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsRUFBWSxFQUFFLEdBQVcsRUFBRSxTQUFpQjtRQUN6RCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O2dIQXZGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xuICBsb2NhbFN0b3JhZ2U6IFN0b3JhZ2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9XG5cbiAgZ2V0IGlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubG9jYWxTdG9yYWdlO1xuICB9XG5cbiAgc2V0KFxuICAgIGtleTogc3RyaW5nLCBpdGVtOiBhbnlcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xuICB9XG5cbiAgc2V0T24oXG4gICAgbnM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZywgaXRlbTogYW55LCBzZXBhcmF0b3IgPSAnOidcbiAgKSB7XG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IHRoaXMuam9pbkJ5KG5zLCBrZXksIHNlcGFyYXRvcik7XG5cbiAgICB0aGlzLnNldChuYW1lc3BhY2VkLCBpdGVtKTtcbiAgfVxuXG4gIGdldChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBwYXJzZTogYm9vbGVhbiA9IHRydWUsXG4gICkge1xuICAgIGlmICghdGhpcy5pc0xvY2FsU3RvcmFnZVN1cHBvcnRlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChwYXJzZSkge1xuICAgICAgbGV0IHBhcnNlZCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBwYXJzZWQgPSBKU09OLnBhcnNlKDxzdHJpbmc+bG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEpTT04gcGFyc2luZyBlcnJvciwga2V5OiAke2tleX1gLCBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBnZXRPbihcbiAgICBuczogc3RyaW5nW10sXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcGFyc2U6IGJvb2xlYW4gPSB0cnVlLFxuICAgIHNlcGFyYXRvcjogc3RyaW5nID0gJzonLFxuICApIHtcbiAgICBjb25zdCBuYW1lc3BhY2VkID0gdGhpcy5qb2luQnkobnMsIGtleSwgc2VwYXJhdG9yKTtcblxuICAgIHJldHVybiB0aGlzLmdldChuYW1lc3BhY2VkLCBwYXJzZSk7XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHJlbW92ZU9uKG5zOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nID0gJzonKSB7XG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IHRoaXMuam9pbkJ5KG5zLCBrZXksIHNlcGFyYXRvcik7XG5cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lc3BhY2VkKTtcbiAgfVxuXG4gIHJlbW92ZU5hbWVzcGFjZShuczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJzonKSB7XG4gICAgY29uc3QgbmFtZXNwYWNlZCA9IG5zLmpvaW4oc2VwYXJhdG9yKTtcblxuICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBrZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleS5pbmRleE9mKG5hbWVzcGFjZWQpID49IDApIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGpvaW5CeShuczogc3RyaW5nW10sIGtleTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZykge1xuICAgIHJldHVybiBbLi4ubnMsIGtleV0uam9pbihzZXBhcmF0b3IpO1xuICB9XG59XG4iXX0=