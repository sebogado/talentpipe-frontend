/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchStatusDeleteDialogComponent } from 'app/entities/search-status/search-status-delete-dialog.component';
import { SearchStatusService } from 'app/entities/search-status/search-status.service';

describe('Component Tests', () => {
    describe('SearchStatus Management Delete Component', () => {
        let comp: SearchStatusDeleteDialogComponent;
        let fixture: ComponentFixture<SearchStatusDeleteDialogComponent>;
        let service: SearchStatusService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchStatusDeleteDialogComponent]
            })
                .overrideTemplate(SearchStatusDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchStatusDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchStatusService);
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
