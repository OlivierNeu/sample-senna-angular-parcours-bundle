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

    // Retourne la liste d'étapes
    public static getEtapes():Etape[] {
        return EtapesService.getEtapes();
    }

    // Retourne une liste d'Etape récupéré via un appel distant. Fonction Asynchrone
    public initEtapes(): Observable<Etape[]> {
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

    // Navigue vers l'étape correspondant à l'URL passé en param
    public static nagigateEtapeByUrl(url: string): Etape[] {

        let currentIndex = EtapesService.getIndexFromCurrentEtape();
        let newIndex = EtapesService.getIndexFromCurrentEtapeByUrl(EtapesService.getEtapes(), url);

        if (currentIndex != newIndex && currentIndex >= 0 && newIndex >= 0) {
            ParcoursService.setCurrentStepByNewindex(currentIndex, newIndex);
        }

        EtapesService.setVisitedSteps(EtapesService.getEtapes());

        return EtapesService.getEtapes();
    }

    // Charge les surfaces Senna en fonction de l'étape passé en param
    private loadSennaSurfacesByStep(etape: Etape): void {
        this.sennaService.loadSurfaceByUrl(etape.url);
    };

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

            ParcoursService.setCurrentStepByNewindex(oldIndex, newIndex);

            return newIndex;
        }

        return oldIndex;
    }

    // Modifi l'étape courante en fonction du nouvelle index
    private static setCurrentStepByNewindex(oldIndex: number = 0, newIndex: number): void {

        EtapesService.getEtapes()[oldIndex].etapeCourante = false;
        EtapesService.getEtapes()[newIndex].etapeCourante = true;

        if (typeof Liferay != "undefined") {
            Liferay.fire('parcours:nav:change:step', {
                isPrevious: (newIndex > 0),
                isNext: (newIndex < (EtapesService.getEtapes().length - 1)),
                etape: EtapesService.getEtapes()[newIndex]
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
