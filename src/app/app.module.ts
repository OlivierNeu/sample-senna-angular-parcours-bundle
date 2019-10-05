import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";

import {AppComponent} from './app.component';
import {ParcoursService} from "./services/parcours.service";
import {MessageService} from './services/message.service';
import {SennaService} from "./services/senna.service";
import {LiferayTranslatePipe} from "./pipes/liferay-translate.pipe";

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        LiferayTranslatePipe
    ],
    entryComponents: [
        AppComponent
    ],
    providers: [
        ParcoursService,
        MessageService,
        SennaService,
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
