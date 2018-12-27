import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';

@Component({
    selector: 'jhi-expertise-level-detail',
    templateUrl: './expertise-level-detail.component.html'
})
export class ExpertiseLevelDetailComponent implements OnInit {
    expertiseLevel: IExpertiseLevel;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expertiseLevel }) => {
            this.expertiseLevel = expertiseLevel;
        });
    }

    previousState() {
        window.history.back();
    }
}
