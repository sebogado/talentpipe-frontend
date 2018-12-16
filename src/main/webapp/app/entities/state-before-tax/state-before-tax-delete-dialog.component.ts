import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStateBeforeTax } from 'app/shared/model/state-before-tax.model';
import { StateBeforeTaxService } from './state-before-tax.service';

@Component({
    selector: 'jhi-state-before-tax-delete-dialog',
    templateUrl: './state-before-tax-delete-dialog.component.html'
})
export class StateBeforeTaxDeleteDialogComponent {
    stateBeforeTax: IStateBeforeTax;

    constructor(
        private stateBeforeTaxService: StateBeforeTaxService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateBeforeTaxService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stateBeforeTaxListModification',
                content: 'Deleted an stateBeforeTax'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-state-before-tax-delete-popup',
    template: ''
})
export class StateBeforeTaxDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stateBeforeTax }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StateBeforeTaxDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stateBeforeTax = stateBeforeTax;
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
