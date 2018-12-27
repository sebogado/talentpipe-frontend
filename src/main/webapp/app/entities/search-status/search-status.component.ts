import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISearchStatus } from 'app/shared/model/search-status.model';
import { Principal } from 'app/core';
import { SearchStatusService } from './search-status.service';

@Component({
    selector: 'jhi-search-status',
    templateUrl: './search-status.component.html'
})
export class SearchStatusComponent implements OnInit, OnDestroy {
    searchStatuses: ISearchStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private searchStatusService: SearchStatusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.searchStatusService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ISearchStatus[]>) => (this.searchStatuses = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.searchStatusService.query().subscribe(
            (res: HttpResponse<ISearchStatus[]>) => {
                this.searchStatuses = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSearchStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISearchStatus) {
        return item.id;
    }

    registerChangeInSearchStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('searchStatusListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
