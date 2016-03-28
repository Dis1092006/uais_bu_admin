import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ReferencesService, IZone} from "./references.service";

@Component({
    selector: 'zones',
    template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr *ngFor="#zone of zones | async">
                    <td>{{zone.id}}</td>
                    <td>{{zone.name}}</td>
                </tr>
            </table>
        </div>
     `
})
export class ZonesComponent {
    zones: Observable<IZone[]>;

    constructor(private _referencesService: ReferencesService) {
        this.zones = this._referencesService.zones$;
        this._referencesService.loadZones();
    }
}