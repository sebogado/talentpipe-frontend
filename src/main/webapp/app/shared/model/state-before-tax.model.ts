export interface IStateBeforeTax {
    id?: number;
    name?: string;
    description?: string;
}

export class StateBeforeTax implements IStateBeforeTax {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
