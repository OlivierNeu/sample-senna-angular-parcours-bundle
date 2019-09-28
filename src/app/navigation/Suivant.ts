import {EtapeService} from '../services/etape-service'

export default class NavigationSuivant {

    constructor() {
        window.top.postMessage({
            event_id: EtapeService.NAVIGATION,
            data: {
                sens: EtapeService.NAVIGATION_SUIVANT
            }
        }, '*');
    }
}
