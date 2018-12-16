import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sector } from 'app/shared/model/sector.model';
import { SectorService } from './sector.service';
import { SectorComponent } from './sector.component';
import { SectorDetailComponent } from './sector-detail.component';
import { SectorUpdateComponent } from './sector-update.component';
import { SectorDeletePopupComponent } from './sector-delete-dialog.component';
import { ISector } from 'app/shared/model/sector.model';

@Injectable({ providedIn: 'root' })
export class SectorResolve implements Resolve<ISector> {
    constructor(private service: SectorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sector> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Sector>) => response.ok),
                map((sector: HttpResponse<Sector>) => sector.body)
            );
        }
        return of(new Sector());
    }
}

export const sectorRoute: Routes = [
    {
        path: 'sector',
        component: SectorComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'talentpipeFrontendApp.sector.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sector/:id/view',
        component: SectorDetailComponent,
        resolve: {
            sector: SectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.sector.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sector/new',
        component: SectorUpdateComponent,
        resolve: {
            sector: SectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.sector.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sector/:id/edit',
        component: SectorUpdateComponent,
        resolve: {
            sector: SectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.sector.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectorPopupRoute: Routes = [
    {
        path: 'sector/:id/delete',
        component: SectorDeletePopupComponent,
        resolve: {
            sector: SectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'talentpipeFrontendApp.sector.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
