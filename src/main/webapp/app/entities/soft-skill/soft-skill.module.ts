import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    SoftSkillComponent,
    SoftSkillDetailComponent,
    SoftSkillUpdateComponent,
    SoftSkillDeletePopupComponent,
    SoftSkillDeleteDialogComponent,
    softSkillRoute,
    softSkillPopupRoute
} from './';

const ENTITY_STATES = [...softSkillRoute, ...softSkillPopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SoftSkillComponent,
        SoftSkillDetailComponent,
        SoftSkillUpdateComponent,
        SoftSkillDeleteDialogComponent,
        SoftSkillDeletePopupComponent
    ],
    entryComponents: [SoftSkillComponent, SoftSkillUpdateComponent, SoftSkillDeleteDialogComponent, SoftSkillDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendSoftSkillModule {}
