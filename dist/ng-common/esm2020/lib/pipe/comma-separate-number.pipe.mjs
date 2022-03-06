import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CommaSeparateNumberPipe {
    transform(value, args) {
        if (!value) {
            return 0;
        }
        while (/(\d+)(\d{3})/.test(value.toString())) {
            value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        }
        return value;
    }
}
CommaSeparateNumberPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CommaSeparateNumberPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, name: "commaSeparateNumberPipe" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: CommaSeparateNumberPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'commaSeparateNumberPipe'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWEtc2VwYXJhdGUtbnVtYmVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1jb21tb24vc3JjL2xpYi9waXBlL2NvbW1hLXNlcGFyYXRlLW51bWJlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sdUJBQXVCO0lBRWxDLFNBQVMsQ0FBQyxLQUFVLEVBQUUsSUFBVTtRQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUM1QyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyRTtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7b0hBVlUsdUJBQXVCO2tIQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFIbkMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUseUJBQXlCO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY29tbWFTZXBhcmF0ZU51bWJlclBpcGUnXG59KVxuZXhwb3J0IGNsYXNzIENvbW1hU2VwYXJhdGVOdW1iZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB3aGlsZSAoLyhcXGQrKShcXGR7M30pLy50ZXN0KHZhbHVlLnRvU3RyaW5nKCkpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkXFxkXFxkKSsoPyFcXGQpKS9nLCAnJDEsJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG59XG4iXX0=