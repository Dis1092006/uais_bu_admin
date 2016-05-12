/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_PROVIDERS, HTTP_BINDINGS} from '@angular/http';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, HTTP_BINDINGS]);
