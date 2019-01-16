import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    TalentpipeFrontendSharedLibsModule,
    TalentpipeFrontendSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [TalentpipeFrontendSharedLibsModule, TalentpipeFrontendSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        TalentpipeFrontendSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FileUploadModule,
        AutoCompleteModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendSharedModule {
    static forRoot() {
        return {
            ngModule: TalentpipeFrontendSharedModule
        };
    }
}
