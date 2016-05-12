import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {OverviewComponent} from "./dashboard/overview.component";
import {ReferencesComponent} from "./references/references-page.component";
import {DashboardWebServicesComponent} from "./dashboard/dashboard-web-services.component";
import {MonitoringDataService} from "./shared/monitoring-data.service";
import {DashboardBackupsComponent} from "./dashboard/dashboard-backups.component";
import {SchemeComponent} from "./reports/scheme.component";
import {ReportsService} from "./reports/reports.service";
import {DBFileSizesComponent} from "./reports/dbfilesizes.component";

@Component({
    selector: 'uais_bu_admin',
    template: `
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">УАИС БУ</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['OverviewPage']" class="navigationLinkButton">Обзор</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a [routerLink]="['ReferencesPage']">Справочники</a></li>
                    </ul>
                </div>
    		</div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <li>
                            <a [routerLink]="['WebServices']"
                                class="btn" 
                                [ngClass]="{
                                    'btn-danger': wsStatus === 'danger', 
                                    'btn-warning': wsStatus === 'warning',
                                    'btn-success': wsStatus === 'ok'
                                }"
                            >Web-сервисы
                            </a>
                        </li>
                        <li>
                            <a [routerLink]="['BackupsPage']"
                                class="btn" 
                                [ngClass]="{
                                    'btn-danger': backupStatus === 'danger', 
                                    'btn-warning': backupStatus === 'warning',
                                    'btn-success': backupStatus === 'ok'
                                }"
                            >Архивы баз данных
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-sidebar">
                        <li>
                            <a [routerLink]="['SchemePage']" class="btn">Ноды-базы</a>
                        </li>
                        <li>
                            <a [routerLink]="['DBFileSizesPage']" class="btn">Размеры баз данных</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    providers: [MonitoringDataService, ReportsService],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {
        path: '/overview-page',
        name: 'OverviewPage',
        component: OverviewComponent,
        useAsDefault: true
    },
    {
        path: '/references-page/...',
        name: 'ReferencesPage',
        component: ReferencesComponent
    },
    {
        path: '/dashboard-web-services',
        name: 'WebServices',
        component: DashboardWebServicesComponent
    },
    {
        path: '/dashboard-backups-page/...',
        name: 'BackupsPage',
        component: DashboardBackupsComponent
    },
    {
        path: '/scheme-page',
        name: 'SchemePage',
        component: SchemeComponent
    },
    {
        path: '/db-file-sizes-page',
        name: 'DBFileSizesPage',
        component: DBFileSizesComponent
    }
])
export class AppComponent implements OnInit {
    wsStatus: string;
    backupStatus: string;

    constructor(private _dataService: MonitoringDataService) {
        this._dataService.web_services_status$.subscribe(value => {
            this.wsStatus = value;
        });
    }

    ngOnInit() {
        this._dataService.getData();
    }

    onNavigateToWS() {
        //this._router.navigate(['WebServices']);
    }
}
