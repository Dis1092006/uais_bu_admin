import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {DatabasesService} from "./../databases/databases.service";
import {DBAllBackupsComponent} from "../databases/db-all-backups.component";
import {DBLastBackupsComponent} from "../databases/db-last-backups.component";

@Component({
	selector: 'dashboard-backups-page',
	template: `
		<h1 class="page-header">Базы данных</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'db-last-backups-page'}"><a [routerLink]="['db-last-backups-page']" (click)="onTabClick('db-last-backups-page')">Последние архивы</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'db-all-backups-page'}"><a [routerLink]="['db-all-backups-page']" (click)="onTabClick('db-all-backups-page')">Все архивы</a></li>
        </ul>
		<div>
			<router-outlet></router-outlet>
		</div>
     `,
	providers: [DatabasesService],
	directives: [ROUTER_DIRECTIVES]
})
@Routes([
	{
		path: '/db-last-backups-page',
		component: DBLastBackupsComponent
	},
	{
		path: '/db-all-backups-page',
		component: DBAllBackupsComponent
	}
])
export class DashboardBackupsComponent {
	currentPage: string;

	constructor() {
		this.currentPage = "db-last-backups-page";
	}

	onTabClick(pageName) {
		this.currentPage = pageName;
	}
}