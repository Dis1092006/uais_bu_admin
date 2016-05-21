import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {MonitoringDataService} from "./shared/monitoring-data.service";

@Component({
	selector: 'uais_bu_admin-sidebar',
	template: `
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li>
                    <a [routerLink]="['dashboard-web-services']"
                        class="btn" 
                        [ngClass]="{
                            'btn-danger': currentWSStatus === 'danger', 
                            'btn-warning': currentWSStatus === 'warning',
                            'btn-success': currentWSStatus === 'ok'
                        }"
                    >Web-сервисы
                    </a>
                </li>
                <li>
                    <a [routerLink]="['dashboard-backups-page']"
                        class="btn" 
                        [ngClass]="{
                            'btn-danger': backupStatus === 'danger', 
                            'btn-warning': backupStatus === 'warning',
                            'btn-success': backupStatus === 'ok'
                        }"
                    >Архивы баз данных
                    </a>
                </li>
                <li>
                    <a [routerLink]="['dashboard-losted-rphosts-page']"
                        class="btn" 
                        [ngClass]="{
                            'btn-danger': lostedRPHostsStatus === 'danger', 
                            'btn-warning': lostedRPHostsStatus === 'warning',
                            'btn-success': lostedRPHostsStatus === 'ok'
                        }"
                    >Потерянные процессы rphost
                    </a>
                </li>
            </ul>
            <ul class="nav nav-sidebar">
                <li>
                    <a [routerLink]="['scheme-page']" class="btn">Ноды-базы</a>
                </li>
                <li>
                    <a [routerLink]="['db-file-sizes-page']" class="btn">Размеры баз данных</a>
                </li>
            </ul>
        </div>
	`,
	directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent implements OnInit {
	currentWSStatus: string = 'none';
	backupStatus: string = 'none';
	lostedRPHostsStatus: string = 'none';

	constructor(private _dataService: MonitoringDataService) { }
	
	ngOnInit() {
		this._dataService.currentWSStatus$.subscribe(value => {
			this.currentWSStatus = this._dataService.getCurrentWSStatus();
		});
		this._dataService.lostedRPHostsStatus$.subscribe(value => {
			this.lostedRPHostsStatus = this._dataService.getLostedRPHostStatus();
		});
	}
}