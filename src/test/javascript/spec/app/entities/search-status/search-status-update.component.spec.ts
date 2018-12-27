/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchStatusUpdateComponent } from 'app/entities/search-status/search-status-update.component';
import { SearchStatusService } from 'app/entities/search-status/search-status.service';
import { SearchStatus } from 'app/shared/model/search-status.model';

describe('Component Tests', () => {
    describe('SearchStatus Management Update Component', () => {
        let comp: SearchStatusUpdateComponent;
        let fixture: ComponentFixture<SearchStatusUpdateComponent>;
        let service: SearchStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchStatusUpdateComponent]
            })
                .overrideTemplate(SearchStatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SearchStatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchStatusService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchStatus(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchStatus = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchStatus();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchStatus = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
