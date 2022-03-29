export class Frais {
    _id: number;
    _label: string;
    _montant: number;

    constructor(id: number, label: string, montant: number) {
        this._id = id;
        this._label = label;
        this._montant = montant;
    }

    get id(): number { return this._id; }

    get label(): string { return this._label; }

    get montant(): number { return this._montant; }
}