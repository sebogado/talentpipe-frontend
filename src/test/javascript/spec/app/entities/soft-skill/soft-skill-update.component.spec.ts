/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SoftSkillUpdateComponent } from 'app/entities/soft-skill/soft-skill-update.component';
import { SoftSkillService } from 'app/entities/soft-skill/soft-skill.service';
import { SoftSkill } from 'app/shared/model/soft-skill.model';

describe('Component Tests', () => {
    describe('SoftSkill Management Update Component', () => {
        let comp: SoftSkillUpdateComponent;
        let fixture: ComponentFixture<SoftSkillUpdateComponent>;
        let service: SoftSkillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SoftSkillUpdateComponent]
            })
                .overrideTemplate(SoftSkillUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SoftSkillUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SoftSkillService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SoftSkill(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.softSkill = entity;
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
                    const entity = new SoftSkill();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.softSkill = entity;
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
