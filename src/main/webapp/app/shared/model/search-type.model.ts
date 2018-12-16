export interface ISearchType {
    id?: number;
    name?: string;
    description?: string;
}

export class SearchType implements ISearchType {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
