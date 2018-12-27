/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { ExpertiseLevelDetailComponent } from 'app/entities/expertise-level/expertise-level-detail.component';
import { ExpertiseLevel } from 'app/shared/model/expertise-level.model';

describe('Component Tests', () => {
    describe('ExpertiseLevel Management Detail Component', () => {
        let comp: ExpertiseLevelDetailComponent;
        let fixture: ComponentFixture<ExpertiseLevelDetailComponent>;
        const route = ({ data: of({ expertiseLevel: new ExpertiseLevel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [ExpertiseLevelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ExpertiseLevelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ExpertiseLevelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.expertiseLevel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
