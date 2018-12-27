import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    SearchRequestComponent,
    SearchRequestDetailComponent,
    SearchRequestUpdateComponent,
    SearchRequestDeletePopupComponent,
    SearchRequestDeleteDialogComponent,
    searchRequestRoute,
    searchRequestPopupRoute
} from './';

const ENTITY_STATES = [...searchRequestRoute, ...searchRequestPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SearchRequestComponent,
        SearchRequestDetailComponent,
        SearchRequestUpdateComponent,
        SearchRequestDeleteDialogComponent,
        SearchRequestDeletePopupComponent
    ],
    entryComponents: [
        SearchRequestComponent,
        SearchRequestUpdateComponent,
        SearchRequestDeleteDialogComponent,
        SearchRequestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendSearchRequestModule {}
