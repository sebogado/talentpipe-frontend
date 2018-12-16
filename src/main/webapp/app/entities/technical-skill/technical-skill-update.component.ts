import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';
import { TechnicalSkillService } from './technical-skill.service';

@Component({
    selector: 'jhi-technical-skill-update',
    templateUrl: './technical-skill-update.component.html'
})
export class TechnicalSkillUpdateComponent implements OnInit {
    technicalSkill: ITechnicalSkill;
    isSaving: boolean;

    constructor(private technicalSkillService: TechnicalSkillService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ technicalSkill }) => {
            this.technicalSkill = technicalSkill;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.technicalSkill.id !== undefined) {
            this.subscribeToSaveResponse(this.technicalSkillService.update(this.technicalSkill));
        } else {
            this.subscribeToSaveResponse(this.technicalSkillService.create(this.technicalSkill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITechnicalSkill>>) {
        result.subscribe((res: HttpResponse<ITechnicalSkill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
