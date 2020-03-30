import React, { FC, lazy, Suspense, memo } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Root from '../root';
import Header from '../header';
import Footer from '../footer';

import ProtectedRoute from '../protected-route';

const DataServiceListPage = lazy(() => import('../data-service-list-page'));
const DataServicePage = lazy(() => import('../data-service-page'));

const Router: FC = () => (
  <BrowserRouter>
    <Root>
      <Header />
      <Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path='/:organizationId'
            component={DataServiceListPage}
          />
          <ProtectedRoute
            exact
            path='/:organizationId/data-services/:dataServiceId?'
            component={DataServicePage}
          />
          <Redirect to='/' />
        </Switch>
      </Suspense>
      <Footer />
    </Root>
  </BrowserRouter>
);

export default memo(Router);
