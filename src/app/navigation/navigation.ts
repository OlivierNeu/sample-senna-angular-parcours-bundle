import {ParcoursService} from "../services/parcours.service";

let init = function (): any {
    return;
};

let precedent = function (): any {
    window.top.postMessage({
        event_id: ParcoursService.NAVIGATION,
        data: {
            sens: ParcoursService.NAVIGATION_PRECEDENT
        }
    }, '*');

    return {
        key1: 'value1'
    };
};

let suivant = function (): any {
    window.top.postMessage({
        event_id: ParcoursService.NAVIGATION,
        data: {
            sens: ParcoursService.NAVIGATION_SUIVANT
        }
    }, '*');

    return {
        isPrevious: true,
        isNext: true,
        stepNumber: 0
    };
};

export default {
    init: function (callback: any) {
        callback.call(this, init())
    },
    precedent: function (callback: any) {
        callback.call(this, precedent())
    },
    suivant: function (callback: any) {
        callback.call(this, suivant())
    }
};
