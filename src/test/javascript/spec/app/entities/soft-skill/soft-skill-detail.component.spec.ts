/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SoftSkillDetailComponent } from 'app/entities/soft-skill/soft-skill-detail.component';
import { SoftSkill } from 'app/shared/model/soft-skill.model';

describe('Component Tests', () => {
    describe('SoftSkill Management Detail Component', () => {
        let comp: SoftSkillDetailComponent;
        let fixture: ComponentFixture<SoftSkillDetailComponent>;
        const route = ({ data: of({ softSkill: new SoftSkill(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SoftSkillDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SoftSkillDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SoftSkillDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.softSkill).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
