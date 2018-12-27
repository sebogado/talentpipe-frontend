/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { ExpertiseLevelComponent } from 'app/entities/expertise-level/expertise-level.component';
import { ExpertiseLevelService } from 'app/entities/expertise-level/expertise-level.service';
import { ExpertiseLevel } from 'app/shared/model/expertise-level.model';

describe('Component Tests', () => {
    describe('ExpertiseLevel Management Component', () => {
        let comp: ExpertiseLevelComponent;
        let fixture: ComponentFixture<ExpertiseLevelComponent>;
        let service: ExpertiseLevelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [ExpertiseLevelComponent],
                providers: []
            })
                .overrideTemplate(ExpertiseLevelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ExpertiseLevelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpertiseLevelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ExpertiseLevel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.expertiseLevels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
