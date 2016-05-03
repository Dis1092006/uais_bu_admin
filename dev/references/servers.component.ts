import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IServer} from "./references.service";

@Component({
    selector: 'servers',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
               <tr>
                    <th>Ид сервера</th>
                    <th>Имя сервера</th>
                    <th>Псевдоним</th>
                    <th>Ид ноды</th>
                    <th>Ид зоны</th>
                </tr>
                <tr *ngFor="#server of servers | async">
                    <td>{{server.id}}</td>
                    <td>{{server.name}}</td>
                    <td>{{server.alias}}</td>
                    <td>{{server.node_id}}</td>
                    <td>{{server.zone_id}}</td>
                </tr>
            </table>
        </div>
     `
})
export class ServersComponent {
    servers: Observable<IServer[]>;

    constructor(private _referencesService: ReferencesService) {
        this.servers = this._referencesService.servers$;
        this._referencesService.loadServers();
    }
}