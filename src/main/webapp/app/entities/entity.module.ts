import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TalentpipeFrontendSectorModule } from './sector/sector.module';
import { TalentpipeFrontendAreaModule } from './area/area.module';
import { TalentpipeFrontendBenefitModule } from './benefit/benefit.module';
import { TalentpipeFrontendCityModule } from './city/city.module';
import { TalentpipeFrontendCountryModule } from './country/country.module';
import { TalentpipeFrontendCompanyTypeModule } from './company-type/company-type.module';
import { TalentpipeFrontendSearchTypeModule } from './search-type/search-type.module';
import { TalentpipeFrontendSoftSkillModule } from './soft-skill/soft-skill.module';
import { TalentpipeFrontendStateBeforeTaxModule } from './state-before-tax/state-before-tax.module';
import { TalentpipeFrontendTechnicalSkillModule } from './technical-skill/technical-skill.module';
import { TalentpipeFrontendWorkTypeModule } from './work-type/work-type.module';
import { TalentpipeFrontendSearchStatusModule } from './search-status/search-status.module';
import { TalentpipeFrontendExpertiseLevelModule } from './expertise-level/expertise-level.module';
import { TalentpipeFrontendSearchRequestModule } from './search-request/search-request.module';
import { TalentpipeFrontendCompanyModule } from './company/company.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TalentpipeFrontendSectorModule,
        TalentpipeFrontendAreaModule,
        TalentpipeFrontendBenefitModule,
        TalentpipeFrontendCityModule,
        TalentpipeFrontendCountryModule,
        TalentpipeFrontendCompanyTypeModule,
        TalentpipeFrontendSearchTypeModule,
        TalentpipeFrontendSoftSkillModule,
        TalentpipeFrontendStateBeforeTaxModule,
        TalentpipeFrontendTechnicalSkillModule,
        TalentpipeFrontendWorkTypeModule,
        TalentpipeFrontendSearchStatusModule,
        TalentpipeFrontendExpertiseLevelModule,
        TalentpipeFrontendSearchRequestModule,
        TalentpipeFrontendCompanyModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TalentpipeFrontendEntityModule {}
