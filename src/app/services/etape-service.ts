import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

import Etape from "../../types/Etape";
import {ETAPES} from '../../types/Etape-mock';

declare const Liferay: any;

@Injectable({
    providedIn: 'root',
})
export class EtapeService {

    // Retourne une liste d'Etape récupéré via un appel distant. Fonction Asynchrone
    public getEtapes(): Observable<Etape[]> {
        return of(this.setVisitedSteps(this.getSortedSteps(ETAPES)));
    }

    // Modifi le parcours en fonction du sens de l'étape, mémorise la nouvelle etape courante et implique un changement visuel
    public navigateEtape(etapes: Etape[], sens: any): Etape {

        let currentIndex = this.getIndexFromCurrentEtape(etapes);
        let newIndex = this.getNewIndexByCurrentStepAndDirectionAndOldindex(etapes, sens, currentIndex);

        this.setVisitedSteps(etapes);

        return etapes[newIndex];
    };

    // Charge les surfaces Senna en fonction de l'étape passé en param
    public loadSennaSurfacesByStep(etape: Etape): void {
        this.loadSurfaceByUrl(etape.url);
    };

    // Navigue vers l'étape correspondant à l'URL passé en param
    public nagigateEtapeByUrl(etapes: Etape[], url: string): Etape[] {

        let currentIndex = this.getIndexFromCurrentEtape(etapes);
        let newIndex = this.getIndexFromCurrentEtapeByUrl(etapes, url);

        if (currentIndex != newIndex && currentIndex >= 0 && newIndex >= 0) {
            this.setCurrentStepByNewindex(etapes, currentIndex, newIndex);
        }

        this.setVisitedSteps(etapes);

        return etapes;
    }

    // Retourne si possible l'index de l'étape donné par sont sens (prédédent ou suivant).
    private getNewIndexByCurrentStepAndDirectionAndOldindex(etapes: Etape[], sens: any, oldIndex: number): number {

        let newIndex = 0;

        if (sens === EtapeService.NAVIGATION_PRECEDENT) {
            newIndex = oldIndex - 1;
        } else if (sens === EtapeService.NAVIGATION_SUIVANT) {
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

    // Charge les surfaces Senna en fonction de l'URL passé en param. Lance aussi un évènement Liferay une fois la navigation réalisé
    private loadSurfaceByUrl(url: string): Observable<boolean> {

        if (typeof Liferay != "undefined") {
            Liferay.SPA.app.navigate(url);
            Liferay.fire('parcours:nav:load:ready');
        }

        return of(true);
    }

    private getIndexFromCurrentEtape(etapes: Etape[]): number {
        return etapes.findIndex(x => x.etapeCourante == true);
    }

    private getIndexFromCurrentEtapeByUrl(etapes: Etape[], url: string): number {
        return etapes.findIndex(x => x.url == url);
    }

    // Trie le tableau d'étape en fonction du numeroEtape de chaque étape
    private getSortedSteps(etapes: Etape[]): Etape[] {

        let etapesSorted: Etape[];

        etapesSorted = etapes.sort((etapeA, etapeB) => {
            return etapeA.numeroEtape - etapeB.numeroEtape;
        });

        return etapesSorted;
    }

    public setVisitedSteps(etapes: Etape[]): Etape[] {

        let currentIndex = this.getIndexFromCurrentEtape(etapes);

        etapes.forEach(function (etape: Etape, index: number) {

            if (index <= currentIndex) {
                etape.visited = true;
            }
        });

        return etapes;
    }

    private wait(ms: number) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    private getStepsByRemoteService(): Etape[] {

        this.wait(7000);

        return ETAPES;
    }

    public static NAVIGATION = 'navigation';
    public static NAVIGATION_SUIVANT = 'suivant';
    public static NAVIGATION_PRECEDENT = 'precedent';

}
