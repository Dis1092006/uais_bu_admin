import {Pipe, PipeTransform} from "@angular/core";
//import {DateFormatter} from '@angular/src/facade/intl';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
            //var date = value instanceof Date ? value : new Date(value);
            //return DateFormatter.format(date, 'pt', args[0]);
            return value;
        }
    }
}