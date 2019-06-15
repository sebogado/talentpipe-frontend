import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISearchRequest } from 'app/shared/model/search-request.model';
import { SearchRequestService } from './search-request.service';
import { ICompany } from 'app/shared/model/company.model';
import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';
import { ExpertiseLevelService } from 'app/entities/expertise-level';
import { ISoftSkill } from 'app/shared/model/soft-skill.model';
import { SoftSkillService } from 'app/entities/soft-skill';
import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';
import { TechnicalSkillService } from 'app/entities/technical-skill';
import { CompanyService } from 'app/entities/company';
import { Benefit, IBenefit } from 'app/shared/model/benefit.model';
import { BenefitService } from 'app/entities/benefit';

@Component({
    selector: 'jhi-search-request-update',
    templateUrl: './search-request-update.component.html',
    styles: [
        'node_modules/primeicons/primeicons.css',
        'node_modules/primeng/resources/themes/nova-light/theme.css',
        'node_modules/primeng/resources/primeng.min.css'
    ]
})
export class SearchRequestUpdateComponent implements OnInit {
    searchRequest: ISearchRequest;
    isSaving: boolean;
    suggestedNonRequiredSoftSkill: ISoftSkill[];
    suggestedRequiredSoftSkill: ISoftSkill[];

    companies: ICompany[];
    expertiselevels: IExpertiseLevel[];
    suggestedRequiredTechnicalSkill: ITechnicalSkill[];
    suggestedNonRequiredTechnicalSkill: ITechnicalSkill[];
    suggestedBenefits: IBenefit[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private searchRequestService: SearchRequestService,
        private expertiseLevelService: ExpertiseLevelService,
        private softSkillService: SoftSkillService,
        private technicalSkillService: TechnicalSkillService,
        private companyService: CompanyService,
        private benefitService: BenefitService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ searchRequest }) => {
            this.searchRequest = searchRequest;
        });
        this.expertiseLevelService.query().subscribe(
            (res: HttpResponse<IExpertiseLevel[]>) => {
                this.expertiselevels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
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

    saveForMe() {
        this.isSaving = true;
        if (this.searchRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.searchRequestService.updateMe(this.searchRequest));
        } else {
            this.subscribeToSaveResponse(this.searchRequestService.createMe(this.searchRequest));
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

    searchNonRequiredSoftSkill(event: any) {
        this.softSkillService.query(event.query).subscribe(
            (res: HttpResponse<ISoftSkill[]>) => {
                console.log(res.body);
                this.suggestedNonRequiredSoftSkill = res.body;
            },
            (err: HttpErrorResponse) => {
                this.onError(err.message);
            }
        );
    }
    searchRequiredSoftSkill(event: any) {
        this.softSkillService.query(event.query).subscribe(
            (res: HttpResponse<ISoftSkill[]>) => {
                console.log(res.body);
                this.suggestedRequiredSoftSkill = res.body;
            },
            (err: HttpErrorResponse) => {
                this.onError(err.message);
            }
        );
    }

    searchRequiredTechnicalSkill(event: any) {
        this.technicalSkillService.query(event.query).subscribe(
            (res: HttpResponse<ITechnicalSkill[]>) => {
                console.log(res.body);
                this.suggestedRequiredTechnicalSkill = res.body;
            },
            (err: HttpErrorResponse) => {
                this.onError(err.message);
            }
        );
    }

    searchNonRequiredTechnicalSkill(event: any) {
        this.technicalSkillService.query(event.query).subscribe(
            (res: HttpResponse<ITechnicalSkill[]>) => {
                console.log(res.body);
                this.suggestedNonRequiredTechnicalSkill = res.body;
            },
            (err: HttpErrorResponse) => {
                this.onError(err.message);
            }
        );
    }

    searchBenefits(event: any) {
        console.log(event);
        this.suggestedBenefits = [new Benefit(1, 'Home office 2 x semana')];
        /* this.benefitService.query(event.query).subscribe(
            (res: HttpResponse<IBenefit[]>) => {
                console.log(res.body);
                this.suggestedBenefits = res.body;
                console.log('This are the benefits:' + res.body[0].name);
            },
            (err: HttpErrorResponse) => {
                this.onError(err.message);
            }
        );*/
    }
}
