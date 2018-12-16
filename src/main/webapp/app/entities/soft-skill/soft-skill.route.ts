import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SoftSkill } from 'app/shared/model/soft-skill.model';
import { SoftSkillService } from './soft-skill.service';
import { SoftSkillComponent } from './soft-skill.component';
import { SoftSkillDetailComponent } from './soft-skill-detail.component';
import { SoftSkillUpdateComponent } from './soft-skill-update.component';
import { SoftSkillDeletePopupComponent } from './soft-skill-delete-dialog.component';
import { ISoftSkill } from 'app/shared/model/soft-skill.model';

@Injectable({ providedIn: 'root' })
export class SoftSkillResolve implements Resolve<ISoftSkill> {
    constructor(private service: SoftSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SoftSkill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SoftSkill>) => response.ok),
                map((softSkill: HttpResponse<SoftSkill>) => softSkill.body)
            );
        }
        return of(new SoftSkill());
    }
}

export const softSkillRoute: Routes = [
    {
        path: 'soft-skill',
        component: SoftSkillComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.softSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soft-skill/:id/view',
        component: SoftSkillDetailComponent,
        resolve: {
            softSkill: SoftSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.softSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soft-skill/new',
        component: SoftSkillUpdateComponent,
        resolve: {
            softSkill: SoftSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.softSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soft-skill/:id/edit',
        component: SoftSkillUpdateComponent,
        resolve: {
            softSkill: SoftSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.softSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const softSkillPopupRoute: Routes = [
    {
        path: 'soft-skill/:id/delete',
        component: SoftSkillDeletePopupComponent,
        resolve: {
            softSkill: SoftSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.softSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
