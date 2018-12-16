import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TechnicalSkill } from 'app/shared/model/technical-skill.model';
import { TechnicalSkillService } from './technical-skill.service';
import { TechnicalSkillComponent } from './technical-skill.component';
import { TechnicalSkillDetailComponent } from './technical-skill-detail.component';
import { TechnicalSkillUpdateComponent } from './technical-skill-update.component';
import { TechnicalSkillDeletePopupComponent } from './technical-skill-delete-dialog.component';
import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';

@Injectable({ providedIn: 'root' })
export class TechnicalSkillResolve implements Resolve<ITechnicalSkill> {
    constructor(private service: TechnicalSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TechnicalSkill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TechnicalSkill>) => response.ok),
                map((technicalSkill: HttpResponse<TechnicalSkill>) => technicalSkill.body)
            );
        }
        return of(new TechnicalSkill());
    }
}

export const technicalSkillRoute: Routes = [
    {
        path: 'technical-skill',
        component: TechnicalSkillComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.technicalSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'technical-skill/:id/view',
        component: TechnicalSkillDetailComponent,
        resolve: {
            technicalSkill: TechnicalSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.technicalSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'technical-skill/new',
        component: TechnicalSkillUpdateComponent,
        resolve: {
            technicalSkill: TechnicalSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.technicalSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'technical-skill/:id/edit',
        component: TechnicalSkillUpdateComponent,
        resolve: {
            technicalSkill: TechnicalSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.technicalSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const technicalSkillPopupRoute: Routes = [
    {
        path: 'technical-skill/:id/delete',
        component: TechnicalSkillDeletePopupComponent,
        resolve: {
            technicalSkill: TechnicalSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.technicalSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
