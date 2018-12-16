export interface IBenefit {
    id?: number;
    name?: string;
    description?: string;
}

export class Benefit implements IBenefit {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
