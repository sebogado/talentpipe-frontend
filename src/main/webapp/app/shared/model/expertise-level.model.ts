export interface IExpertiseLevel {
    id?: number;
    name?: string;
    description?: string;
}

export class ExpertiseLevel implements IExpertiseLevel {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
