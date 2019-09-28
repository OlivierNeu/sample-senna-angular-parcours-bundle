/**
 * This is the structure of the etape used by parcours bundle.
 */
export default interface Etape {
    numeroEtape: number,
    etapeCourante: boolean,
    sourceImage: string,
    nomEtape: string,
    url: string,
    visited?: boolean
}

