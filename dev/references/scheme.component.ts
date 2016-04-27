import {Component, OnInit} from "angular2/core";
//import {Observable} from "rxjs/Observable";
import {ReferencesService} from "./references.service";

@Component({
    selector: 'scheme',
    template: `
        <div class="table-responsive" [innerHTML]="schemeTable">
        </div>
     `
})
export class SchemeComponent implements OnInit{
    schemeTable: string;

    constructor(private _referencesService: ReferencesService) {

        this._referencesService.scheme$.subscribe(value => {
            console.log('schemeTable: ' + value);
            this.schemeTable = value;
        });
    }

    ngOnInit() {
        this._referencesService.loadScheme();
    }
}