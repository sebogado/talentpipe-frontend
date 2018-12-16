/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchTypeDetailComponent } from 'app/entities/search-type/search-type-detail.component';
import { SearchType } from 'app/shared/model/search-type.model';

describe('Component Tests', () => {
    describe('SearchType Management Detail Component', () => {
        let comp: SearchTypeDetailComponent;
        let fixture: ComponentFixture<SearchTypeDetailComponent>;
        const route = ({ data: of({ searchType: new SearchType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SearchTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.searchType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
