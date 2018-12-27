import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SearchStatus } from 'app/shared/model/search-status.model';
import { SearchStatusService } from './search-status.service';
import { SearchStatusComponent } from './search-status.component';
import { SearchStatusDetailComponent } from './search-status-detail.component';
import { SearchStatusUpdateComponent } from './search-status-update.component';
import { SearchStatusDeletePopupComponent } from './search-status-delete-dialog.component';
import { ISearchStatus } from 'app/shared/model/search-status.model';

@Injectable({ providedIn: 'root' })
export class SearchStatusResolve implements Resolve<ISearchStatus> {
    constructor(private service: SearchStatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchStatus> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SearchStatus>) => response.ok),
                map((searchStatus: HttpResponse<SearchStatus>) => searchStatus.body)
            );
        }
        return of(new SearchStatus());
    }
}

export const searchStatusRoute: Routes = [
    {
        path: 'search-status',
        component: SearchStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-status/:id/view',
        component: SearchStatusDetailComponent,
        resolve: {
            searchStatus: SearchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-status/new',
        component: SearchStatusUpdateComponent,
        resolve: {
            searchStatus: SearchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'search-status/:id/edit',
        component: SearchStatusUpdateComponent,
        resolve: {
            searchStatus: SearchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const searchStatusPopupRoute: Routes = [
    {
        path: 'search-status/:id/delete',
        component: SearchStatusDeletePopupComponent,
        resolve: {
            searchStatus: SearchStatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.searchStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
