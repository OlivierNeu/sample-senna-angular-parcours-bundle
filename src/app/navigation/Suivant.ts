import {ParcoursService} from '../services/parcours.service'

export default class NavigationSuivant {

    constructor() {
        window.top.postMessage({
            event_id: ParcoursService.NAVIGATION,
            data: {
                sens: ParcoursService.NAVIGATION_SUIVANT
            }
        }, '*');
    }
}
