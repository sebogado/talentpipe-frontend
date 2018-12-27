/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchRequestDeleteDialogComponent } from 'app/entities/search-request/search-request-delete-dialog.component';
import { SearchRequestService } from 'app/entities/search-request/search-request.service';

describe('Component Tests', () => {
    describe('SearchRequest Management Delete Component', () => {
        let comp: SearchRequestDeleteDialogComponent;
        let fixture: ComponentFixture<SearchRequestDeleteDialogComponent>;
        let service: SearchRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchRequestDeleteDialogComponent]
            })
                .overrideTemplate(SearchRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchRequestService);
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
