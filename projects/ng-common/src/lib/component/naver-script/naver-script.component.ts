import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'lib-naver-script',
  templateUrl: './naver-script.component.html',
  styleUrls: ['./naver-script.component.scss']
})
export class NaverScriptComponent implements AfterViewInit {

  @Input('type') type: string | undefined;
  @Input('value') value: string = '1';

  constructor(
    private _renderer2: Renderer2,
    private _el: ElementRef,
  ) { }

  ngAfterViewInit() {
    const wrap = this._renderer2.createElement('div');
    if (this.type) {
      const change1 = this._renderer2.createElement('script');
      const change2 = this._renderer2.createElement('script');
      change1.type = 'text/javascript';
      change1.src = '//wcs.naver.net/wcslog.js';
      change2.type = 'text/javascript';
      change2.text = `var _nasa={}; if(window.wcs) _nasa["cnv"] = wcs.cnv("${this.type}","${this.value}");`;
      this._renderer2.appendChild(this._el.nativeElement, change1);
      setTimeout(() => {
        this._renderer2.appendChild(this._el.nativeElement, change2);
      }, 100);
    }
    const default1 = this._renderer2.createElement('script');
    const default2 = this._renderer2.createElement('script');
    default1.type = 'text/javascript';
    default1.src = '//wcs.naver.net/wcslog.js';
    default2.type = 'text/javascript';
    default2.text =  'if (!wcs_add) var wcs_add={}; wcs_add["wa"] = "s_54bba515ee99"; if (!_nasa) var _nasa={}; if(window.wcs){wcs.inflow(); wcs_do(_nasa);}';
    setTimeout(() => {
      this._renderer2.appendChild(this._el.nativeElement, default1);
    }, 100);
    setTimeout(() => {
      this._renderer2.appendChild(this._el.nativeElement, default2);
    }, 100);
  }
}
