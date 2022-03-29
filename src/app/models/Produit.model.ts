
import { Tag } from "./Tag.model";
import { TypeProduit } from "./TypeProduit.model";

export class Produit {
    _idProduit: number;
    _disable: boolean;
    _nom: string;
    _description: string;
    _prix: number;
    _tagDtos: Tag[];
    _typeProduitDto: TypeProduit;
    _url_images: string[];
 

    constructor(
        idProduit: number,
        disable: boolean,
        nom: string,
        description: string,
        prix: number,
        tagDtos: Tag[],
        typeProduitDto: TypeProduit, 
        url_images: string[]
    ) {
        this._idProduit = idProduit;
        this._disable = disable;
        this._nom = nom;
        this._description = description;
        this._prix = prix;
        this._tagDtos = tagDtos;
        this._typeProduitDto = typeProduitDto;
        this._url_images = url_images || [];
    }

    get idProduit(): number { return this._idProduit; }
    get disable(): boolean { return this._disable; }
    get nom(): string { return this._nom; }
    get description(): string { return this._description; }
    get prix(): number { return this._prix; }
    get tagDtos(): Tag[] { return this._tagDtos; }
    get typeProduitDto(): TypeProduit { return this._typeProduitDto; }
    get url_images(): string[] { return this._url_images; } 
    // set url_images(url_images: String[]) {  this._url_images = url_images; } 

}