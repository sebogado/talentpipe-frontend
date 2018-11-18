import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import area, {
  AreaState
} from 'app/entities/area/area.reducer';
// prettier-ignore
import benefit, {
  BenefitState
} from 'app/entities/benefit/benefit.reducer';
// prettier-ignore
import companyType, {
  CompanyTypeState
} from 'app/entities/company-type/company-type.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import searchType, {
  SearchTypeState
} from 'app/entities/search-type/search-type.reducer';
// prettier-ignore
import sector, {
  SectorState
} from 'app/entities/sector/sector.reducer';
// prettier-ignore
import softSkill, {
  SoftSkillState
} from 'app/entities/soft-skill/soft-skill.reducer';
// prettier-ignore
import stateBeforeTax, {
  StateBeforeTaxState
} from 'app/entities/state-before-tax/state-before-tax.reducer';
// prettier-ignore
import technicalSkill, {
  TechnicalSkillState
} from 'app/entities/technical-skill/technical-skill.reducer';
// prettier-ignore
import workType, {
  WorkTypeState
} from 'app/entities/work-type/work-type.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import recruiter, {
  RecruiterState
} from 'app/entities/recruiter/recruiter.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly area: AreaState;
  readonly benefit: BenefitState;
  readonly companyType: CompanyTypeState;
  readonly country: CountryState;
  readonly searchType: SearchTypeState;
  readonly sector: SectorState;
  readonly softSkill: SoftSkillState;
  readonly stateBeforeTax: StateBeforeTaxState;
  readonly technicalSkill: TechnicalSkillState;
  readonly workType: WorkTypeState;
  readonly city: CityState;
  readonly company: CompanyState;
  readonly recruiter: RecruiterState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  area,
  benefit,
  companyType,
  country,
  searchType,
  sector,
  softSkill,
  stateBeforeTax,
  technicalSkill,
  workType,
  city,
  company,
  recruiter,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
