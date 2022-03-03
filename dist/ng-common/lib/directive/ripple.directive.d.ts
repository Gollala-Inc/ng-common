import { ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RippleDirective {
    private _el;
    private renderer;
    constructor(_el: ElementRef, renderer: Renderer2);
    onClick(event: {
        path: string | any[];
        clientX: number;
        clientY: number;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RippleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RippleDirective, "[ripple]", never, {}, {}, never>;
}
