import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TechnicalSkill from './technical-skill';
import TechnicalSkillDetail from './technical-skill-detail';
import TechnicalSkillUpdate from './technical-skill-update';
import TechnicalSkillDeleteDialog from './technical-skill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TechnicalSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TechnicalSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TechnicalSkillDetail} />
      <ErrorBoundaryRoute path={match.url} component={TechnicalSkill} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TechnicalSkillDeleteDialog} />
  </>
);

export default Routes;
