import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Area from './area';
import Benefit from './benefit';
import CompanyType from './company-type';
import Country from './country';
import SearchType from './search-type';
import Sector from './sector';
import SoftSkill from './soft-skill';
import StateBeforeTax from './state-before-tax';
import TechnicalSkill from './technical-skill';
import WorkType from './work-type';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/area`} component={Area} />
      <ErrorBoundaryRoute path={`${match.url}/benefit`} component={Benefit} />
      <ErrorBoundaryRoute path={`${match.url}/company-type`} component={CompanyType} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/search-type`} component={SearchType} />
      <ErrorBoundaryRoute path={`${match.url}/sector`} component={Sector} />
      <ErrorBoundaryRoute path={`${match.url}/soft-skill`} component={SoftSkill} />
      <ErrorBoundaryRoute path={`${match.url}/state-before-tax`} component={StateBeforeTax} />
      <ErrorBoundaryRoute path={`${match.url}/technical-skill`} component={TechnicalSkill} />
      <ErrorBoundaryRoute path={`${match.url}/work-type`} component={WorkType} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
