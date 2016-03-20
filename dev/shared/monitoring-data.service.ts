import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

export interface WSMonitoringData {
	Name            : string;
	Status          : string;
	CheckTime       : string;
	CheckDuration   : string;
}

@Injectable()
export class MonitoringDataService {
	data$: Observable<WSMonitoringData[]>;
	private _baseUrl: string;
	private _dataObserver: Observer<WSMonitoringData[]>;
	private _dataStore: {
		data: WSMonitoringData[]
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://10.126.200.41:3000/api';
		this.data$ = new Observable(observer => this._dataObserver = observer).share();
		this._dataStore = { data: [] };
	}

	loadData() {
		this._http.get(`${this._baseUrl}/imd`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.data = data.message;
				this._dataObserver.next(this._dataStore.data);
			}, 
			error => console.log('Could not load data.'));
	}
}