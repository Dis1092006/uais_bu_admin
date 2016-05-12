import {Component, OnInit} from "@angular/core";
import {ReportsService} from "./reports.service";
import {Calendar} from 'primeng/primeng';
import {InputText} from 'primeng/primeng';

@Component({
    selector: 'db-file-sizes',
    template: `
        <p-calendar [(ngModel)]="dateValue" dateFormat="dd.mm.yy"></p-calendar>
        <div class="table-responsive" [innerHTML]="dbFileSizesTable">
        </div>
     `,
    directives: [InputText, Calendar]
})
export class DBFileSizesComponent implements OnInit{
    dbFileSizesTable: string;
    dateValue: string;
    data: any;

    constructor(private _reportsService: ReportsService) {

        let now = new Date();
        this.dateValue = '12.05.2016';

        this._reportsService.dbFileSizesTable$.subscribe(value => {
            this.dbFileSizesTable = value;

            this.data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        fillColor: '#42A5F5',
                        strokeColor: '#1E88E5',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        fillColor: '#9CCC65',
                        strokeColor: '#7CB342',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            }
        });
    }

    ngOnInit() {
        this._reportsService.loadDBFileSizesTable();
    }
}