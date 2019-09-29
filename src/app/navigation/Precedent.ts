import {ParcoursService} from '../services/parcours.service'
import {EtapesService} from '../services/etape.service'

class NavigationPrecedent {

    constructor() {
        window.top.postMessage({
            event_id: ParcoursService.NAVIGATION,
            data: {
                sens: ParcoursService.NAVIGATION_PRECEDENT
            }
        }, '*');
    }
}

export default NavigationPrecedent;
export {EtapesService}
