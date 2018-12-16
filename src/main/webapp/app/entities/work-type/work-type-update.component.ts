import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';

@Component({
    selector: 'jhi-work-type-update',
    templateUrl: './work-type-update.component.html'
})
export class WorkTypeUpdateComponent implements OnInit {
    workType: IWorkType;
    isSaving: boolean;

    constructor(private workTypeService: WorkTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ workType }) => {
            this.workType = workType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.workType.id !== undefined) {
            this.subscribeToSaveResponse(this.workTypeService.update(this.workType));
        } else {
            this.subscribeToSaveResponse(this.workTypeService.create(this.workType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWorkType>>) {
        result.subscribe((res: HttpResponse<IWorkType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
