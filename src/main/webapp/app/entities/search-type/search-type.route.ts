import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchType } from 'app/shared/model/search-type.model';
import { SearchTypeService } from './search-type.service';
import { SearchTypeComponent } from './search-type.component';
import { SearchTypeDetailComponent } from './search-type-detail.component';
import { SearchTypeUpdateComponent } from './search-type-update.component';
import { SearchTypeDeletePopupComponent } from './search-type-delete-dialog.component';
import { ISearchType } from 'app/shared/model/search-type.model';

@Injectable({ providedIn: 'root' })
export class SearchTypeResolve implements Resolve<ISearchType> {
    constructor(private service: SearchTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SearchType>) => response.ok),
                map((searchType: HttpResponse<SearchType>) => searchType.body)
            );
        }
        return of(new SearchType());
    }
}

export const searchTypeRoute: Routes = [
    {
        path: 'search-type',
        component: SearchTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.searchType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-type/:id/view',
        component: SearchTypeDetailComponent,
        resolve: {
            searchType: SearchTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-type/new',
        component: SearchTypeUpdateComponent,
        resolve: {
            searchType: SearchTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-type/:id/edit',
        component: SearchTypeUpdateComponent,
        resolve: {
            searchType: SearchTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const searchTypePopupRoute: Routes = [
    {
        path: 'search-type/:id/delete',
        component: SearchTypeDeletePopupComponent,
        resolve: {
            searchType: SearchTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
