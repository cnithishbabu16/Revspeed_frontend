import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 30) {
      return 'Monthly';
    } else if (value > 30 && value <= 90) {
      return 'Quarterly';
    } else if (value > 90 && value <= 365) {
      return 'Yearly';
    }
    return `${value} days`;
  }

}
