export interface ISoftSkill {
    id?: number;
    name?: string;
    description?: string;
}

export class SoftSkill implements ISoftSkill {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
