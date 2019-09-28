import Etape from "./Etape";

export const ETAPES: Etape[] = [
    {
        numeroEtape: 2,
        etapeCourante: false,
        sourceImage: '/o/sample-senna-angular-parcours-bundle/commun/img/picto_carte-credit_actif.svg',
        nomEtape: 'Etape 2',
        url: '/web/sample-senna-surface/page2'
    },
    {
        numeroEtape: 1,
        etapeCourante: true,
        sourceImage: '/o/sample-senna-angular-parcours-bundle/commun/img/picto_info-client_complete_c02.svg',
        nomEtape: 'Etape 1',
        url: '/web/sample-senna-surface/page1'
    },
    {
        numeroEtape: 3,
        etapeCourante: false,
        sourceImage: '/o/sample-senna-angular-parcours-bundle/commun/img/picto_carte-credit_actif.svg',
        nomEtape: 'Etape 3',
        url: '/web/sample-senna-surface/page3'
    }
];
