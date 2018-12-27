/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { ExpertiseLevelUpdateComponent } from 'app/entities/expertise-level/expertise-level-update.component';
import { ExpertiseLevelService } from 'app/entities/expertise-level/expertise-level.service';
import { ExpertiseLevel } from 'app/shared/model/expertise-level.model';

describe('Component Tests', () => {
    describe('ExpertiseLevel Management Update Component', () => {
        let comp: ExpertiseLevelUpdateComponent;
        let fixture: ComponentFixture<ExpertiseLevelUpdateComponent>;
        let service: ExpertiseLevelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [ExpertiseLevelUpdateComponent]
            })
                .overrideTemplate(ExpertiseLevelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpertiseLevelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpertiseLevelService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpertiseLevel(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expertiseLevel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ExpertiseLevel();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.expertiseLevel = entity;
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
