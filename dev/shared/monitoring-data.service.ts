import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

export interface WSMonitoringData {
	Name            : string;
	Status          : string;
	CheckTime       : string;
	CheckDuration   : string;
}

export interface LostedRPHostData {
	cluster     : string;
	server      : string;
	rphosts     : string;
	created_at  : string;
}

@Injectable()
export class MonitoringDataService {
	data$: Observable<WSMonitoringData[]>;
	web_services_status$: Observable<string>;
	lostedRPHostsData$: Observable<LostedRPHostData[]>;
	lostedRPHostsStatus$: Observable<string>;
	private _baseUrl: string;
	private _dataObserver: Observer<WSMonitoringData[]>;
	private _webServicesStatusObserver: Observer<string>;
	private _lostedRPHostsObserver: Observer<LostedRPHostData[]>;
	private _lostedRPHostsStatusObserver: Observer<string>;
	private _dataStore: {
		data: WSMonitoringData[],
		lostedRPHostsData: LostedRPHostData[],
		currentStatus: string,
		lostedRPHostsStatus: string
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://is19-t-web-13:9000/api/v1';
		//this._baseUrl  = 'http://10.126.200.41:9000/api/v1';
		//this._baseUrl  = 'http://localhost:9000/api/v1';

		this.data$ = new Observable(observer => this._dataObserver = observer).share();
		this.web_services_status$ = new Observable(observer => this._webServicesStatusObserver = observer).share();
		this.lostedRPHostsData$ = new Observable(observer => this._lostedRPHostsObserver = observer).share();
		this.lostedRPHostsStatus$ = new Observable(observer => this._lostedRPHostsStatusObserver = observer).share();

		this._dataStore = {
			data: [],
			currentStatus: "none",
			lostedRPHostsData: [],
			lostedRPHostsStatus: "none"
		};

		this.loadData();
		var self = this;
		setTimeout(
			function refresh() {
				self.loadData();
				setTimeout(refresh, 60000);
			},
			60000
		);

		this.refreshLostedRPHostData();
		//var self = this;
		setTimeout(
			function refresh() {
				self.refreshLostedRPHostData();
				setTimeout(refresh, 60000);
			},
			60000
		);
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

	loadLostedRPHostData(): Observable<any> {
		console.log("loadLostedRPHostData, now = " + new Date().toTimeString());
		return this._http.get(`${this._baseUrl}/clusters1c/losted-rphosts`)
			.map(response => response.json())
			.catch(error => {
				console.error(error);
				return Observable.throw(error.json());
			});
	}

	refreshLostedRPHostData() {
		console.log("refreshLostedRPHostData, now = " + new Date().toTimeString());
		this.loadLostedRPHostData()
			.subscribe(
				data => {
					console.log("setLostedRPHostData, now = " + new Date().toTimeString());
					this._dataStore.lostedRPHostsData = data;
					// Определение общего статуса мониторинга потерянных процессов rphost.
					this._dataStore.lostedRPHostsStatus = "ok";
					console.log('this._dataStore.lostedRPHostsData.length = ' + this._dataStore.lostedRPHostsData.length);
					if (this._dataStore.lostedRPHostsData.length > 3) {
						this._dataStore.lostedRPHostsStatus = "danger";
					}
					else if (this._dataStore.lostedRPHostsData.length > 0) {
						this._dataStore.lostedRPHostsStatus = "warning";
					}
				}//,
				//error => console.log('Could not load nodes. Error: ' + JSON.stringify(error))
			);
	}

	getLostedRPHostData() {
		console.log("getLostedRPHostData, now = " + new Date().toTimeString());
		return this._dataStore.lostedRPHostsData;
	}

	getLostedRPHostStatus() {
		console.log("getLostedRPHostStatus, now = " + new Date().toTimeString());
		return this._dataStore.lostedRPHostsStatus;
	}
}