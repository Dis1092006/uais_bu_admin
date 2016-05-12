import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DatabasesService, IBackup} from "./databases.service";

@Component({
	selector: 'db-all-backups',
	template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr *ngFor="let backup of backups | async">
                    <td>{{backup.date}}</td>
                    <td>{{backup.name}}</td>
                </tr>
            </table>
        </div>
     `
})
export class DBAllBackupsComponent {
	backups: Observable<IBackup[]>;

	constructor(private _databasesService: DatabasesService) {
		this.backups = this._databasesService.allBackups$;
		this._databasesService.loadAllBackups();
	}
}