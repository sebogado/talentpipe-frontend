import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISearchRequest } from 'app/shared/model/search-request.model';
import { SearchRequestService } from './search-request.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';
import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';
import { ExpertiseLevelService } from 'app/entities/expertise-level';

@Component({
    selector: 'jhi-search-request-update',
    templateUrl: './search-request-update.component.html'
})
export class SearchRequestUpdateComponent implements OnInit {
    searchRequest: ISearchRequest;
    isSaving: boolean;

    companies: ICompany[];

    expertiselevels: IExpertiseLevel[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private searchRequestService: SearchRequestService,
        private companyService: CompanyService,
        private expertiseLevelService: ExpertiseLevelService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ searchRequest }) => {
            this.searchRequest = searchRequest;
        });
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.expertiseLevelService.query().subscribe(
            (res: HttpResponse<IExpertiseLevel[]>) => {
                this.expertiselevels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.searchRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.searchRequestService.update(this.searchRequest));
        } else {
            this.subscribeToSaveResponse(this.searchRequestService.create(this.searchRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISearchRequest>>) {
        result.subscribe((res: HttpResponse<ISearchRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackExpertiseLevelById(index: number, item: IExpertiseLevel) {
        return item.id;
    }
}
