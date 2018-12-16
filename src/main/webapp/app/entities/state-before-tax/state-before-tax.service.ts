import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';

type EntityResponseType = HttpResponse<IStateBeforeTax>;
type EntityArrayResponseType = HttpResponse<IStateBeforeTax[]>;

@Injectable({ providedIn: 'root' })
export class StateBeforeTaxService {
    public resourceUrl = SERVER_API_URL + 'api/state-before-taxes';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/state-before-taxes';

    constructor(private http: HttpClient) {}

    create(stateBeforeTax: IStateBeforeTax): Observable<EntityResponseType> {
        return this.http.post<IStateBeforeTax>(this.resourceUrl, stateBeforeTax, { observe: 'response' });
    }

    update(stateBeforeTax: IStateBeforeTax): Observable<EntityResponseType> {
        return this.http.put<IStateBeforeTax>(this.resourceUrl, stateBeforeTax, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStateBeforeTax>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStateBeforeTax[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStateBeforeTax[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
