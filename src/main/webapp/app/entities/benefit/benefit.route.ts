import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Benefit } from 'app/shared/model/benefit.model';
import { BenefitService } from './benefit.service';
import { BenefitComponent } from './benefit.component';
import { BenefitDetailComponent } from './benefit-detail.component';
import { BenefitUpdateComponent } from './benefit-update.component';
import { BenefitDeletePopupComponent } from './benefit-delete-dialog.component';
import { IBenefit } from 'app/shared/model/benefit.model';

@Injectable({ providedIn: 'root' })
export class BenefitResolve implements Resolve<IBenefit> {
    constructor(private service: BenefitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Benefit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Benefit>) => response.ok),
                map((benefit: HttpResponse<Benefit>) => benefit.body)
            );
        }
        return of(new Benefit());
    }
}

export const benefitRoute: Routes = [
    {
        path: 'benefit',
        component: BenefitComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.benefit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'benefit/:id/view',
        component: BenefitDetailComponent,
        resolve: {
            benefit: BenefitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.benefit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'benefit/new',
        component: BenefitUpdateComponent,
        resolve: {
            benefit: BenefitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.benefit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'benefit/:id/edit',
        component: BenefitUpdateComponent,
        resolve: {
            benefit: BenefitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.benefit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const benefitPopupRoute: Routes = [
    {
        path: 'benefit/:id/delete',
        component: BenefitDeletePopupComponent,
        resolve: {
            benefit: BenefitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.benefit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
