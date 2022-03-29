export class Role {
    _id:Number;
    _label:String;

    constructor(id:Number, label:String) {
        this._id = id;
        this._label = label;
    }

    get id():Number { 
        return this._id
    }

    get label():String { return this._label }

}