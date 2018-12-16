import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISearchType } from 'app/shared/model/search-type.model';

type EntityResponseType = HttpResponse<ISearchType>;
type EntityArrayResponseType = HttpResponse<ISearchType[]>;

@Injectable({ providedIn: 'root' })
export class SearchTypeService {
    public resourceUrl = SERVER_API_URL + 'api/search-types';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/search-types';

    constructor(private http: HttpClient) {}

    create(searchType: ISearchType): Observable<EntityResponseType> {
        return this.http.post<ISearchType>(this.resourceUrl, searchType, { observe: 'response' });
    }

    update(searchType: ISearchType): Observable<EntityResponseType> {
        return this.http.put<ISearchType>(this.resourceUrl, searchType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISearchType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
