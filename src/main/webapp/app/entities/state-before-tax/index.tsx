import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StateBeforeTax from './state-before-tax';
import StateBeforeTaxDetail from './state-before-tax-detail';
import StateBeforeTaxUpdate from './state-before-tax-update';
import StateBeforeTaxDeleteDialog from './state-before-tax-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StateBeforeTaxUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StateBeforeTaxUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StateBeforeTaxDetail} />
      <ErrorBoundaryRoute path={match.url} component={StateBeforeTax} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StateBeforeTaxDeleteDialog} />
  </>
);

export default Routes;
