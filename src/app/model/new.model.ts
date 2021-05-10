import { addTag } from "../create/create.component";

export interface INew {
    titre_article: string,
    contenue_article: string,
    statut_article: string,
    id_categorie: number,
    tags: addTag[]
}