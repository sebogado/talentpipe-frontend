import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWorkType } from 'app/shared/model/work-type.model';

type EntityResponseType = HttpResponse<IWorkType>;
type EntityArrayResponseType = HttpResponse<IWorkType[]>;

@Injectable({ providedIn: 'root' })
export class WorkTypeService {
    public resourceUrl = SERVER_API_URL + 'api/work-types';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/work-types';

    constructor(private http: HttpClient) {}

    create(workType: IWorkType): Observable<EntityResponseType> {
        return this.http.post<IWorkType>(this.resourceUrl, workType, { observe: 'response' });
    }

    update(workType: IWorkType): Observable<EntityResponseType> {
        return this.http.put<IWorkType>(this.resourceUrl, workType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWorkType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWorkType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWorkType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
