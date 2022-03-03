import { AfterContentChecked, AfterViewInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class IconComponent implements AfterViewInit, AfterContentChecked {
    contentElem: ElementRef | undefined;
    content: any;
    color: string;
    constructor();
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "gollala-icon", never, { "color": "color"; }, {}, never, ["*"]>;
}
