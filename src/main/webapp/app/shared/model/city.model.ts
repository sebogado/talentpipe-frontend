import { ICountry } from 'app/shared/model//country.model';

export interface ICity {
  id?: number;
  name?: string;
  postalCode?: string;
  sarasa?: string;
  country?: ICountry;
}

export const defaultValue: Readonly<ICity> = {};
