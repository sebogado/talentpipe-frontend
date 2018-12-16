/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { WorkTypeDetailComponent } from 'app/entities/work-type/work-type-detail.component';
import { WorkType } from 'app/shared/model/work-type.model';

describe('Component Tests', () => {
    describe('WorkType Management Detail Component', () => {
        let comp: WorkTypeDetailComponent;
        let fixture: ComponentFixture<WorkTypeDetailComponent>;
        const route = ({ data: of({ workType: new WorkType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [WorkTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WorkTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.workType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
