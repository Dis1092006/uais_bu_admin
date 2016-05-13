import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value) {
            var date = value instanceof Date ? value : new Date(value);
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'UTC'
            };
            return date.toLocaleString('ru-RU', options);
        }
    }
}