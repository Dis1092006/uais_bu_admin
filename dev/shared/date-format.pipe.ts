import {Pipe, PipeTransform} from "angular2/core";
import {DateFormatter} from 'angular2/src/facade/intl';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
            var date = value instanceof Date ? value : new Date(value);
            return DateFormatter.format(date, 'pt', args[0]);
        }
    }
}