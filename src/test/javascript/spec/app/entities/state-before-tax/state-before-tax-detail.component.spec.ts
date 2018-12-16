/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { StateBeforeTaxDetailComponent } from 'app/entities/state-before-tax/state-before-tax-detail.component';
import { StateBeforeTax } from 'app/shared/model/state-before-tax.model';

describe('Component Tests', () => {
    describe('StateBeforeTax Management Detail Component', () => {
        let comp: StateBeforeTaxDetailComponent;
        let fixture: ComponentFixture<StateBeforeTaxDetailComponent>;
        const route = ({ data: of({ stateBeforeTax: new StateBeforeTax(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [StateBeforeTaxDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StateBeforeTaxDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StateBeforeTaxDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stateBeforeTax).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
