import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISoftSkill } from 'app/shared/model/soft-skill.model';
import { SoftSkillService } from './soft-skill.service';

@Component({
    selector: 'jhi-soft-skill-update',
    templateUrl: './soft-skill-update.component.html'
})
export class SoftSkillUpdateComponent implements OnInit {
    softSkill: ISoftSkill;
    isSaving: boolean;

    constructor(private softSkillService: SoftSkillService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ softSkill }) => {
            this.softSkill = softSkill;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.softSkill.id !== undefined) {
            this.subscribeToSaveResponse(this.softSkillService.update(this.softSkill));
        } else {
            this.subscribeToSaveResponse(this.softSkillService.create(this.softSkill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISoftSkill>>) {
        result.subscribe((res: HttpResponse<ISoftSkill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
