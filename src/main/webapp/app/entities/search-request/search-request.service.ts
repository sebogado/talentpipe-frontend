import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISearchRequest } from 'app/shared/model/search-request.model';

type EntityResponseType = HttpResponse<ISearchRequest>;
type EntityArrayResponseType = HttpResponse<ISearchRequest[]>;

@Injectable({ providedIn: 'root' })
export class SearchRequestService {
    public resourceUrl = SERVER_API_URL + 'api/search-requests';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/search-requests';

    constructor(private http: HttpClient) {}

    create(searchRequest: ISearchRequest): Observable<EntityResponseType> {
        return this.http.post<ISearchRequest>(this.resourceUrl, searchRequest, { observe: 'response' });
    }

    update(searchRequest: ISearchRequest): Observable<EntityResponseType> {
        return this.http.put<ISearchRequest>(this.resourceUrl, searchRequest, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISearchRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchRequest[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
