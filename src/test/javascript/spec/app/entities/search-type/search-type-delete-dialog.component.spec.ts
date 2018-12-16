/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchTypeDeleteDialogComponent } from 'app/entities/search-type/search-type-delete-dialog.component';
import { SearchTypeService } from 'app/entities/search-type/search-type.service';

describe('Component Tests', () => {
    describe('SearchType Management Delete Component', () => {
        let comp: SearchTypeDeleteDialogComponent;
        let fixture: ComponentFixture<SearchTypeDeleteDialogComponent>;
        let service: SearchTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchTypeDeleteDialogComponent]
            })
                .overrideTemplate(SearchTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchTypeService);
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
