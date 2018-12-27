import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    ExpertiseLevelComponent,
    ExpertiseLevelDetailComponent,
    ExpertiseLevelUpdateComponent,
    ExpertiseLevelDeletePopupComponent,
    ExpertiseLevelDeleteDialogComponent,
    expertiseLevelRoute,
    expertiseLevelPopupRoute
} from './';

const ENTITY_STATES = [...expertiseLevelRoute, ...expertiseLevelPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpertiseLevelComponent,
        ExpertiseLevelDetailComponent,
        ExpertiseLevelUpdateComponent,
        ExpertiseLevelDeleteDialogComponent,
        ExpertiseLevelDeletePopupComponent
    ],
    entryComponents: [
        ExpertiseLevelComponent,
        ExpertiseLevelUpdateComponent,
        ExpertiseLevelDeleteDialogComponent,
        ExpertiseLevelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendExpertiseLevelModule {}
