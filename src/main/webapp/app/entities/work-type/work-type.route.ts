import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { WorkTypeComponent } from './work-type.component';
import { WorkTypeDetailComponent } from './work-type-detail.component';
import { WorkTypeUpdateComponent } from './work-type-update.component';
import { WorkTypeDeletePopupComponent } from './work-type-delete-dialog.component';
import { IWorkType } from 'app/shared/model/work-type.model';

@Injectable({ providedIn: 'root' })
export class WorkTypeResolve implements Resolve<IWorkType> {
    constructor(private service: WorkTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<WorkType>) => response.ok),
                map((workType: HttpResponse<WorkType>) => workType.body)
            );
        }
        return of(new WorkType());
    }
}

export const workTypeRoute: Routes = [
    {
        path: 'work-type',
        component: WorkTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.workType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work-type/:id/view',
        component: WorkTypeDetailComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.workType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work-type/new',
        component: WorkTypeUpdateComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.workType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work-type/:id/edit',
        component: WorkTypeUpdateComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.workType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workTypePopupRoute: Routes = [
    {
        path: 'work-type/:id/delete',
        component: WorkTypeDeletePopupComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.workType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
