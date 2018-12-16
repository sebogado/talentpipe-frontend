import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchType } from 'app/shared/model/search-type.model';

@Component({
    selector: 'jhi-search-type-detail',
    templateUrl: './search-type-detail.component.html'
})
export class SearchTypeDetailComponent implements OnInit {
    searchType: ISearchType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchType }) => {
            this.searchType = searchType;
        });
    }

    previousState() {
        window.history.back();
    }
}
