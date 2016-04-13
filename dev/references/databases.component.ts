import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IDatabase} from "./references.service";

@Component({
    selector: 'databases',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr *ngFor="#database of databases | async">
                    <td>{{database.id}}</td>
                    <td>{{database.name}}</td>
                    <td>{{database.server}}</td>
                </tr>
            </table>
        </div>
     `
})
export class DatabasesComponent {
    databases: Observable<IDatabase[]>;

    constructor(private _referencesService: ReferencesService) {
        this.databases = this._referencesService.databases$;
        this._referencesService.loadDatabases();
    }
}