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
	currentWSData$: Observable<WSMonitoringData[]>;
	currentWSStatus$: Observable<string>;
	lostedRPHostsData$: Observable<LostedRPHostData[]>;
	lostedRPHostsStatus$: Observable<string>;
	private _baseUrl: string;
	private _currentWSDataObserver: Observer<WSMonitoringData[]>;
	private _currentWSStatusObserver: Observer<string>;
	private _lostedRPHostsObserver: Observer<LostedRPHostData[]>;
	private _lostedRPHostsStatusObserver: Observer<string>;
	private _dataStore: {
		currentWSData: WSMonitoringData[],
		lostedRPHostsData: LostedRPHostData[],
		currentWSStatus: string,
		lostedRPHostsStatus: string
	};

	constructor(private _http: Http) {
		this._baseUrl  = 'http://is19-t-web-13:9000/api/v1';
		//this._baseUrl  = 'http://10.126.200.41:9000/api/v1';
		//this._baseUrl  = 'http://localhost:9000/api/v1';

		this.currentWSData$ = new Observable(observer => this._currentWSDataObserver = observer).share();
		this.currentWSStatus$ = new Observable(observer => this._currentWSStatusObserver = observer).share();
		this.lostedRPHostsData$ = new Observable(observer => this._lostedRPHostsObserver = observer).share();
		this.lostedRPHostsStatus$ = new Observable(observer => this._lostedRPHostsStatusObserver = observer).share();

		this._dataStore = {
			currentWSData: [],
			currentWSStatus: "none",
			lostedRPHostsData: [],
			lostedRPHostsStatus: "none"
		};

		this.refreshCurrentWSData();
		var self = this;
		setTimeout(
			function refresh() {
				self.refreshCurrentWSData();
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

	loadCurrentWSData(): Observable<any> {
		console.log("loadCurrentWSData, now = " + new Date().toTimeString());
		return this._http.get(`${this._baseUrl}/imd`)
			.map(response => response.json())
			.catch(error => {
				console.error(error);
				return Observable.throw(error.json());
			});
	}

	refreshCurrentWSData() {
		console.log("refreshCurrentWSData, now = " + new Date().toTimeString());
		this.loadCurrentWSData()
			.subscribe(
				data => {
					this._dataStore.currentWSData = data.message;
					if (this._currentWSDataObserver) {
						//console.log("loadData, _dataObserver.next");
						this._currentWSDataObserver.next(this._dataStore.currentWSData);
					}

					// Определение общего статуса мониторинга web-сервисов.
					this._dataStore.currentWSStatus = "none";
					this._dataStore.currentWSData.forEach((item) => {
						if (item.Status === 'Internal Server Error' || item.Status === 'Not Found' || item.Status === 'Bad Request' || item.Status === 'Conflict' || item.Status === 'Forbidden') {
							this._dataStore.currentWSStatus = "danger";
						}
						else if ((item.Status === 'Unauthorized' || +item.CheckDuration > 1) && this._dataStore.currentWSStatus !== "danger") {
							this._dataStore.currentWSStatus = "warning";
						}
						else if (this._dataStore.currentWSStatus !== "danger" && this._dataStore.currentWSStatus !== "warning") {
							this._dataStore.currentWSStatus = "ok";
						}
					});
					if (this._currentWSStatusObserver) {
						//console.log("loadData, _currentWSStatusObserver.next");
						this._currentWSStatusObserver.next(this._dataStore.currentWSStatus);
					}
				},
				error => console.log('Could not load current WS data. Error: ' + JSON.stringify(error)));
	}

	getCurrentWSData() {
		console.log("getCurrentWSData, now = " + new Date().toTimeString());
		return this._dataStore.currentWSData;
	}

	getCurrentWSStatus() {
		console.log("getCurrentWSStatus, now = " + new Date().toTimeString());
		return this._dataStore.currentWSStatus;
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
					if (this._lostedRPHostsObserver) {
						this._lostedRPHostsObserver.next(this._dataStore.lostedRPHostsData);
					}

					// Определение общего статуса мониторинга потерянных процессов rphost.
					this._dataStore.lostedRPHostsStatus = "ok";
					console.log('this._dataStore.lostedRPHostsData.length = ' + this._dataStore.lostedRPHostsData.length);
					if (this._dataStore.lostedRPHostsData.length > 3) {
						this._dataStore.lostedRPHostsStatus = "danger";
					}
					else if (this._dataStore.lostedRPHostsData.length > 0) {
						this._dataStore.lostedRPHostsStatus = "warning";
					}
					if (this._lostedRPHostsStatusObserver) {
						//console.log("loadData, _currentWSStatusObserver.next");
						this._lostedRPHostsStatusObserver.next(this._dataStore.lostedRPHostsStatus);
					}
				},
				error => console.log('Could not load losted rphosts data. Error: ' + JSON.stringify(error))
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