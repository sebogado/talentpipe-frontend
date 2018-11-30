import { IUser } from 'app/shared/model/user.model';
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

export const defaultValue: Readonly<ICompany> = {};
