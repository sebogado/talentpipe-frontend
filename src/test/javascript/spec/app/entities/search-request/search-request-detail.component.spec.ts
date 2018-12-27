/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchRequestDetailComponent } from 'app/entities/search-request/search-request-detail.component';
import { SearchRequest } from 'app/shared/model/search-request.model';

describe('Component Tests', () => {
    describe('SearchRequest Management Detail Component', () => {
        let comp: SearchRequestDetailComponent;
        let fixture: ComponentFixture<SearchRequestDetailComponent>;
        const route = ({ data: of({ searchRequest: new SearchRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SearchRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.searchRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
