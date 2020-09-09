import React, { memo } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

interface Props extends RouteProps {
  authService: Auth;
  computedMatch: any;
}
const ProtectedRoute = (props: Props): JSX.Element => {
  const {
    authService,
    computedMatch: {
      params: { organizationId }
    }
  } = props;

  const hasAnyPermission =
    authService.hasOrganizationWritePermission(organizationId) ||
    authService.hasOrganizationReadPermission(organizationId);

  return hasAnyPermission ? <Route {...props} /> : <Redirect to='/login' />;
};

export default memo(withAuth(ProtectedRoute));
