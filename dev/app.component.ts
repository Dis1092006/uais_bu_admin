import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {SidebarComponent} from "./sidebar.component";
import {ReferencesPageComponent} from "./references/references-page.component";
import {DashboardWebServicesComponent} from "./dashboard/dashboard-web-services.component";
import {MonitoringDataService} from "./shared/monitoring-data.service";
import {DashboardBackupsComponent} from "./dashboard/dashboard-backups.component";
import {SchemeComponent} from "./reports/scheme.component";
import {ReportsService} from "./reports/reports.service";
import {DBFileSizesComponent} from "./reports/dbfilesizes.component";
import {DashboardLostedRPHostsComponent} from "./dashboard/dashboard-losted-rphosts.components";

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
                    <ul class="nav navbar-nav navbar-right">
                        <li><a [routerLink]="['references-page']" class="navigationLinkButton">Справочники</a></li>
                    </ul>
                </div>
    		</div>
        </nav>
        <div class="container-fluid">
            <div class="row">
            	<uais_bu_admin-sidebar></uais_bu_admin-sidebar>
		        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		            <router-outlet></router-outlet>
		        </div>
            </div>
        </div>
    `,
    providers: [MonitoringDataService, ReportsService],
    directives: [ROUTER_DIRECTIVES, SidebarComponent]
})
@Routes([
    {
        path: '/references-page',
        component: ReferencesPageComponent
    },
    {
        path: '/dashboard-web-services',
        component: DashboardWebServicesComponent
    },
    {
        path: '/dashboard-backups-page',
        component: DashboardBackupsComponent
    },
    {
        path: '/dashboard-losted-rphosts-page',
        component: DashboardLostedRPHostsComponent
    },
    {
        path: '/scheme-page',
        component: SchemeComponent
    },
    {
        path: '/db-file-sizes-page',
        component: DBFileSizesComponent
    }
])
export class AppComponent {

    onNavigateToWS() {
//        this._router.navigate(['/dashboard-web-services']);
    }
}
