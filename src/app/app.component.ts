import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

import {ParcoursService} from "./services/parcours.service";

import Etape from "../types/Etape";
import LiferayParams from "../types/LiferayParams";
import * as $ from 'jquery';

declare const Liferay: any;

@Component({
    selector: 'app-root',
    templateUrl: '/o/sample-senna-angular-parcours-bundle/app/app.component.html',
    styleUrls: ['/o/sample-senna-angular-parcours-bundle/css/app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(private parcoursService: ParcoursService) {
        window.addEventListener('message', this.receiveMessage.bind(this), false);
    }

    ngOnInit() {

        // Initialise le tableau d'étapes
        this.parcoursService.initEtapes();

        // Fait correspondre le parcours en fonction de URL courante. Obligatoire lors du chargement d'une étape directe
        this.parcoursService.nagigateEtapeByUrl(location.pathname);
    }

    ngAfterViewInit(): void {
        $('#p_p_id' + this.params.portletNamespace + ' .loader.loader-inline').hide();
    }

    ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage.bind(this), false);
    }

    // Retourne la liste des étapes qui permet de construire le parcours de l'utilisateur
    getEtapes(): Etape[] {
        return ParcoursService.getEtapes();
    }

    // Traite le message passé en param
    receiveMessage(event: any): any {
        this.messageControler(event.data);
    };

    // Applique un éguillage dépendant du type d'évènement
    messageControler(data: any) {

        if (data.event_id === ParcoursService.NAVIGATION) {

            this.parcoursService.navigateEtape(data.data.sens);
        }
    };

    params: LiferayParams;
}
