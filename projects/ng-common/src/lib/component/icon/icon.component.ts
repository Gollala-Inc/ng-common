import {AfterContentChecked, AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'gollala-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements AfterViewInit, AfterContentChecked {

  @ViewChild('contentElem') contentElem: ElementRef | undefined;
  content: any;

  @Input() color: string = '#1c1c1c';

  constructor() { }

  ngAfterViewInit() {
    if (this.contentElem) {
      this.content = this.contentElem.nativeElement.innerText;
    }
  }

  ngAfterContentChecked() {
    if (this.contentElem) {
      const content =  this.contentElem.nativeElement.innerText;
      if (content !== this.content) {
        this.content = content;
      }
    }
  }

}
