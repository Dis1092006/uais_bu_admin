import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
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
		data: WSMonitoringData[],
		currentStatus: string
	};


	constructor(private _http: Http) {
		this._baseUrl  = 'http://10.126.200.41:9000/api/v1';
		//this._baseUrl  = 'http://localhost:9000/api/v1';

		this.data$ = new Observable(observer => this._dataObserver = observer).share();
		this.web_services_status$ = new Observable(observer => this._webServicesStatusObserver = observer).share();

		this._dataStore = {
			data: [],
			currentStatus: "none"
		};

		this.loadData();
		var self = this;
		setTimeout(
			function refresh() {
				self.loadData();
				setTimeout(refresh, 60000);
			},
			60000);
	}

	loadData() {
		console.log("loadData, now = " + new Date().toTimeString());
		this._http.get(`${this._baseUrl}/imd`).map(response => response.json()).subscribe(
			data => {
				this._dataStore.data = data.message;
				if (this._dataObserver) {
					//console.log("loadData, _dataObserver.next");
					this._dataObserver.next(this._dataStore.data);
				}

				// Определение общего статуса мониторинга web-сервисов.
				this._dataStore.currentStatus = "none";
				this._dataStore.data.forEach((item) => {
				    if (item.Status === 'Internal Server Error' || item.Status === 'Not Found' || item.Status === 'Bad Request' || item.Status === 'Conflict' || item.Status === 'Forbidden') {
						this._dataStore.currentStatus = "danger";
				    }
				    else if ((item.Status === 'Unauthorized' || +item.CheckDuration > 1) && this._dataStore.currentStatus !== "danger") {
						this._dataStore.currentStatus = "warning";
				    }
					else if (this._dataStore.currentStatus !== "danger" && this._dataStore.currentStatus !== "warning") {
						this._dataStore.currentStatus = "ok";
					}
				});
				if (this._webServicesStatusObserver) {
					//console.log("loadData, _webServicesStatusObserver.next");
					this._webServicesStatusObserver.next(this._dataStore.currentStatus);
				}
			},
			error => console.log('Could not load data. Error: ' + JSON.stringify(error)));
	}

	getData() {
		console.log("getData, now = " + new Date().toTimeString());
		if (this._dataObserver) {
			console.log("getData, _dataObserver.next");
			this._dataObserver.next(this._dataStore.data);
		}
		if (this._webServicesStatusObserver) {
			console.log("getData, _webServicesStatusObserver.next");
			this._webServicesStatusObserver.next(this._dataStore.currentStatus);
		}
	}
}