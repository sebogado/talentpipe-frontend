export interface ICompanyType {
    id?: number;
    name?: string;
    description?: string;
    minEmployeesQuantity?: number;
    maxEmployeesQuantity?: number;
}

export class CompanyType implements ICompanyType {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public minEmployeesQuantity?: number,
        public maxEmployeesQuantity?: number
    ) {}
}
