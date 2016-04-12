import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {DatabasesService} from "./../databases/databases.service";
import {AllDBBackupsComponent} from "./../databases/all-db-backups.component";
import {TodayDBBackupsComponent} from "./../databases/today-db-backups.component";

@Component({
	selector: 'dashboard-databases-page',
	template: `
		<h1 class="page-header">Базы данных</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'TodayDBBackupsPage'}"><a [routerLink]="['TodayDBBackupsPage']" (click)="onTabClick('TodayDBBackupsPage')">Архивы за сегодня</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'AllDBBackupsPage'}"><a [routerLink]="['AllDBBackupsPage']" (click)="onTabClick('AllDBBackupsPage')">Все архивы</a></li>
        </ul>
		<div>
			<router-outlet></router-outlet>
		</div>
     `,
	providers: [DatabasesService],
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{
		path: '/today-db-backups-page',
		name: 'TodayDBBackupsPage',
		component: TodayDBBackupsComponent,
		useAsDefault: true
	},
	{
		path: '/all-db-backups-page',
		name: 'AllDBBackupsPage',
		component: AllDBBackupsComponent
	}
])
export class DashboardDatabasesComponent {
	currentPage: string;

	constructor(private _router: Router) {
		this.currentPage = "TodayDBBackupsPage";
	}

	onTabClick(pageName) {
		this.currentPage = pageName;
	}
}