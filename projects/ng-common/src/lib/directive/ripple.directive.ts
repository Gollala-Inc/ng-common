import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[ripple]'
})
export class RippleDirective {

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(_el.nativeElement, 'ripple');
  }

  @HostListener('click', ['$event']) onClick(event: { path: string | any[]; clientX: number; clientY: number; }) {
    let elem;
    for(let i = 0; i < event.path.length; i++) {
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
    rippleElement.style.left = x +  'px';
    rippleElement.style.top = y + 'px';
    this._el.nativeElement.appendChild(rippleElement);
    setTimeout(function() {
      rippleElement.remove();
    }, 300);
  }

}
