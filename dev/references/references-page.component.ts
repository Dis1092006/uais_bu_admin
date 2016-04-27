import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";
import {ReferencesService} from "./references.service";
import {ZonesComponent} from "./zones.component";
import {NodesComponent} from "./nodes.component";
import {ServersComponent} from "./servers.component";
import {DatabasesComponent} from "./databases.component";
import {SchemeComponent} from "./scheme.component";

@Component({
    selector: 'references-page',
    template: `
		<h1 class="page-header">Справочники</h1>
		<ul class="nav nav-tabs">
            <li role="presentation" [ngClass]="{active: currentPage === 'SchemePage'}"><a [routerLink]="['SchemePage']" (click)="onTabClick('SchemePage')">Схема</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'ZonesPage'}"><a [routerLink]="['ZonesPage']" (click)="onTabClick('ZonesPage')">Зоны</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'NodesPage'}"><a [routerLink]="['NodesPage']" (click)="onTabClick('NodesPage')">Ноды</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'ServersPage'}"><a [routerLink]="['ServersPage']" (click)="onTabClick('ServersPage')">Серверы</a></li>
            <li role="presentation" [ngClass]="{active: currentPage === 'DatabasesPage'}"><a [routerLink]="['DatabasesPage']" (click)="onTabClick('DatabasesPage')">Базы данных</a></li>
        </ul>
		<div>
			<router-outlet></router-outlet>
		</div>
     `,
    providers: [ReferencesService],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {
        path: '/scheme-page',
        name: 'SchemePage',
        component: SchemeComponent,
        useAsDefault: true
    },
    {
        path: '/zones-page',
        name: 'ZonesPage',
        component: ZonesComponent
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
        path: '/databases-page',
        name: 'DatabasesPage',
        component: DatabasesComponent
    }
])
export class ReferencesComponent {
    currentPage: string;

    constructor(private _router: Router) {
        this.currentPage = "SchemePage";
    }

    onTabClick(pageName) {
        this.currentPage = pageName;
    }
}