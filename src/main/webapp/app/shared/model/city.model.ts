import { ICountry } from 'app/shared/model//country.model';

export interface ICity {
    id?: number;
    name?: string;
    postalCode?: string;
    country?: ICountry;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public postalCode?: string, public country?: ICountry) {}
}
