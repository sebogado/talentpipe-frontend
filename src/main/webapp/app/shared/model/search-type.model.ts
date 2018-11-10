export interface ISearchType {
  id?: number;
  name?: string;
  normalizedName?: string;
  description?: string;
}

export const defaultValue: Readonly<ISearchType> = {};
