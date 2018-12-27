import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    SearchStatusComponent,
    SearchStatusDetailComponent,
    SearchStatusUpdateComponent,
    SearchStatusDeletePopupComponent,
    SearchStatusDeleteDialogComponent,
    searchStatusRoute,
    searchStatusPopupRoute
} from './';

const ENTITY_STATES = [...searchStatusRoute, ...searchStatusPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SearchStatusComponent,
        SearchStatusDetailComponent,
        SearchStatusUpdateComponent,
        SearchStatusDeleteDialogComponent,
        SearchStatusDeletePopupComponent
    ],
    entryComponents: [
        SearchStatusComponent,
        SearchStatusUpdateComponent,
        SearchStatusDeleteDialogComponent,
        SearchStatusDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendSearchStatusModule {}
