/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchRequestUpdateComponent } from 'app/entities/search-request/search-request-update.component';
import { SearchRequestService } from 'app/entities/search-request/search-request.service';
import { SearchRequest } from 'app/shared/model/search-request.model';

describe('Component Tests', () => {
    describe('SearchRequest Management Update Component', () => {
        let comp: SearchRequestUpdateComponent;
        let fixture: ComponentFixture<SearchRequestUpdateComponent>;
        let service: SearchRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchRequestUpdateComponent]
            })
                .overrideTemplate(SearchRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SearchRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchRequestService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchRequest(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchRequest = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SearchRequest();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.searchRequest = entity;
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
