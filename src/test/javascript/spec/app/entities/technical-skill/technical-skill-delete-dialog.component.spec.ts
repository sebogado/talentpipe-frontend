/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { TechnicalSkillDeleteDialogComponent } from 'app/entities/technical-skill/technical-skill-delete-dialog.component';
import { TechnicalSkillService } from 'app/entities/technical-skill/technical-skill.service';

describe('Component Tests', () => {
    describe('TechnicalSkill Management Delete Component', () => {
        let comp: TechnicalSkillDeleteDialogComponent;
        let fixture: ComponentFixture<TechnicalSkillDeleteDialogComponent>;
        let service: TechnicalSkillService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [TechnicalSkillDeleteDialogComponent]
            })
                .overrideTemplate(TechnicalSkillDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TechnicalSkillDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicalSkillService);
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
