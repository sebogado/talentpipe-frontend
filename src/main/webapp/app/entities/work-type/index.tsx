import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WorkType from './work-type';
import WorkTypeDetail from './work-type-detail';
import WorkTypeUpdate from './work-type-update';
import WorkTypeDeleteDialog from './work-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WorkTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WorkTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WorkTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={WorkType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={WorkTypeDeleteDialog} />
  </>
);

export default Routes;
