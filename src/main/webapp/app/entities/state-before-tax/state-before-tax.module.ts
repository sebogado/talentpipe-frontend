import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    StateBeforeTaxComponent,
    StateBeforeTaxDetailComponent,
    StateBeforeTaxUpdateComponent,
    StateBeforeTaxDeletePopupComponent,
    StateBeforeTaxDeleteDialogComponent,
    stateBeforeTaxRoute,
    stateBeforeTaxPopupRoute
} from './';

const ENTITY_STATES = [...stateBeforeTaxRoute, ...stateBeforeTaxPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StateBeforeTaxComponent,
        StateBeforeTaxDetailComponent,
        StateBeforeTaxUpdateComponent,
        StateBeforeTaxDeleteDialogComponent,
        StateBeforeTaxDeletePopupComponent
    ],
    entryComponents: [
        StateBeforeTaxComponent,
        StateBeforeTaxUpdateComponent,
        StateBeforeTaxDeleteDialogComponent,
        StateBeforeTaxDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendStateBeforeTaxModule {}
