export interface ISector {
  id?: number;
  name?: string;
  normalizedName?: string;
  description?: string;
}

export const defaultValue: Readonly<ISector> = {};
