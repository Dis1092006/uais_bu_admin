import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {OverviewComponent} from "./dashboard/overview.component";
import {DashboardWebServicesComponent} from "./dashboard/dashboard-web-services.component";
import {MonitoringDataService} from "./shared/monitoring-data.service";

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
                    <a class="navbar-brand" href="#">УАИС БУ монитор</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['OverviewPage']">Обзор</a></li>
                    </ul>
                </div>
    		</div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <li><a [routerLink]="['WebServices']">Web-сервисы</a></li>
                    </ul>
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    providers: [MonitoringDataService],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {
        path: '/overview-page',
        name: 'OverviewPage',
        component: OverviewComponent,
        useAsDefault: true
    },
    {
        path: '/dashboard-web-services',
        name: 'WebServices',
        component: DashboardWebServicesComponent
    }
])
export class AppComponent {

}
