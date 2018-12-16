import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoftSkill } from 'app/shared/model/soft-skill.model';

@Component({
    selector: 'jhi-soft-skill-detail',
    templateUrl: './soft-skill-detail.component.html'
})
export class SoftSkillDetailComponent implements OnInit {
    softSkill: ISoftSkill;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ softSkill }) => {
            this.softSkill = softSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
