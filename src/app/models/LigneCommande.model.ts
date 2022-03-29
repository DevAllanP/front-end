import { Produit } from "./Produit.model";

export class LigneCommande {
    _id: number;
    _quantite: number;
    _produitDto: Produit;
    _prixUnitaire: number;
    
    constructor(
        id: number,
        quantite: number,
        produitDto: Produit,
        prixUnitaire: number
    ) {
        this._id = id;
        this._quantite = quantite;
        this._produitDto = produitDto;
        this._prixUnitaire = prixUnitaire;
    }

    get id(): number { return this._id; }
    get quantite(): number { return this._quantite; }
    get produitDto(): Produit { return this._produitDto; }
    get prixUnitaire(): number { return this._prixUnitaire; }
}