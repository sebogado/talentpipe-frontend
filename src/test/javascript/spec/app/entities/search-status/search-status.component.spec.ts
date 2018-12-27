/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchStatusComponent } from 'app/entities/search-status/search-status.component';
import { SearchStatusService } from 'app/entities/search-status/search-status.service';
import { SearchStatus } from 'app/shared/model/search-status.model';

describe('Component Tests', () => {
    describe('SearchStatus Management Component', () => {
        let comp: SearchStatusComponent;
        let fixture: ComponentFixture<SearchStatusComponent>;
        let service: SearchStatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchStatusComponent],
                providers: []
            })
                .overrideTemplate(SearchStatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SearchStatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SearchStatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SearchStatus(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.searchStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
