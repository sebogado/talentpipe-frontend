import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchRequest } from 'app/shared/model/search-request.model';
import { SearchRequestService } from './search-request.service';
import { SearchRequestComponent } from './search-request.component';
import { SearchRequestDetailComponent } from './search-request-detail.component';
import { SearchRequestUpdateComponent } from './search-request-update.component';
import { SearchRequestDeletePopupComponent } from './search-request-delete-dialog.component';
import { ISearchRequest } from 'app/shared/model/search-request.model';

@Injectable({ providedIn: 'root' })
export class SearchRequestResolve implements Resolve<ISearchRequest> {
    constructor(private service: SearchRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SearchRequest>) => response.ok),
                map((searchRequest: HttpResponse<SearchRequest>) => searchRequest.body)
            );
        }
        return of(new SearchRequest());
    }
}

export const searchRequestRoute: Routes = [
    {
        path: 'search-request',
        component: SearchRequestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.searchRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-request/:id/view',
        component: SearchRequestDetailComponent,
        resolve: {
            searchRequest: SearchRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-request/new',
        component: SearchRequestUpdateComponent,
        resolve: {
            searchRequest: SearchRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-request/:id/edit',
        component: SearchRequestUpdateComponent,
        resolve: {
            searchRequest: SearchRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const searchRequestPopupRoute: Routes = [
    {
        path: 'search-request/:id/delete',
        component: SearchRequestDeletePopupComponent,
        resolve: {
            searchRequest: SearchRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
