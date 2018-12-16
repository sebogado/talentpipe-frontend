import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISoftSkill } from 'app/shared/model/soft-skill.model';
import { SoftSkillService } from './soft-skill.service';

@Component({
    selector: 'jhi-soft-skill-delete-dialog',
    templateUrl: './soft-skill-delete-dialog.component.html'
})
export class SoftSkillDeleteDialogComponent {
    softSkill: ISoftSkill;

    constructor(private softSkillService: SoftSkillService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.softSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'softSkillListModification',
                content: 'Deleted an softSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-soft-skill-delete-popup',
    template: ''
})
export class SoftSkillDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ softSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SoftSkillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.softSkill = softSkill;
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
