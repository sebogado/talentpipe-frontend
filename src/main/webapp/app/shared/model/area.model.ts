export interface IArea {
    id?: number;
    name?: string;
    description?: string;
}

export class Area implements IArea {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
