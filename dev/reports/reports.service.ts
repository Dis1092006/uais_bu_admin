import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class ReportsService {
    private _baseUrl: string;
    schemeTable$: Observable<string>;
    dbFileSizesTable$: Observable<string>;
    private _schemeTableObserver: Observer<string>;
    private _dbFileSizesTableObserver: Observer<string>;
    private _dataStore: {
        schemeTable:       string,
        dbFileSizesTable:  string
    };

    constructor(private _http: Http) {
        this._baseUrl  = 'http://is19-t-web-13:9000/api/v1';
        //this._baseUrl  = 'http://10.126.200.41:9000/api/v1';
        //this._baseUrl  = 'http://localhost:9000/api/v1';

        this.schemeTable$ = new Observable(observer => this._schemeTableObserver = observer).share();
        this.dbFileSizesTable$ = new Observable(observer => this._dbFileSizesTableObserver = observer).share();
        this._dataStore = {
            schemeTable:        '<table />',
            dbFileSizesTable:   '<table />'
        };
    }

    loadScheme() {
        var headers = new Headers();
        headers.append('Accept', 'text/html');
        headers.append('Content-Type', 'text/html');
        this._http.get(`${this._baseUrl}/scheme/table`, {headers: headers})
            .map(response => response.text())
            .subscribe(
                data => {
                    this._dataStore.schemeTable = data;
                    this._schemeTableObserver.next(this._dataStore.schemeTable);
                },
                error => console.log('Could not load scheme. Error: ' + JSON.stringify(error))
            );
    }

    loadDBFileSizesTable(reportDate: string) {
        var headers = new Headers();
        headers.append('Accept', 'text/html');
        headers.append('Content-Type', 'text/html');
        this._http.get(`${this._baseUrl}/databases/table/${reportDate}`, {headers: headers})
            .map(response => response.text())
            .subscribe(
                data => {
                    //console.log('dbFileSizesTable: ' + data);
                    this._dataStore.dbFileSizesTable = data;
                    this._dbFileSizesTableObserver.next(this._dataStore.dbFileSizesTable);
                },
                error => console.log('Could not load db file sizes table. Error: ' + JSON.stringify(error))
            );
    }
}