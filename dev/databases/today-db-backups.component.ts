import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {DatabasesService, IBackup} from "./databases.service";

@Component({
	selector: 'today-db-backups',
	template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr *ngFor="#backup of backups | async">
                    <td>{{backup.date}}</td>
                    <td>{{backup.name}}</td>
                </tr>
            </table>
        </div>
     `
})
export class TodayDBBackupsComponent {
	backups: Observable<IBackup[]>;

	constructor(private _databasesService: DatabasesService) {
		this.backups = this._databasesService.todayBackups$;
		this._databasesService.loadTodayBackups();
	}
}