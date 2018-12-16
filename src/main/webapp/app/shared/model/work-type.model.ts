export interface IWorkType {
    id?: number;
    name?: string;
    description?: string;
    minQuantityHours?: number;
    maxQuantityHours?: number;
}

export class WorkType implements IWorkType {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public minQuantityHours?: number,
        public maxQuantityHours?: number
    ) {}
}
