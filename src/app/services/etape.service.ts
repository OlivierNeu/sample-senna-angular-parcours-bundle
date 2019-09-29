import {Injectable} from '@angular/core';

import Etape from "../../types/Etape";

declare const Liferay: any;

@Injectable({
    providedIn: 'root',
})
export class EtapesService {

    private static etapes: Etape[];

    public static setEtapes(etapes: Etape[]) {
        this.etapes = etapes;
    }

    public static getEtapes(): Etape[] {
        return this.etapes;
    }

    public static getIndexFromCurrentEtape(): number {
        return this.etapes.findIndex(x => x.etapeCourante == true);
    }

    public static getIndexFromCurrentEtapeByUrl(etapes: Etape[], url: string): number {
        return etapes.findIndex(x => x.url == url);
    }

    public static setVisitedSteps(etapes: Etape[]): Etape[] {

        let currentIndex = EtapesService.getIndexFromCurrentEtape();

        etapes.forEach(function (etape: Etape, index: number) {

            if (index <= currentIndex) {
                etape.visited = true;
            }
        });

        return etapes;
    }

}
