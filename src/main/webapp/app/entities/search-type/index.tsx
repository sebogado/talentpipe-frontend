import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SearchType from './search-type';
import SearchTypeDetail from './search-type-detail';
import SearchTypeUpdate from './search-type-update';
import SearchTypeDeleteDialog from './search-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SearchTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SearchTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SearchTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={SearchType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SearchTypeDeleteDialog} />
  </>
);

export default Routes;
