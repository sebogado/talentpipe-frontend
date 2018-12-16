/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { TechnicalSkillUpdateComponent } from 'app/entities/technical-skill/technical-skill-update.component';
import { TechnicalSkillService } from 'app/entities/technical-skill/technical-skill.service';
import { TechnicalSkill } from 'app/shared/model/technical-skill.model';

describe('Component Tests', () => {
    describe('TechnicalSkill Management Update Component', () => {
        let comp: TechnicalSkillUpdateComponent;
        let fixture: ComponentFixture<TechnicalSkillUpdateComponent>;
        let service: TechnicalSkillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [TechnicalSkillUpdateComponent]
            })
                .overrideTemplate(TechnicalSkillUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TechnicalSkillUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicalSkillService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TechnicalSkill(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.technicalSkill = entity;
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
                    const entity = new TechnicalSkill();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.technicalSkill = entity;
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
