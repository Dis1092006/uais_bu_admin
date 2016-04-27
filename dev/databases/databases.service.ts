import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Http} from "angular2/http";

export interface IBackup {
    database_name : string;
	file_name     : string;
    backup_date   : string;
    backup_type   : string;
    backup_size   : number;
}

@Injectable()
export class DatabasesService {
	private _baseUrl: string;
	lastBackups$: Observable<IBackup[]>;
	allBackups$: Observable<IBackup[]>;
	private _lastBackupsObserver: Observer<IBackup[]>;
	private _allBackupsObserver: Observer<IBackup[]>;
	private _dataStore: {
		lastBackups: IBackup[],
		allBackups: IBackup[]
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://10.126.200.41:9000/api/v1';

		this.lastBackups$ = new Observable(observer => this._lastBackupsObserver = observer).share();
		this.allBackups$ = new Observable(observer => this._allBackupsObserver = observer).share();
		this._dataStore = {
			lastBackups: [],
			allBackups: []
		};
	}

	loadLastBackups() {
		this._http.get(`${this._baseUrl}/backups/last`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.lastBackups = data;
				this._lastBackupsObserver.next(this._dataStore.lastBackups);
				console.log('lastBackups: ' + data);
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