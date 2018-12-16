import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISoftSkill } from 'app/shared/model/soft-skill.model';

type EntityResponseType = HttpResponse<ISoftSkill>;
type EntityArrayResponseType = HttpResponse<ISoftSkill[]>;

@Injectable({ providedIn: 'root' })
export class SoftSkillService {
    public resourceUrl = SERVER_API_URL + 'api/soft-skills';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/soft-skills';

    constructor(private http: HttpClient) {}

    create(softSkill: ISoftSkill): Observable<EntityResponseType> {
        return this.http.post<ISoftSkill>(this.resourceUrl, softSkill, { observe: 'response' });
    }

    update(softSkill: ISoftSkill): Observable<EntityResponseType> {
        return this.http.put<ISoftSkill>(this.resourceUrl, softSkill, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISoftSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISoftSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISoftSkill[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
