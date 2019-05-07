import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: string, args: any[]): string {
    if (value && +value > 99) {
      return value.replace(',', ' ');
    }
    return value;
  }
}
