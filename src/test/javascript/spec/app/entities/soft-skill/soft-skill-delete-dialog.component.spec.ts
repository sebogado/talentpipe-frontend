/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SoftSkillDeleteDialogComponent } from 'app/entities/soft-skill/soft-skill-delete-dialog.component';
import { SoftSkillService } from 'app/entities/soft-skill/soft-skill.service';

describe('Component Tests', () => {
    describe('SoftSkill Management Delete Component', () => {
        let comp: SoftSkillDeleteDialogComponent;
        let fixture: ComponentFixture<SoftSkillDeleteDialogComponent>;
        let service: SoftSkillService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SoftSkillDeleteDialogComponent]
            })
                .overrideTemplate(SoftSkillDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SoftSkillDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SoftSkillService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
