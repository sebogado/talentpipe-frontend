export interface ISearchStatus {
    id?: number;
    name?: string;
    description?: string;
}

export class SearchStatus implements ISearchStatus {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
