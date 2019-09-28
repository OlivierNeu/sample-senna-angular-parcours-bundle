import {EtapeService} from '../services/etape-service'

class NavigationPrecedent {

    constructor() {
        window.top.postMessage({
            event_id: EtapeService.NAVIGATION,
            data: {
                sens: EtapeService.NAVIGATION_PRECEDENT
            }
        }, '*');
    }
}

export default NavigationPrecedent;
