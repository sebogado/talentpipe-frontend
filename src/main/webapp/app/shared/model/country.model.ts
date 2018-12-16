export interface ICountry {
    id?: number;
    name?: string;
    code?: string;
    phoneCode?: string;
    currency?: string;
}

export class Country implements ICountry {
    constructor(public id?: number, public name?: string, public code?: string, public phoneCode?: string, public currency?: string) {}
}
