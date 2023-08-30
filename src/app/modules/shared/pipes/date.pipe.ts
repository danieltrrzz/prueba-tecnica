import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {
  public transform(value: string) {
    return value ? moment(value).format('DD/MM/YYYY') : value;
  };
};
