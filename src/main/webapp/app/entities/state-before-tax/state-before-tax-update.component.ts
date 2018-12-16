import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';
import { StateBeforeTaxService } from './state-before-tax.service';

@Component({
    selector: 'jhi-state-before-tax-update',
    templateUrl: './state-before-tax-update.component.html'
})
export class StateBeforeTaxUpdateComponent implements OnInit {
    stateBeforeTax: IStateBeforeTax;
    isSaving: boolean;

    constructor(private stateBeforeTaxService: StateBeforeTaxService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stateBeforeTax }) => {
            this.stateBeforeTax = stateBeforeTax;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stateBeforeTax.id !== undefined) {
            this.subscribeToSaveResponse(this.stateBeforeTaxService.update(this.stateBeforeTax));
        } else {
            this.subscribeToSaveResponse(this.stateBeforeTaxService.create(this.stateBeforeTax));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStateBeforeTax>>) {
        result.subscribe((res: HttpResponse<IStateBeforeTax>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
