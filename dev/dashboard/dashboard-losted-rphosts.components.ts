import {Component, OnInit} from "@angular/core";
import {MonitoringDataService, LostedRPHostData} from "../shared/monitoring-data.service";
import {DateFormatPipe} from "../shared/date-format.pipe";

@Component({
	selector: 'dashboard-losted-rphosts',
	template: `
		<h2 class="page-header">Потерянные процессы rphost</h2>
		<button (click)="onRefreshData()">Refresh</button>
		<div>
			<div class="table-responsive">
                <table class="table table-bordered table-condensed">
                    <tr 
                    	*ngFor="let item of lostedRPHostsData">
                        <td>{{item.cluster}}</td>
                        <td>{{item.server}}</td>
                        <td>{{item.rphosts}}</td>
                        <td>{{item.created_at}}</td>
                        <!--td>{{item.created_at | dateFormat:'dd/MM/yyyy HH:mm:ss'}}</td-->
                    </tr>
                </table>
    		</div>
		</div>
	`,
	styleUrls: ['src/css/dashboard.css'],
	pipes: [DateFormatPipe]
})
export class DashboardLostedRPHostsComponent implements OnInit {
	lostedRPHostsData: LostedRPHostData[];

	constructor(private _dataService: MonitoringDataService) { }

	ngOnInit() {
		this._dataService.lostedRPHostsData$.subscribe(value => {
			console.log('typeof(this.data): ' + typeof(value));
			this.lostedRPHostsData = this._dataService.getLostedRPHostData();
		});
		this.onRefreshData();
	}

	onRefreshData() {
		this.lostedRPHostsData = this._dataService.getLostedRPHostData();
	}
}