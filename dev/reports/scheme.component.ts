import {Component, OnInit} from "@angular/core";
import {ReportsService} from "./reports.service";

@Component({
    selector: 'scheme',
    template: `
        <div class="table-responsive" [innerHTML]="schemeTable">
        </div>
     `
})
export class SchemeComponent implements OnInit{
    schemeTable: string;

    constructor(private _reportsService: ReportsService) {

        this._reportsService.schemeTable$.subscribe(value => {
            this.schemeTable = value;
        });
    }

    ngOnInit() {
        this._reportsService.loadScheme();
    }
}