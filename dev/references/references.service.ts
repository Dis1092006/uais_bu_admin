import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
//import 'rxjs/RX';

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
    node_id : string;
    zone_id : string;
}

export interface IDBMSServer {
    id              : string;
    instance_name   : string;
    port            : string;
    user            : string;
    password        : string;
    server_id       : string;
}

export interface IDatabase {
    id              : string;
    name            : string;
    recovery_model  : string;
    dbms_server_id  : string;
}

@Injectable()
export class ReferencesService {
    private _baseUrl: string;
    zones$: Observable<IZone[]>;
    nodes$: Observable<INode[]>;
    servers$: Observable<INode[]>;
    dbms_servers$: Observable<IDBMSServer[]>;
    databases$: Observable<IDatabase[]>;
    private _zonesObserver: Observer<IZone[]>;
    private _nodesObserver: Observer<INode[]>;
    private _serversObserver: Observer<IServer[]>;
    private _dbms_serversObserver: Observer<IDBMSServer[]>;
    private _databasesObserver: Observer<IDatabase[]>;
    private _dataStore: {
        zones:      IZone[],
        nodes:      INode[],
        servers:    IServer[],
        dbms_servers:    IDBMSServer[],
        databases:    IDatabase[]
    };

    constructor(private _http: Http) {
        this._baseUrl  = 'http://is19-t-web-13:9000/api/v1';
        //this._baseUrl  = 'http://10.126.200.41:9000/api/v1';
        //this._baseUrl  = 'http://localhost:9000/api/v1';

        this.zones$ = new Observable(observer => this._zonesObserver = observer).share();
        this.nodes$ = new Observable(observer => this._nodesObserver = observer).share();
        this.servers$ = new Observable(observer => this._serversObserver = observer).share();
        this.dbms_servers$ = new Observable(observer => this._dbms_serversObserver = observer).share();
        this.databases$ = new Observable(observer => this._databasesObserver = observer).share();
        this._dataStore = {
            zones: [],
            nodes: [],
            servers: [],
            dbms_servers: [],
            databases: []
        };
    }

    loadZones() {
        this._http.get(`${this._baseUrl}/zones`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.zones = data;
                this._zonesObserver.next(this._dataStore.zones);
            },
            error => console.log('Could not load zones. Error: ' + JSON.stringify(error)));
    }

    loadNodes() {
        this._http.get(`${this._baseUrl}/nodes`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.nodes = data;
                this._nodesObserver.next(this._dataStore.nodes);
            },
            error => console.log('Could not load nodes. Error: ' + JSON.stringify(error)));
    }

    loadServers() {
        this._http.get(`${this._baseUrl}/servers`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.servers = data;
                this._serversObserver.next(this._dataStore.servers);
            },
            error => console.log('Could not load servers. Error: ' + JSON.stringify(error)));
    }

    loadDBMSServers() {
        this._http.get(`${this._baseUrl}/dbms-servers`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.dbms_servers = data;
                this._dbms_serversObserver.next(this._dataStore.dbms_servers);
            },
            error => console.log('Could not load dbms servers. Error: ' + JSON.stringify(error)));
    }

    loadDatabases() {
        this._http.get(`${this._baseUrl}/databases`).map(response => response.json()).subscribe(
            data => {
                this._dataStore.databases = data;
                this._databasesObserver.next(this._dataStore.databases);
            },
            error => console.log('Could not load databases. Error: ' + JSON.stringify(error)));
    }
}
