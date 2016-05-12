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
@Routes([
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

	constructor() {
		this.currentPage = "DBLastBackupsPage";
	}

	onTabClick(pageName) {
		this.currentPage = pageName;
	}
}