export interface IWorkType {
  id?: number;
  name?: string;
  normalizedName?: string;
  description?: string;
  minQuantityHours?: number;
  maxQuantityHours?: number;
}

export const defaultValue: Readonly<IWorkType> = {};
