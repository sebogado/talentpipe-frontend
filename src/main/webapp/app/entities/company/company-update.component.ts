import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { IUser, UserService } from 'app/core';
import { ISector } from 'app/shared/model/sector.model';
import { SectorService } from 'app/entities/sector';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';
import { ICompanyType } from 'app/shared/model/company-type.model';
import { CompanyTypeService } from 'app/entities/company-type';

@Component({
    selector: 'jhi-company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
    company: ICompany;
    isSaving: boolean;

    users: IUser[];

    sectors: ISector[];

    cities: ICity[];

    companytypes: ICompanyType[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companyService: CompanyService,
        private userService: UserService,
        private sectorService: SectorService,
        private cityService: CityService,
        private companyTypeService: CompanyTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.sectorService.query().subscribe(
            (res: HttpResponse<ISector[]>) => {
                this.sectors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cityService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyTypeService.query().subscribe(
            (res: HttpResponse<ICompanyType[]>) => {
                this.companytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>) {
        result.subscribe((res: HttpResponse<ICompany>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackSectorById(index: number, item: ISector) {
        return item.id;
    }

    trackCityById(index: number, item: ICity) {
        return item.id;
    }

    trackCompanyTypeById(index: number, item: ICompanyType) {
        return item.id;
    }
}
