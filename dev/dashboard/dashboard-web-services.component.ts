import {Component, OnInit} from "@angular/core";
import {MonitoringDataService, WSMonitoringData} from "../shared/monitoring-data.service";
import {DateFormatPipe} from "../shared/date-format.pipe";

@Component({
	selector: 'dashboard-web-services',
	template: `
		<h2 class="page-header">Web-сервисы</h2>
		<button (click)="onRefreshData()">Refresh</button>
		<div>
			<div class="table-responsive">
                <table class="table table-bordered table-condensed">
                    <tr 
                    	*ngFor="let item of currentWSData" 
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
                        <td>{{item.CheckTime | dateFormat:'dd/MM/yyyy HH:mm:ss'}}</td>
                        <td
                        	[ngClass]="{
                    		warning: +item.CheckDuration > 1, 
                    		danger: +item.CheckDuration > 4
                    		}" align="right">
                    		{{item.CheckDuration | number:'1.3-3'}}
                    	</td>
                    </tr>
                </table>
    		</div>
		</div>
	`,
	pipes: [DateFormatPipe]
})
export class DashboardWebServicesComponent implements OnInit {
	currentWSData: WSMonitoringData[];

	constructor(private _dataService: MonitoringDataService) { }

	ngOnInit() {
		this._dataService.currentWSData$.subscribe(value => {
			console.log('typeof(this.data): ' + typeof(value));
			this.currentWSData = this._dataService.getCurrentWSData();
		});
		this.onRefreshData();
	}

	onRefreshData() {
		this.currentWSData = this._dataService.getCurrentWSData();
	}
}