import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    TechnicalSkillComponent,
    TechnicalSkillDetailComponent,
    TechnicalSkillUpdateComponent,
    TechnicalSkillDeletePopupComponent,
    TechnicalSkillDeleteDialogComponent,
    technicalSkillRoute,
    technicalSkillPopupRoute
} from './';

const ENTITY_STATES = [...technicalSkillRoute, ...technicalSkillPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TechnicalSkillComponent,
        TechnicalSkillDetailComponent,
        TechnicalSkillUpdateComponent,
        TechnicalSkillDeleteDialogComponent,
        TechnicalSkillDeletePopupComponent
    ],
    entryComponents: [
        TechnicalSkillComponent,
        TechnicalSkillUpdateComponent,
        TechnicalSkillDeleteDialogComponent,
        TechnicalSkillDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendTechnicalSkillModule {}
