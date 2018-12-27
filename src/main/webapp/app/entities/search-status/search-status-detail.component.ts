import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISearchStatus } from 'app/shared/model/search-status.model';

@Component({
    selector: 'jhi-search-status-detail',
    templateUrl: './search-status-detail.component.html'
})
export class SearchStatusDetailComponent implements OnInit {
    searchStatus: ISearchStatus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchStatus }) => {
            this.searchStatus = searchStatus;
        });
    }

    previousState() {
        window.history.back();
    }
}
