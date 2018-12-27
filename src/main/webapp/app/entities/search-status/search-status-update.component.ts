import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISearchStatus } from 'app/shared/model/search-status.model';
import { SearchStatusService } from './search-status.service';

@Component({
    selector: 'jhi-search-status-update',
    templateUrl: './search-status-update.component.html'
})
export class SearchStatusUpdateComponent implements OnInit {
    searchStatus: ISearchStatus;
    isSaving: boolean;

    constructor(private searchStatusService: SearchStatusService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ searchStatus }) => {
            this.searchStatus = searchStatus;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.searchStatus.id !== undefined) {
            this.subscribeToSaveResponse(this.searchStatusService.update(this.searchStatus));
        } else {
            this.subscribeToSaveResponse(this.searchStatusService.create(this.searchStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISearchStatus>>) {
        result.subscribe((res: HttpResponse<ISearchStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
