import { ICity } from 'app/shared/model//city.model';
import { ISector } from 'app/shared/model//sector.model';

export interface IRecruiter {
  id?: number;
  name?: string;
  lastName?: string;
  email?: string;
  taxId?: string;
  phone?: string;
  street?: string;
  number?: number;
  floor?: number;
  apartment?: string;
  city?: ICity;
  sector?: ISector;
}

export const defaultValue: Readonly<IRecruiter> = {};
