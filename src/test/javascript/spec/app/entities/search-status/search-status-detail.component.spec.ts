/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TalentpipeFrontendTestModule } from '../../../test.module';
import { SearchStatusDetailComponent } from 'app/entities/search-status/search-status-detail.component';
import { SearchStatus } from 'app/shared/model/search-status.model';

describe('Component Tests', () => {
    describe('SearchStatus Management Detail Component', () => {
        let comp: SearchStatusDetailComponent;
        let fixture: ComponentFixture<SearchStatusDetailComponent>;
        const route = ({ data: of({ searchStatus: new SearchStatus(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TalentpipeFrontendTestModule],
                declarations: [SearchStatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SearchStatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SearchStatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.searchStatus).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
