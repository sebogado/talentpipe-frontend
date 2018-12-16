/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { WorkTypeComponent } from 'app/entities/work-type/work-type.component';
import { WorkTypeService } from 'app/entities/work-type/work-type.service';
import { WorkType } from 'app/shared/model/work-type.model';

describe('Component Tests', () => {
    describe('WorkType Management Component', () => {
        let comp: WorkTypeComponent;
        let fixture: ComponentFixture<WorkTypeComponent>;
        let service: WorkTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [WorkTypeComponent],
                providers: []
            })
                .overrideTemplate(WorkTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WorkType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.workTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
