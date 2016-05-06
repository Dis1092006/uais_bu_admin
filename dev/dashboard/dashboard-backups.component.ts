import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {DatabasesService} from "./../databases/databases.service";
import {DBAllBackupsComponent} from "../databases/db-all-backups.component";
import {DBLastBackupsComponent} from "../databases/db-last-backups.component";

@Component({
	selector: 'dashboard-backups-page',
	template: `
		<h1 class="page-header">Базы данных</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'DBLastBackupsPage'}"><a [routerLink]="['DBLastBackupsPage']" (click)="onTabClick('DBLastBackupsPage')">Последние архивы</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'DBAllBackupsPage'}"><a [routerLink]="['DBAllBackupsPage']" (click)="onTabClick('DBAllBackupsPage')">Все архивы</a></li>
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
		path: '/db-last-backups-page',
		name: 'DBLastBackupsPage',
		component: DBLastBackupsComponent,
		useAsDefault: true
	},
	{
		path: '/db-all-backups-page',
		name: 'DBAllBackupsPage',
		component: DBAllBackupsComponent
	}
])
export class DashboardBackupsComponent {
	currentPage: string;

	constructor(private _router: Router) {
		this.currentPage = "DBLastBackupsPage";
	}

	onTabClick(pageName) {
		this.currentPage = pageName;
	}
}