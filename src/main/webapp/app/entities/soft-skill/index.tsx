import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SoftSkill from './soft-skill';
import SoftSkillDetail from './soft-skill-detail';
import SoftSkillUpdate from './soft-skill-update';
import SoftSkillDeleteDialog from './soft-skill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SoftSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SoftSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SoftSkillDetail} />
      <ErrorBoundaryRoute path={match.url} component={SoftSkill} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SoftSkillDeleteDialog} />
  </>
);

export default Routes;
