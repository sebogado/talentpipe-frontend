import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchRequest } from 'app/shared/model/search-request.model';

@Component({
    selector: 'jhi-search-request-detail',
    templateUrl: './search-request-detail.component.html'
})
export class SearchRequestDetailComponent implements OnInit {
    searchRequest: ISearchRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchRequest }) => {
            this.searchRequest = searchRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
