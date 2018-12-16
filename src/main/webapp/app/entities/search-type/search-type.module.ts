import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    SearchTypeComponent,
    SearchTypeDetailComponent,
    SearchTypeUpdateComponent,
    SearchTypeDeletePopupComponent,
    SearchTypeDeleteDialogComponent,
    searchTypeRoute,
    searchTypePopupRoute
} from './';

const ENTITY_STATES = [...searchTypeRoute, ...searchTypePopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SearchTypeComponent,
        SearchTypeDetailComponent,
        SearchTypeUpdateComponent,
        SearchTypeDeleteDialogComponent,
        SearchTypeDeletePopupComponent
    ],
    entryComponents: [SearchTypeComponent, SearchTypeUpdateComponent, SearchTypeDeleteDialogComponent, SearchTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendSearchTypeModule {}
