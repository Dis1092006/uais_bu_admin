import {Component, OnInit} from "@angular/core";
import {ReportsService} from "./reports.service";
import {Button} from 'primeng/primeng';
import {Calendar} from 'primeng/primeng';

@Component({
    selector: 'db-file-sizes',
    template: `
        <p-calendar [(ngModel)]="dateValue" dateFormat="dd.mm.yy" monthNavigator="true" yearNavigator="true"></p-calendar>
        <button pButton type="button" icon="fa-refresh" (click)="onRefrechClick()" label="Обновить"></button>
        <div class="table-responsive" [innerHTML]="dbFileSizesTable">
        </div>
     `,
    directives: [Button, Calendar]
})
export class DBFileSizesComponent implements OnInit{
    dbFileSizesTable: string;
    dateValue: string;

	formatDate_ddMMyyyy = function (date) {
		return [
			date.getDate(),
			date.getMonth() + 1,
			date.getFullYear()
		].map(function(val){
			return val < 10 ? '0' + val : val;
		}).join('.');
	};

	constructor(private _reportsService: ReportsService) {

        let now = new Date();
        this.dateValue = this.formatDate_ddMMyyyy(now);

        this._reportsService.dbFileSizesTable$.subscribe(value => {
            this.dbFileSizesTable = value;
        });
    }

    ngOnInit() {
	    this.onRefrechClick();
    }

	onRefrechClick() {
		this._reportsService.loadDBFileSizesTable(this.dateValue.split('.').reverse().join('-'));
	}
}