import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompanyType from './company-type';
import CompanyTypeDetail from './company-type-detail';
import CompanyTypeUpdate from './company-type-update';
import CompanyTypeDeleteDialog from './company-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompanyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompanyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompanyTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompanyType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CompanyTypeDeleteDialog} />
  </>
);

export default Routes;
