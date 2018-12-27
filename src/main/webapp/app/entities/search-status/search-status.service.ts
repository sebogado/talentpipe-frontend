import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISearchStatus } from 'app/shared/model/search-status.model';

type EntityResponseType = HttpResponse<ISearchStatus>;
type EntityArrayResponseType = HttpResponse<ISearchStatus[]>;

@Injectable({ providedIn: 'root' })
export class SearchStatusService {
    public resourceUrl = SERVER_API_URL + 'api/search-statuses';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/search-statuses';

    constructor(private http: HttpClient) {}

    create(searchStatus: ISearchStatus): Observable<EntityResponseType> {
        return this.http.post<ISearchStatus>(this.resourceUrl, searchStatus, { observe: 'response' });
    }

    update(searchStatus: ISearchStatus): Observable<EntityResponseType> {
        return this.http.put<ISearchStatus>(this.resourceUrl, searchStatus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISearchStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISearchStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
