/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { StateBeforeTaxUpdateComponent } from 'app/entities/state-before-tax/state-before-tax-update.component';
import { StateBeforeTaxService } from 'app/entities/state-before-tax/state-before-tax.service';
import { StateBeforeTax } from 'app/shared/model/state-before-tax.model';

describe('Component Tests', () => {
    describe('StateBeforeTax Management Update Component', () => {
        let comp: StateBeforeTaxUpdateComponent;
        let fixture: ComponentFixture<StateBeforeTaxUpdateComponent>;
        let service: StateBeforeTaxService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [StateBeforeTaxUpdateComponent]
            })
                .overrideTemplate(StateBeforeTaxUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StateBeforeTaxUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateBeforeTaxService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StateBeforeTax(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stateBeforeTax = entity;
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
                    const entity = new StateBeforeTax();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stateBeforeTax = entity;
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
