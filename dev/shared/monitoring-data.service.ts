import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
//import 'rxjs/RX';
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
	web_services_status$: Observable<string>;
	private _baseUrl: string;
	private _dataObserver: Observer<WSMonitoringData[]>;
	private _webServicesStatusObserver: Observer<string>;
	private _dataStore: {
		data: WSMonitoringData[]
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://10.126.200.41:3000/api/v1';

		this.data$ = new Observable(observer => this._dataObserver = observer).share();
		this.web_services_status$ = new Observable(observer => this._webServicesStatusObserver = observer).share();

		this._dataStore = { data: [] };

		this.loadData();
	}

	loadData() {
		this._http.get(`${this._baseUrl}/imd`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.data = data.message;
				if (this._dataObserver) {
					this._dataObserver.next(this._dataStore.data);
				}

				// Определение общего статуса мониторинга web-сервисов.
				let currentStatus = "ok";
				this._dataStore.data.forEach((item) => {
				    if (item.Status === 'Internal Server Error' || item.Status === 'Not Found' || item.Status === 'Bad Request' || item.Status === 'Conflict' || item.Status === 'Forbidden') {
					    currentStatus = "danger";
				    }
				    else if ((item.Status === 'Unauthorized' || item.Status === 'Unauthorized') && currentStatus !== "danger") {
					    currentStatus = "warning";
				    }
				});
				this._webServicesStatusObserver.next(currentStatus);
			},
			error => console.log('Could not load data. Error: ' + error));
	}

	getData() {
		if (this._dataObserver) {
			this._dataObserver.next(this._dataStore.data);
		}
	}
}