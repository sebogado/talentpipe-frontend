export interface ISector {
    id?: number;
    name?: string;
    description?: string;
}

export class Sector implements ISector {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
