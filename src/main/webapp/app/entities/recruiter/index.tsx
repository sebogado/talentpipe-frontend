import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Recruiter from './recruiter';
import RecruiterDetail from './recruiter-detail';
import RecruiterUpdate from './recruiter-update';
import RecruiterDeleteDialog from './recruiter-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecruiterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecruiterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecruiterDetail} />
      <ErrorBoundaryRoute path={match.url} component={Recruiter} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RecruiterDeleteDialog} />
  </>
);

export default Routes;
