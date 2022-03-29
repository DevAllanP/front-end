import { Frais } from "./Frais.model";
import { StatusCommande } from "./StatusCommande.model";
import { Utilisateur } from "./Utilisateur.model";

export class Commande {
    _id: number;
    _dateCommande: Date;
    _dateEnvoie: Date;    
    _dateLivraison: Date;
    _utilisateur: Utilisateur;
    _listFrais: Frais[];
    _statusDeCommande: StatusCommande;
    
    constructor(
        id: number,
        dateCommande: Date,
        dateEnvoie: Date,  
        dateLivraison: Date,
        utilisateur: Utilisateur,
        listFrais: Frais[],
        statusDeCommande: StatusCommande,
    ) {
        this._id = id;
        this._dateCommande = dateCommande;
        this._dateEnvoie = dateEnvoie;
        this._dateLivraison = dateLivraison;
        this._utilisateur = utilisateur;
        this._listFrais = listFrais;
        this._statusDeCommande = statusDeCommande;
    }

    get id(): number { return this._id; }
    get dateCommande(): Date { return this._dateCommande; }
    get dateEnvoie(): Date { return this._dateEnvoie; }    
    get dateLivraison(): Date { return this._dateLivraison; }
    get utilisateur(): Utilisateur { return this._utilisateur; }
    get listFrais(): Frais[] { return this._listFrais; }
    get statusDeCommande(): StatusCommande { return this._statusDeCommande; }
}