import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExpertiseLevel } from 'app/shared/model/expertise-level.model';
import { ExpertiseLevelService } from './expertise-level.service';
import { ExpertiseLevelComponent } from './expertise-level.component';
import { ExpertiseLevelDetailComponent } from './expertise-level-detail.component';
import { ExpertiseLevelUpdateComponent } from './expertise-level-update.component';
import { ExpertiseLevelDeletePopupComponent } from './expertise-level-delete-dialog.component';
import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';

@Injectable({ providedIn: 'root' })
export class ExpertiseLevelResolve implements Resolve<IExpertiseLevel> {
    constructor(private service: ExpertiseLevelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExpertiseLevel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ExpertiseLevel>) => response.ok),
                map((expertiseLevel: HttpResponse<ExpertiseLevel>) => expertiseLevel.body)
            );
        }
        return of(new ExpertiseLevel());
    }
}

export const expertiseLevelRoute: Routes = [
    {
        path: 'expertise-level',
        component: ExpertiseLevelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.expertiseLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expertise-level/:id/view',
        component: ExpertiseLevelDetailComponent,
        resolve: {
            expertiseLevel: ExpertiseLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.expertiseLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expertise-level/new',
        component: ExpertiseLevelUpdateComponent,
        resolve: {
            expertiseLevel: ExpertiseLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.expertiseLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expertise-level/:id/edit',
        component: ExpertiseLevelUpdateComponent,
        resolve: {
            expertiseLevel: ExpertiseLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.expertiseLevel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expertiseLevelPopupRoute: Routes = [
    {
        path: 'expertise-level/:id/delete',
        component: ExpertiseLevelDeletePopupComponent,
        resolve: {
            expertiseLevel: ExpertiseLevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.expertiseLevel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
