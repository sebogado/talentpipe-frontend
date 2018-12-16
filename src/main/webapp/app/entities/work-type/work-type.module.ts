import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TalentpipeFrontendSharedModule } from 'app/shared';
import {
    WorkTypeComponent,
    WorkTypeDetailComponent,
    WorkTypeUpdateComponent,
    WorkTypeDeletePopupComponent,
    WorkTypeDeleteDialogComponent,
    workTypeRoute,
    workTypePopupRoute
} from './';

const ENTITY_STATES = [...workTypeRoute, ...workTypePopupRoute];

@NgModule({
    imports: [TalentpipeFrontendSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WorkTypeComponent,
        WorkTypeDetailComponent,
        WorkTypeUpdateComponent,
        WorkTypeDeleteDialogComponent,
        WorkTypeDeletePopupComponent
    ],
    entryComponents: [WorkTypeComponent, WorkTypeUpdateComponent, WorkTypeDeleteDialogComponent, WorkTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendWorkTypeModule {}
