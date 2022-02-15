import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparateNumberPipe'
})
export class CommaSeparateNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return 0;
    }
    while (/(\d+)(\d{3})/.test(value.toString())) {
      value = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    return value;
  }

}
