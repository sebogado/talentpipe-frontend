import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpertiseLevel } from 'app/shared/model/expertise-level.model';
import { Principal } from 'app/core';
import { ExpertiseLevelService } from './expertise-level.service';

@Component({
    selector: 'jhi-expertise-level',
    templateUrl: './expertise-level.component.html'
})
export class ExpertiseLevelComponent implements OnInit, OnDestroy {
    expertiseLevels: IExpertiseLevel[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private expertiseLevelService: ExpertiseLevelService,
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
            this.expertiseLevelService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IExpertiseLevel[]>) => (this.expertiseLevels = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.expertiseLevelService.query().subscribe(
            (res: HttpResponse<IExpertiseLevel[]>) => {
                this.expertiseLevels = res.body;
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
        this.registerChangeInExpertiseLevels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExpertiseLevel) {
        return item.id;
    }

    registerChangeInExpertiseLevels() {
        this.eventSubscriber = this.eventManager.subscribe('expertiseLevelListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
