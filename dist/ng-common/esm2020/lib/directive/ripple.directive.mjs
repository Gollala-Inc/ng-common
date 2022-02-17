import { Directive, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
export class RippleDirective {
    constructor(_el, renderer) {
        this._el = _el;
        this.renderer = renderer;
        this.renderer.addClass(_el.nativeElement, 'ripple');
    }
    onClick(event) {
        let elem;
        for (let i = 0; i < event.path.length; i++) {
            const e = event.path[i];
            if (e.classList.contains('ripple')) {
                elem = e;
                break;
            }
        }
        let x = event.clientX - elem.offsetLeft;
        let y = event.clientY - elem.offsetTop;
        let rippleElement = this.renderer.createElement('span');
        this.renderer.addClass(rippleElement, 'ripple-effect');
        rippleElement.style.left = x + 'px';
        rippleElement.style.top = y + 'px';
        this._el.nativeElement.appendChild(rippleElement);
        setTimeout(function () {
            rippleElement.remove();
        }, 300);
    }
}
RippleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RippleDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
RippleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.3", type: RippleDirective, selector: "[ripple]", host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.3", ngImport: i0, type: RippleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ripple]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWNvbW1vbi9zcmMvbGliL2RpcmVjdGl2ZS9yaXBwbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsWUFBWSxFQUFZLE1BQU0sZUFBZSxDQUFDOztBQUs3RSxNQUFNLE9BQU8sZUFBZTtJQUUxQixZQUNVLEdBQWUsRUFDZixRQUFtQjtRQURuQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUUzQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFa0MsT0FBTyxDQUFDLEtBQWtFO1FBQzNHLElBQUksSUFBSSxDQUFDO1FBQ1QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDVCxNQUFNO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBSSxJQUFJLENBQUM7UUFDckMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDO1lBQ1QsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7OzRHQTVCVSxlQUFlO2dHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtpQkFDckI7eUhBVW9DLE9BQU87c0JBQXpDLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JpcHBsZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSaXBwbGVEaXJlY3RpdmUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKF9lbC5uYXRpdmVFbGVtZW50LCAncmlwcGxlJyk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIG9uQ2xpY2soZXZlbnQ6IHsgcGF0aDogc3RyaW5nIHwgYW55W107IGNsaWVudFg6IG51bWJlcjsgY2xpZW50WTogbnVtYmVyOyB9KSB7XHJcbiAgICBsZXQgZWxlbTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudC5wYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGUgPSBldmVudC5wYXRoW2ldO1xyXG4gICAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JpcHBsZScpKSB7XHJcbiAgICAgICAgZWxlbSA9IGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCB4ID0gZXZlbnQuY2xpZW50WCAtIGVsZW0ub2Zmc2V0TGVmdDtcclxuICAgIGxldCB5ID0gZXZlbnQuY2xpZW50WSAtIGVsZW0ub2Zmc2V0VG9wO1xyXG4gICAgbGV0IHJpcHBsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmlwcGxlRWxlbWVudCwgJ3JpcHBsZS1lZmZlY3QnKTtcclxuICAgIHJpcHBsZUVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyAgJ3B4JztcclxuICAgIHJpcHBsZUVsZW1lbnQuc3R5bGUudG9wID0geSArICdweCc7XHJcbiAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHJpcHBsZUVsZW1lbnQpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgcmlwcGxlRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=