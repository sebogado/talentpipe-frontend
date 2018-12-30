import { IAuthority } from 'app/shared/model//authority.model';

export interface IRole {
    id?: number;
    name?: string;
    description?: string;
    authorities?: IAuthority[];
}

export class Role implements IRole {
    constructor(public id?: number, public name?: string, public description?: string, public authorities?: IAuthority[]) {}
}
