import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';
import { ExpertiseLevelService } from './expertise-level.service';

@Component({
    selector: 'jhi-expertise-level-update',
    templateUrl: './expertise-level-update.component.html'
})
export class ExpertiseLevelUpdateComponent implements OnInit {
    expertiseLevel: IExpertiseLevel;
    isSaving: boolean;

    constructor(private expertiseLevelService: ExpertiseLevelService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expertiseLevel }) => {
            this.expertiseLevel = expertiseLevel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.expertiseLevel.id !== undefined) {
            this.subscribeToSaveResponse(this.expertiseLevelService.update(this.expertiseLevel));
        } else {
            this.subscribeToSaveResponse(this.expertiseLevelService.create(this.expertiseLevel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExpertiseLevel>>) {
        result.subscribe((res: HttpResponse<IExpertiseLevel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
