import { Adresse } from "./Adresse.model";
import { Role } from "./Role.model";

export class Utilisateur {
    _id:Number;
    _nom:String;
    _prenom:String;
    _email:String;
    _password:String;
    _dateNaissance:number;
    _disable:boolean;
    _role:Role;
    _roleId:Number;
    _adresseDto:Adresse;

    constructor(id:Number, nom:String,prenom:String,email:String,password:String,dateNaissance:number,disable:boolean,roleId:Number,role:Role,adresseDto:Adresse) {
        this._id=id;
        this._nom=nom;
        this._prenom=prenom;
        this._email=email;
        this._password=password;
        this._dateNaissance=dateNaissance;
        this._disable=disable;
        this._role=role;
        this._adresseDto=adresseDto;
        this._roleId=roleId;
    }

    get id(): Number {
        return this._id;
    }

    get nom(): String {
        return this._nom;
    }

    get prenom(): String {
        return this._prenom;
    }

    get email(): String { 
        return this._email;
    }

    get password(): String { 
        return this._password;
    }

    get dateNaissance(): number { 
        return this._dateNaissance;
    }

    get disable(): Boolean { 
        return this._disable;
    }

    get role(): Role  { 
        return this._role;
    }

    get adresseDto(): Adresse { 
        return this._adresseDto;
    }

    get roleId(): Number {
        return this._roleId;
    }
}