import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Observable} from "rxjs/Observable";
import {WSMonitoringData, MonitoringDataService} from "../shared/monitoring-data.service";

@Component({
	selector: 'dashboard-web-services',
	template: `
		<h1 class="page-header">Web-сервисы</h1>
		<div>
			<button (click)="onRefreshData()">Refresh</button>
			<button (click)="onNavigate()">To overview page</button>
			<div class="table-responsive">
                <table class="table table-bordered table-condensed">
                    <tr 
                    	*ngFor="#item of data | async" 
                    	[ngClass]="{
                    		warning: item.Status !== 'OK', 
                    		danger: item.Status === 'Internal Server Error' || item.Status === 'Not Found' || item.Status === 'Bad Request' || item.Status === 'Conflict' || item.Status === 'Forbidden'
                    	}">
                        <td>{{item.Name}}</td>
                        <td>{{item.Status}}</td>
                        <td>{{item.CheckTime}}</td>
                        <td>{{item.CheckDuration}}</td>
                    </tr>
                </table>
    		</div>
		</div>
	`
})
export class DashboardWebServicesComponent {
	data: Observable<WSMonitoringData[]>;

	constructor(private _router: Router, private _dataService: MonitoringDataService) {
		this.data = this._dataService.data$;
		this._dataService.loadData();
	}

	onRefreshData() {
		this._dataService.loadData();
	}

	onNavigate() {
		this._router.navigate(['OverviewPage']);
	}
}