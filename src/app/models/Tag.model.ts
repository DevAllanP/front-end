export class Tag {
    _id: number;
    _label: string;
    _nombreProduits: Number;

    constructor(id: number, label: string, nombreProduits: Number) {
        this._id = id;
        this._label = label;
        this._nombreProduits = nombreProduits;
    }

    get id(): number { return this._id; }

    get label(): string { return this._label; }

    get nombreProduits(): Number { return this._nombreProduits; }
}