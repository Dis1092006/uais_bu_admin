import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";
import {ReferencesService} from "./references.service";
import {ZonesComponent} from "./zones.component";
import {NodesComponent} from "./nodes.component";
import {ServersComponent} from "./servers.component";
import {DBMSServersComponent} from "./dbms-servers.component";
import {DatabasesComponent} from "./databases.component";

@Component({
    template: `
		<h1 class="page-header">Справочники</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'zones-tab'}"><a [routerLink]="['zones-tab']" (click)="onTabClick('zones-tab')">Зоны</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'nodes-tab'}"><a [routerLink]="['nodes-tab']" (click)="onTabClick('nodes-tab')">Ноды</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'servers-tab'}"><a [routerLink]="['servers-tab']" (click)="onTabClick('servers-tab')">Серверы</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'dbms-servers-tab'}"><a [routerLink]="['dbms-servers-tab']" (click)="onTabClick('dbms-servers-tab')">Серверы СУБД</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'databases-tab'}"><a [routerLink]="['databases-tab']" (click)="onTabClick('databases-tab')">Базы данных</a></li>
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
        path: '/zones-tab',
        component: ZonesComponent
    },
    {
        path: '/nodes-tab',
        component: NodesComponent
    },
    {
        path: '/servers-tab',
        component: ServersComponent
    },
    {
        path: '/dbms-servers-tab',
        component: DBMSServersComponent
    },
    {
        path: '/databases-tab',
        component: DatabasesComponent
    }
])
export class ReferencesPageComponent {
    currentTab: string;

    constructor(private _router: Router) { }

    ngOnInit() {
        this.currentTab = "zones-tab";
        //this._router.navigate(['zones-tab']);
    }

    onTabClick(tabName) {
        this.currentTab = tabName;
    }
}