import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {WSMonitoringData, MonitoringDataService} from "../shared/monitoring-data.service";

@Component({
	selector: 'dashboard-web-services',
	template: `
		<h1 class="page-header">Web-сервисы</h1>
		<button (click)="onRefreshData()">Refresh</button>
		<div>
			<div class="table-responsive">
                <table class="table table-bordered table-condensed">
                    <tr 
                    	*ngFor="#item of data | async" 
                    	[ngClass]="{
                    		warning: item.Status !== 'OK', 
                    		danger: item.Status === 'Internal Server Error' || item.Status === 'Not Found' || item.Status === 'Bad Request' || item.Status === 'Conflict' || item.Status === 'Forbidden'
                    	}">
                        <td>{{item.Name}}</td>
                        <td>
                        	<span aria-hidden="true" class="glyphicon"
                        		[ngClass]="{
                        			'glyphicon-ok': item.Status === 'OK',
                        			'glyphicon-lock': item.Status === 'Unauthorized',
                        			'glyphicon-eye-close': item.Status === 'Not Found',
                        			'glyphicon-ban-circle': item.Status === 'Forbidden',
                        			'glyphicon-thumbs-down': item.Status === 'Bad Request',
                        			'glyphicon-exclamation-sign': item.Status === 'Conflict',
                        			'glyphicon-fire': item.Status === 'Internal Server Error'
                        		}"
                        	>
							</span>
                        </td>
                        <td>{{item.Status}}</td>
                        <td>{{item.CheckTime}}</td>
                        <td
                        	[ngClass]="{
                    		warning: +item.CheckDuration > 1, 
                    		danger: +item.CheckDuration > 4
                    		}">
                    		{{item.CheckDuration}}
                    	</td>
                    </tr>
                </table>
    		</div>
		</div>
	`
})
export class DashboardWebServicesComponent implements OnInit {
	data: Observable<WSMonitoringData[]>;

	constructor(private _router: Router, private _dataService: MonitoringDataService) {
		this._dataService.data$.subscribe(() => {
			this.data = this._dataService.data$;
		});
	}

	ngOnInit() {
		this._dataService.getData();
	}

	onRefreshData() {
		this._dataService.loadData();
	}
}