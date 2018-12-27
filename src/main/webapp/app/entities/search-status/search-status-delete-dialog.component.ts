import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISearchStatus } from 'app/shared/model/search-status.model';
import { SearchStatusService } from './search-status.service';

@Component({
    selector: 'jhi-search-status-delete-dialog',
    templateUrl: './search-status-delete-dialog.component.html'
})
export class SearchStatusDeleteDialogComponent {
    searchStatus: ISearchStatus;

    constructor(
        private searchStatusService: SearchStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.searchStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'searchStatusListModification',
                content: 'Deleted an searchStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-search-status-delete-popup',
    template: ''
})
export class SearchStatusDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchStatus }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SearchStatusDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.searchStatus = searchStatus;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
