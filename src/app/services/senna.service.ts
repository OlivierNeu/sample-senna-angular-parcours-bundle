import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

import Etape from "../../types/Etape";
import {ETAPES} from '../../types/Etape-mock';
import {EtapesService} from "./etape.service";

declare const Liferay: any;

@Injectable()
export class SennaService {

    // Charge les surfaces Senna en fonction de l'URL passé en param. Lance aussi un évènement Liferay une fois la navigation réalisé
    public loadSurfaceByUrl(url: string): Observable<boolean> {

        if (typeof Liferay != "undefined") {
            Liferay.SPA.app.navigate(url);
            Liferay.fire('parcours:nav:load:ready');
        }

        return of(true);
    }

}
