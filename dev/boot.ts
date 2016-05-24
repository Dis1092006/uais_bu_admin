/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from "@angular/core";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
