import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';
import { TechnicalSkillService } from './technical-skill.service';

@Component({
    selector: 'jhi-technical-skill-delete-dialog',
    templateUrl: './technical-skill-delete-dialog.component.html'
})
export class TechnicalSkillDeleteDialogComponent {
    technicalSkill: ITechnicalSkill;

    constructor(
        private technicalSkillService: TechnicalSkillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.technicalSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'technicalSkillListModification',
                content: 'Deleted an technicalSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-technical-skill-delete-popup',
    template: ''
})
export class TechnicalSkillDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ technicalSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TechnicalSkillDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.technicalSkill = technicalSkill;
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
