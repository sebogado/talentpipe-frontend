import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';

type EntityResponseType = HttpResponse<ITechnicalSkill>;
type EntityArrayResponseType = HttpResponse<ITechnicalSkill[]>;

@Injectable({ providedIn: 'root' })
export class TechnicalSkillService {
    public resourceUrl = SERVER_API_URL + 'api/technical-skills';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/technical-skills';

    constructor(private http: HttpClient) {}

    create(technicalSkill: ITechnicalSkill): Observable<EntityResponseType> {
        return this.http.post<ITechnicalSkill>(this.resourceUrl, technicalSkill, { observe: 'response' });
    }

    update(technicalSkill: ITechnicalSkill): Observable<EntityResponseType> {
        return this.http.put<ITechnicalSkill>(this.resourceUrl, technicalSkill, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITechnicalSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITechnicalSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITechnicalSkill[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
