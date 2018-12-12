export interface ICountry {
  id?: number;
  name?: string;
  code?: string;
  phoneCode?: string;
  currency?: string;
}

export const defaultValue: Readonly<ICountry> = {};
