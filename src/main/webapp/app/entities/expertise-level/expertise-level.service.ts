import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';

type EntityResponseType = HttpResponse<IExpertiseLevel>;
type EntityArrayResponseType = HttpResponse<IExpertiseLevel[]>;

@Injectable({ providedIn: 'root' })
export class ExpertiseLevelService {
    public resourceUrl = SERVER_API_URL + 'api/expertise-levels';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/expertise-levels';

    constructor(private http: HttpClient) {}

    create(expertiseLevel: IExpertiseLevel): Observable<EntityResponseType> {
        return this.http.post<IExpertiseLevel>(this.resourceUrl, expertiseLevel, { observe: 'response' });
    }

    update(expertiseLevel: IExpertiseLevel): Observable<EntityResponseType> {
        return this.http.put<IExpertiseLevel>(this.resourceUrl, expertiseLevel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExpertiseLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExpertiseLevel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExpertiseLevel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
