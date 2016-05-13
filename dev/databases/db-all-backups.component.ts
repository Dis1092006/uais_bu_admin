import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DatabasesService, IBackup} from "./databases.service";

@Component({
	selector: 'db-all-backups',
	template: `
        <button class="btn btn-default" (click)="onRefreshClick()">
  			<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
  			Обновить
  		</button>
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
export class DBAllBackupsComponent implements OnInit {
	backups: Observable<IBackup[]>;

	constructor(private _databasesService: DatabasesService) {
		this.backups = this._databasesService.allBackups$;
	}

	ngOnInit() {
		this.onRefreshClick();
	}

	onRefreshClick() {
		this._databasesService.loadAllBackups();
	}
}