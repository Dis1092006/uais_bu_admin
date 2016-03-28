import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

export interface IZone {
    id      : string;
    name    : string;
}

export interface INode {
    id      : string;
    name    : string;
}

export interface IServer {
    id      : string;
    name    : string;
    alias   : string;
}

@Injectable()
export class ReferencesService {
    private _baseUrl: string;
    zones$: Observable<IZone[]>;
    nodes$: Observable<INode[]>;
    servers$: Observable<INode[]>;
    private _zonesObserver: Observer<IZone[]>;
    private _nodesObserver: Observer<INode[]>;
    private _serversObserver: Observer<IServer[]>;
    private _dataStore: {
        zones:      IZone[],
        nodes:      INode[],
        servers:    IServer[]
    };

    constructor(private _http: Http) {
        this._baseUrl  = 'http://10.126.200.41:3000/api/v1';

        this.zones$ = new Observable(observer => this._zonesObserver = observer).share();
        this.nodes$ = new Observable(observer => this._nodesObserver = observer).share();
        this.servers$ = new Observable(observer => this._serversObserver = observer).share();
        this._dataStore = {
            zones: [],
            nodes: [],
            servers: []
        };
    }

    loadZones() {
        this._http.get(`${this._baseUrl}/zones`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.zones = data;
                this._zonesObserver.next(this._dataStore.zones);
            },
            error => console.log('Could not load zones. Error: ' + error));
    }

    loadNodes() {
        this._http.get(`${this._baseUrl}/nodes`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.nodes = data;
                this._nodesObserver.next(this._dataStore.nodes);
            },
            error => console.log('Could not load nodes. Error: ' + error));
    }

    loadServers() {
        this._http.get(`${this._baseUrl}/servers`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.servers = data;
                this._serversObserver.next(this._dataStore.servers);
            },
            error => console.log('Could not load servers. Error: ' + error));
    }
}
