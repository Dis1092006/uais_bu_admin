import {Component, OnInit} from "angular2/core";
import {ReportsService} from "./reports.service";

@Component({
    selector: 'db-file-sizes',
    template: `
        <div class="table-responsive" [innerHTML]="dbFileSizesTable">
        </div>
     `
})
export class DBFileSizesComponent implements OnInit{
    dbFileSizesTable: string;

    constructor(private _reportsService: ReportsService) {

        this._reportsService.dbFileSizesTable$.subscribe(value => {
            this.dbFileSizesTable = value;
        });
    }

    ngOnInit() {
        this._reportsService.loadDBFileSizesTable();
    }
}