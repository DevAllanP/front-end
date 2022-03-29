import { Produit } from "./Produit.model";
import { Tag } from "./Tag.model";
import { TypeProduit } from "./TypeProduit.model";

export class listProduit {
    _listProduit : Array<Produit>;


    constructor(listProduit : Array<Produit>){
        this._listProduit = listProduit;
    }
    get listProduit(): Produit { return this.listProduit}
}
