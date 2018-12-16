export interface ITechnicalSkill {
    id?: number;
    name?: string;
    description?: string;
}

export class TechnicalSkill implements ITechnicalSkill {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
