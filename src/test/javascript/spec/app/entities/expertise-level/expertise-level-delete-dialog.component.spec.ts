/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { ExpertiseLevelDeleteDialogComponent } from 'app/entities/expertise-level/expertise-level-delete-dialog.component';
import { ExpertiseLevelService } from 'app/entities/expertise-level/expertise-level.service';

describe('Component Tests', () => {
    describe('ExpertiseLevel Management Delete Component', () => {
        let comp: ExpertiseLevelDeleteDialogComponent;
        let fixture: ComponentFixture<ExpertiseLevelDeleteDialogComponent>;
        let service: ExpertiseLevelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [ExpertiseLevelDeleteDialogComponent]
            })
                .overrideTemplate(ExpertiseLevelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpertiseLevelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpertiseLevelService);
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
