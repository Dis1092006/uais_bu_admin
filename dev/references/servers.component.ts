import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IServer} from "./references.service";

@Component({
    selector: 'servers',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr *ngFor="#server of servers | async">
                    <td>{{server.id}}</td>
                    <td>{{server.name}}</td>
                    <td>{{server.alias}}</td>
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