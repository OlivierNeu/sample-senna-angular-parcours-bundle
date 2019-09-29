import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

import Etape from "../../types/Etape";
import {ETAPES} from '../../types/Etape-mock';
import {EtapesService} from "./etape.service";
import {SennaService} from "./senna.service";

declare const Liferay: any;

@Injectable()
export class ParcoursService {

    constructor(private sennaService: SennaService) {
    }

    // Retourne une liste d'Etape récupéré via un appel distant. Fonction Asynchrone
    public getEtapes(): Observable<Etape[]> {
        EtapesService.setEtapes(ETAPES);
        return of(EtapesService.setVisitedSteps(this.getSortedSteps(EtapesService.getEtapes())));
    }

    // Modifi le parcours en fonction du sens de l'étape, mémorise la nouvelle etape courante et implique un changement visuel
    public navigateEtape(sens: any): Etape {

        let currentIndex = EtapesService.getIndexFromCurrentEtape();
        let newIndex = this.getNewIndexByCurrentStepAndDirectionAndOldindex(EtapesService.getEtapes(), sens, currentIndex);

        EtapesService.setVisitedSteps(EtapesService.getEtapes());
        this.loadSennaSurfacesByStep(EtapesService.getEtapes()[newIndex]);

        return EtapesService.getEtapes()[newIndex];
    };

    // Charge les surfaces Senna en fonction de l'étape passé en param
    private loadSennaSurfacesByStep(etape: Etape): void {
        this.sennaService.loadSurfaceByUrl(etape.url);
    };

    // Navigue vers l'étape correspondant à l'URL passé en param
    public nagigateEtapeByUrl(etapes: Etape[], url: string): Etape[] {

        let currentIndex = EtapesService.getIndexFromCurrentEtape();
        let newIndex = EtapesService.getIndexFromCurrentEtapeByUrl(etapes, url);

        if (currentIndex != newIndex && currentIndex >= 0 && newIndex >= 0) {
            this.setCurrentStepByNewindex(etapes, currentIndex, newIndex);
        }

        EtapesService.setVisitedSteps(etapes);

        return etapes;
    }

    // Retourne si possible l'index de l'étape donné par sont sens (prédédent ou suivant).
    private getNewIndexByCurrentStepAndDirectionAndOldindex(etapes: Etape[], sens: any, oldIndex: number): number {

        let newIndex = 0;

        if (sens === ParcoursService.NAVIGATION_PRECEDENT) {
            newIndex = oldIndex - 1;
        } else if (sens === ParcoursService.NAVIGATION_SUIVANT) {
            newIndex = oldIndex + 1;
        } else {
            newIndex = oldIndex;
        }

        // Si le sens prévois le dépassement des bornes du tableau d'étapes alors l'étape courante n'est pas modifié
        if (newIndex !== oldIndex && oldIndex >= 0 && newIndex >= 0 && newIndex < etapes.length) {

            this.setCurrentStepByNewindex(etapes, oldIndex, newIndex);

            return newIndex;
        }

        return oldIndex;
    }

    // Modifi l'étape courante en fonction du nouvelle index
    private setCurrentStepByNewindex(etapes: Etape[], oldIndex: number = 0, newIndex: number): void {

        etapes[oldIndex].etapeCourante = false;
        etapes[newIndex].etapeCourante = true;

        if (typeof Liferay != "undefined") {
            Liferay.fire('parcours:nav:change:step', {
                isPrevious: (newIndex > 0),
                isNext: (newIndex < (etapes.length - 1)),
                etape: etapes[newIndex]
            });
        }
    }

    // Trie le tableau d'étape en fonction du numeroEtape de chaque étape
    private getSortedSteps(etapes: Etape[]): Etape[] {

        let etapesSorted: Etape[];

        etapesSorted = etapes.sort((etapeA, etapeB) => {
            return etapeA.numeroEtape - etapeB.numeroEtape;
        });

        return etapesSorted;
    }

    public static NAVIGATION = 'navigation';
    public static NAVIGATION_SUIVANT = 'suivant';
    public static NAVIGATION_PRECEDENT = 'precedent';

}
