export interface ICompanyType {
  id?: number;
  name?: string;
  description?: string;
  minEmployeesQuantity?: number;
  maxEmployeesQuantity?: number;
}

export const defaultValue: Readonly<ICompanyType> = {};
