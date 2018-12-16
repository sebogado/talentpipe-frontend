import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateBeforeTax } from 'app/shared/model/state-before-tax.model';
import { StateBeforeTaxService } from './state-before-tax.service';
import { StateBeforeTaxComponent } from './state-before-tax.component';
import { StateBeforeTaxDetailComponent } from './state-before-tax-detail.component';
import { StateBeforeTaxUpdateComponent } from './state-before-tax-update.component';
import { StateBeforeTaxDeletePopupComponent } from './state-before-tax-delete-dialog.component';
import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';

@Injectable({ providedIn: 'root' })
export class StateBeforeTaxResolve implements Resolve<IStateBeforeTax> {
    constructor(private service: StateBeforeTaxService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StateBeforeTax> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StateBeforeTax>) => response.ok),
                map((stateBeforeTax: HttpResponse<StateBeforeTax>) => stateBeforeTax.body)
            );
        }
        return of(new StateBeforeTax());
    }
}

export const stateBeforeTaxRoute: Routes = [
    {
        path: 'state-before-tax',
        component: StateBeforeTaxComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.stateBeforeTax.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-before-tax/:id/view',
        component: StateBeforeTaxDetailComponent,
        resolve: {
            stateBeforeTax: StateBeforeTaxResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.stateBeforeTax.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-before-tax/new',
        component: StateBeforeTaxUpdateComponent,
        resolve: {
            stateBeforeTax: StateBeforeTaxResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.stateBeforeTax.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'state-before-tax/:id/edit',
        component: StateBeforeTaxUpdateComponent,
        resolve: {
            stateBeforeTax: StateBeforeTaxResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.stateBeforeTax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stateBeforeTaxPopupRoute: Routes = [
    {
        path: 'state-before-tax/:id/delete',
        component: StateBeforeTaxDeletePopupComponent,
        resolve: {
            stateBeforeTax: StateBeforeTaxResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.stateBeforeTax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
