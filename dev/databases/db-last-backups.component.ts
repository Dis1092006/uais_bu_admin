import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DatabasesService, IBackup} from "./databases.service";
import {DateFormatPipe} from "../shared/date-format.pipe";

@Component({
	selector: 'db-last-backups',
	template: `
        <button class="btn btn-default" (click)="onRefreshClick()">
  			<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
  			Обновить
  		</button>
        <div class="table-responsive">
            <table class="table table-bordered table-condensed">
                <tr>
                    <th>Имя БД</th>
                    <th>Имя файла архива</th>
                    <th>Дата создания архива</th>
                    <th>Тип архива</th>
                    <th>Размер архива</th>
                </tr>
                <tr *ngFor="let backup of backups | async">
                    <td>{{backup.database_name}}</td>
                    <td>{{backup.file_name}}</td>
                    <td>{{backup.backup_date | dateFormat:'dd/MM/yyyy HH:mm:ss'}}</td>
                    <td>{{backup.backup_type}}</td>
                    <td align="right">{{backup.backup_size}}</td>
                </tr>
            </table>
        </div>
     `,
	pipes: [DateFormatPipe]
})
export class DBLastBackupsComponent implements OnInit {
	backups: Observable<IBackup[]>;

	constructor(private _databasesService: DatabasesService) {
		this.backups = this._databasesService.lastBackups$;
	}

	ngOnInit() {
		this.onRefreshClick();
	}

	onRefreshClick() {
		this._databasesService.loadLastBackups();
	}
}