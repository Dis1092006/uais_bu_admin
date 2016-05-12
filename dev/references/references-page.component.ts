import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {ReferencesService} from "./references.service";
import {ZonesComponent} from "./zones.component";
import {NodesComponent} from "./nodes.component";
import {ServersComponent} from "./servers.component";
import {DBMSServersComponent} from "./dbms-servers.component";
import {DatabasesComponent} from "./databases.component";

@Component({
    selector: 'references-page',
    template: `
		<h1 class="page-header">Справочники</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'ZonesPage'}"><a [routerLink]="['ZonesPage']" (click)="onTabClick('ZonesPage')">Зоны</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'NodesPage'}"><a [routerLink]="['NodesPage']" (click)="onTabClick('NodesPage')">Ноды</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'ServersPage'}"><a [routerLink]="['ServersPage']" (click)="onTabClick('ServersPage')">Серверы</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'DBMSServersPage'}"><a [routerLink]="['DBMSServersPage']" (click)="onTabClick('DBMSServersPage')">Серверы СУБД</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'DatabasesPage'}"><a [routerLink]="['DatabasesPage']" (click)="onTabClick('DatabasesPage')">Базы данных</a></li>
        </ul>
		<div>
			<router-outlet></router-outlet>
		</div>
     `,
    providers: [ReferencesService],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {
        path: '/zones-page',
        name: 'ZonesPage',
        component: ZonesComponent,
        useAsDefault: true
    },
    {
        path: '/nodes-page',
        name: 'NodesPage',
        component: NodesComponent
    },
    {
        path: '/servers-page',
        name: 'ServersPage',
        component: ServersComponent
    },
    {
        path: '/dbms-servers-page',
        name: 'DBMSServersPage',
        component: DBMSServersComponent
    },
    {
        path: '/databases-page',
        name: 'DatabasesPage',
        component: DatabasesComponent
    }
])
export class ReferencesComponent {
    currentPage: string;

    constructor() {
        this.currentPage = "ZonesPage";
    }

    onTabClick(pageName) {
        this.currentPage = pageName;
    }
}