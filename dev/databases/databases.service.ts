import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Http} from "angular2/http";

export interface IBackup {
	date    : string;
	name    : string;
}

@Injectable()
export class DatabasesService {
	private _baseUrl: string;
	todayBackups$: Observable<IBackup[]>;
	allBackups$: Observable<IBackup[]>;
	private _todayBackupsObserver: Observer<IBackup[]>;
	private _allBackupsObserver: Observer<IBackup[]>;
	private _dataStore: {
		todayBackups: IBackup[],
		allBackups: IBackup[]
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://10.126.200.41:9000/api/v1';

		this.todayBackups$ = new Observable(observer => this._todayBackupsObserver = observer).share();
		this.allBackups$ = new Observable(observer => this._allBackupsObserver = observer).share();
		this._dataStore = {
			todayBackups: [],
			allBackups: []
		};
	}

	loadTodayBackups() {
		this._http.get(`${this._baseUrl}/backups/today`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.todayBackups = data;
				this._todayBackupsObserver.next(this._dataStore.todayBackups);
			},
			error => console.log('Could not load today backups. Error: ' + JSON.stringify(error)));
	}

	loadAllBackups() {
		this._http.get(`${this._baseUrl}/backups/all`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.allBackups = data;
				this._allBackupsObserver.next(this._dataStore.allBackups);
			},
			error => console.log('Could not load all backups. Error: ' + JSON.stringify(error)));
	}
}