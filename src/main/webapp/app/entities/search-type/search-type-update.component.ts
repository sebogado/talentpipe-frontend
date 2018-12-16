import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISearchType } from 'app/shared/model/search-type.model';
import { SearchTypeService } from './search-type.service';

@Component({
    selector: 'jhi-search-type-update',
    templateUrl: './search-type-update.component.html'
})
export class SearchTypeUpdateComponent implements OnInit {
    searchType: ISearchType;
    isSaving: boolean;

    constructor(private searchTypeService: SearchTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ searchType }) => {
            this.searchType = searchType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.searchType.id !== undefined) {
            this.subscribeToSaveResponse(this.searchTypeService.update(this.searchType));
        } else {
            this.subscribeToSaveResponse(this.searchTypeService.create(this.searchType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISearchType>>) {
        result.subscribe((res: HttpResponse<ISearchType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
