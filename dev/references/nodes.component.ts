import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, INode} from "./references.service";

@Component({
    selector: 'nodes',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
               <tr>
                    <th>Ид ноды</th>
                    <th>Имя ноды</th>
                </tr>
                <tr *ngFor="#node of nodes | async">
                    <td>{{node.id}}</td>
                    <td>{{node.name}}</td>
                </tr>
            </table>
        </div>
     `
})
export class NodesComponent {
    nodes: Observable<INode[]>;

    constructor(private _referencesService: ReferencesService) {
        this.nodes = this._referencesService.nodes$;
        this._referencesService.loadNodes();
    }
}