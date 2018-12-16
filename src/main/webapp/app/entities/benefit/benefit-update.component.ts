import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBenefit } from 'app/shared/model/benefit.model';
import { BenefitService } from './benefit.service';

@Component({
    selector: 'jhi-benefit-update',
    templateUrl: './benefit-update.component.html'
})
export class BenefitUpdateComponent implements OnInit {
    benefit: IBenefit;
    isSaving: boolean;

    constructor(private benefitService: BenefitService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ benefit }) => {
            this.benefit = benefit;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.benefit.id !== undefined) {
            this.subscribeToSaveResponse(this.benefitService.update(this.benefit));
        } else {
            this.subscribeToSaveResponse(this.benefitService.create(this.benefit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBenefit>>) {
        result.subscribe((res: HttpResponse<IBenefit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
