import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

import {EtapeService} from "./services/etape-service";
import {MessageService} from './services/message-service';

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

    constructor(private etapeService: EtapeService, private messageService: MessageService) {
        window.addEventListener('message', this.receiveMessage.bind(this), false);
    }

    ngOnInit() {

        // Initialise le tableau d'étapes
        this.getEtapes();

        // Fait correspondre le parcours en fonction de URL
        this.etapeService.nagigateEtapeByUrl(this.etapes, location.pathname);
    }

    ngAfterViewInit(): void {
        $('#p_p_id' + this.params.portletNamespace + ' .loader.loader-inline').hide();
    }

    ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage.bind(this), false);
    }

    public getCurrentEtape(): number {
        return EtapeService.getIndexFromCurrentEtape(this.etapes);
    }

    // Retour la liste des étapes qui permet de construire le parcours de l'utilisateur
    getEtapes(): void {
        this.etapeService.getEtapes()
            .subscribe(etapes => this.etapes = etapes);
    }

    // Traite le message passé en param
    receiveMessage(event: any): any {
        this.messageControler(event.data, this.etapes);
    };

    // Applique un éguillage dépendant du type d'évènement
    messageControler(data: any, etapes: Etape[]) {

        if (data.event_id === EtapeService.NAVIGATION) {

            let newEtape = this.etapeService.navigateEtape(etapes, data.data.sens);
            this.etapeService.loadSennaSurfacesByStep(newEtape);

        }
    };

    @Input() etapes: Etape[];
    params: LiferayParams;
}
