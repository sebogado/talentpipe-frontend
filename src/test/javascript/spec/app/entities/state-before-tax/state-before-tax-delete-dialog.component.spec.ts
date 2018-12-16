/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { StateBeforeTaxDeleteDialogComponent } from 'app/entities/state-before-tax/state-before-tax-delete-dialog.component';
import { StateBeforeTaxService } from 'app/entities/state-before-tax/state-before-tax.service';

describe('Component Tests', () => {
    describe('StateBeforeTax Management Delete Component', () => {
        let comp: StateBeforeTaxDeleteDialogComponent;
        let fixture: ComponentFixture<StateBeforeTaxDeleteDialogComponent>;
        let service: StateBeforeTaxService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [StateBeforeTaxDeleteDialogComponent]
            })
                .overrideTemplate(StateBeforeTaxDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StateBeforeTaxDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateBeforeTaxService);
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
