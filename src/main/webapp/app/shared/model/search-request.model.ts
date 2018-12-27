import { ICompany } from 'app/shared/model//company.model';
import { IExpertiseLevel } from 'app/shared/model//expertise-level.model';
import { ITechnicalSkill } from 'app/shared/model//technical-skill.model';
import { ISoftSkill } from 'app/shared/model//soft-skill.model';
import { IBenefit } from 'app/shared/model//benefit.model';

export interface ISearchRequest {
    id?: number;
    name?: string;
    description?: string;
    minSalary?: number;
    maxSalary?: number;
    position?: string;
    company?: ICompany;
    expertiseLevel?: IExpertiseLevel;
    requiredTechnicalSkills?: ITechnicalSkill[];
    nonRequiredTechnicalSkills?: ITechnicalSkill[];
    requiredSoftSkills?: ISoftSkill[];
    nonRequiredSoftSkills?: ISoftSkill[];
    benefits?: IBenefit[];
}

export class SearchRequest implements ISearchRequest {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public position?: string,
        public company?: ICompany,
        public expertiseLevel?: IExpertiseLevel,
        public requiredTechnicalSkills?: ITechnicalSkill[],
        public nonRequiredTechnicalSkills?: ITechnicalSkill[],
        public requiredSoftSkills?: ISoftSkill[],
        public nonRequiredSoftSkills?: ISoftSkill[],
        public benefits?: IBenefit[]
    ) {}
}
