export interface ISoftSkill {
  id?: number;
  name?: string;
  normalizedName?: string;
  description?: string;
}

export const defaultValue: Readonly<ISoftSkill> = {};
