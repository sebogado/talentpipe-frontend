/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchTypeUpdateComponent } from 'app/entities/search-type/search-type-update.component';
import { SearchTypeService } from 'app/entities/search-type/search-type.service';
import { SearchType } from 'app/shared/model/search-type.model';

describe('Component Tests', () => {
    describe('SearchType Management Update Component', () => {
        let comp: SearchTypeUpdateComponent;
        let fixture: ComponentFixture<SearchTypeUpdateComponent>;
        let service: SearchTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchTypeUpdateComponent]
            })
                .overrideTemplate(SearchTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SearchTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SearchType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.searchType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SearchType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.searchType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
