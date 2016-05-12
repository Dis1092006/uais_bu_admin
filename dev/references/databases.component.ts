import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IDatabase} from "./references.service";

@Component({
    selector: 'databases',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
               <tr>
                    <th>Ид базы данных</th>
                    <th>Имя базы данных</th>
                    <th>Модель восстановления</th>
                    <th>Ид сервера СУБД</th>
                </tr>
                <tr *ngFor="let database of databases | async">
                    <td>{{database.id}}</td>
                    <td>{{database.name}}</td>
                    <td>{{database.recovery_model}}</td>
                    <td>{{database.dbms_server_id}}</td>
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