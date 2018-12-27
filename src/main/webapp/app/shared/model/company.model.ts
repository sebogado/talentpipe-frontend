import { IUser } from 'app/core/user/user.model';
import { ISector } from 'app/shared/model//sector.model';
import { ICity } from 'app/shared/model//city.model';
import { ICompanyType } from 'app/shared/model//company-type.model';

export interface ICompany {
    id?: number;
    taxName?: string;
    taxId?: string;
    email?: string;
    name?: string;
    street?: string;
    floor?: number;
    number?: number;
    apartment?: string;
    postalCode?: string;
    phone?: string;
    contactName?: string;
    mainUser?: IUser;
    sector?: ISector;
    city?: ICity;
    companyType?: ICompanyType;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public taxName?: string,
        public taxId?: string,
        public email?: string,
        public name?: string,
        public street?: string,
        public floor?: number,
        public number?: number,
        public apartment?: string,
        public postalCode?: string,
        public phone?: string,
        public contactName?: string,
        public mainUser?: IUser,
        public sector?: ISector,
        public city?: ICity,
        public companyType?: ICompanyType
    ) {}
}
