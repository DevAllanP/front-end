export class Adresse {
    _id:Number;
    _numero:Number;
    _rue:String;
    _codePostal:String;
    _ville:String;

    constructor(id:Number,numero:Number, rue:String, codePostal:String,ville:String) {
        this._id = id;
        this._numero=numero;
        this._rue=rue;
        this._codePostal=codePostal;
        this._ville=ville;
    }

    get id() { return this._id; }
    get numero() { return this._numero; }
    get rue() { return this._rue; }
    get codePostal() { return this._codePostal; }
    get ville() { return this._ville; }
}