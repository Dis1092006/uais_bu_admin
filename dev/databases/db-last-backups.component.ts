import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {DatabasesService, IBackup} from "./databases.service";

@Component({
	selector: 'db-last-backups',
	template: `
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr>
                    <th>Имя БД</th>
                    <th>Имя файла архива</th>
                    <th>Дата создания архива</th>
                    <th>Тип архива</th>
                    <th>Размер архива</th>
                </tr>
                <tr *ngFor="#backup of backups | async">
                    <td>{{backup.database_name}}</td>
                    <td>{{backup.file_name}}</td>
                    <td>{{backup.backup_date}}</td>
                    <td>{{backup.backup_type}}</td>
                    <td>{{backup.backup_size}}</td>
                </tr>
            </table>
        </div>
     `
})
export class DBLastBackupsComponent {
	backups: Observable<IBackup[]>;

	constructor(private _databasesService: DatabasesService) {
		this.backups = this._databasesService.lastBackups$;
		this._databasesService.loadLastBackups();
	}
}