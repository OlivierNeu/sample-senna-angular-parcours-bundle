import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

import {AppComponent} from './app.component';
import {EtapeService} from "./services/etape-service";
import {MessageService} from './services/message-service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
    ],
    entryComponents: [
        AppComponent
    ],
    providers: [
        EtapeService,
        MessageService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: []
})
export class AppModule {
    // Avoid bootstraping any component statically because we need to attach to
    // the portlet's DOM, which is different for each portlet instance and,
    // thus, cannot be determined until the page is rendered (during runtime).
    ngDoBootstrap() {
    }
}
