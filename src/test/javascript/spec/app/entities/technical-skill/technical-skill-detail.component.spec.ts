/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { TechnicalSkillDetailComponent } from 'app/entities/technical-skill/technical-skill-detail.component';
import { TechnicalSkill } from 'app/shared/model/technical-skill.model';

describe('Component Tests', () => {
    describe('TechnicalSkill Management Detail Component', () => {
        let comp: TechnicalSkillDetailComponent;
        let fixture: ComponentFixture<TechnicalSkillDetailComponent>;
        const route = ({ data: of({ technicalSkill: new TechnicalSkill(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [TechnicalSkillDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TechnicalSkillDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TechnicalSkillDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.technicalSkill).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
