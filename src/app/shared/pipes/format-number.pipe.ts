import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
     name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
     transform(value: any, ...args: any[]) {
          throw new Error('Method not implemented.');
     }
}
