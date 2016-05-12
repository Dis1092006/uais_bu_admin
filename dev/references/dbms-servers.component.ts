import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IDBMSServer} from "./references.service";

@Component({
    selector: 'dbms-servers',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
               <tr>
                    <th>Ид сервера СУБД</th>
                    <th>Имя инстанса</th>
                    <th>Порт</th>
                    <th>Пользователь</th>
                    <th>Пароль</th>
                    <th>Ид сервера</th>
                </tr>
                <tr *ngFor="#dbms_server of dbms_servers | async">
                    <td>{{dbms_server.id}}</td>
                    <td>{{dbms_server.instance_name}}</td>
                    <td>{{dbms_server.port}}</td>
                    <td>{{dbms_server.user}}</td>
                    <td>{{dbms_server.password}}</td>
                    <td>{{dbms_server.server_id}}</td>
                </tr>
            </table>
        </div>
     `
})
export class DBMSServersComponent {
    dbms_servers: Observable<IDBMSServer[]>;

    constructor(private _referencesService: ReferencesService) {
        this.dbms_servers = this._referencesService.dbms_servers$;
        this._referencesService.loadDBMSServers();
    }
}