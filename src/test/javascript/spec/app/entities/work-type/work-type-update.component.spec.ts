/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { WorkTypeUpdateComponent } from 'app/entities/work-type/work-type-update.component';
import { WorkTypeService } from 'app/entities/work-type/work-type.service';
import { WorkType } from 'app/shared/model/work-type.model';

describe('Component Tests', () => {
    describe('WorkType Management Update Component', () => {
        let comp: WorkTypeUpdateComponent;
        let fixture: ComponentFixture<WorkTypeUpdateComponent>;
        let service: WorkTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [WorkTypeUpdateComponent]
            })
                .overrideTemplate(WorkTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WorkType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.workType = entity;
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
                    const entity = new WorkType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.workType = entity;
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
