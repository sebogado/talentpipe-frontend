import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';

@Component({
    selector: 'jhi-technical-skill-detail',
    templateUrl: './technical-skill-detail.component.html'
})
export class TechnicalSkillDetailComponent implements OnInit {
    technicalSkill: ITechnicalSkill;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ technicalSkill }) => {
            this.technicalSkill = technicalSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
