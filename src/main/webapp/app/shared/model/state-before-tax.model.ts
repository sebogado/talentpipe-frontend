export interface IStateBeforeTax {
  id?: number;
  name?: string;
  normalizedName?: string;
  description?: string;
}

export const defaultValue: Readonly<IStateBeforeTax> = {};
