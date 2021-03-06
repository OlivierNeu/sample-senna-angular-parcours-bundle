import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {ParcoursService} from "./services/parcours.service";
import {environment} from '../env/environment';

import Etape from "../types/Etape";
import LiferayParams from "../types/LiferayParams";
import * as $ from 'jquery';

declare const Liferay: any;
const templateUrl = `${environment.path.app}/app/app.component.html`;
const styleUrls = [`${environment.path.css}/css/app.component.css`];

@Component({
    selector: 'app-root',
    templateUrl,
    styleUrls
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(private parcoursService: ParcoursService) {
        window.addEventListener('message', this.receiveMessage.bind(this), false);

        Liferay.SPA.app.on('endNavigate', function(event: any) {
            ParcoursService.nagigateEtapeByUrl(location.pathname);
        });
    }

    ngOnInit() {

        // Initialise le tableau d'étapes
        this.parcoursService.initEtapes();

        // Fait correspondre le parcours en fonction de URL courante. Obligatoire lors du chargement d'une étape directe
        ParcoursService.nagigateEtapeByUrl(location.pathname);
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
