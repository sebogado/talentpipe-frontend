import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';

@Component({
    selector: 'jhi-state-before-tax-detail',
    templateUrl: './state-before-tax-detail.component.html'
})
export class StateBeforeTaxDetailComponent implements OnInit {
    stateBeforeTax: IStateBeforeTax;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stateBeforeTax }) => {
            this.stateBeforeTax = stateBeforeTax;
        });
    }

    previousState() {
        window.history.back();
    }
}
