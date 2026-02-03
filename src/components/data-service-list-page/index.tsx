import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withDataServices, {
  Props as DataServicesProps
} from '../with-data-services';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import DataServiceListTable from '../data-service-list-table';

import SC from './styled';

import { DataService } from '../../types';
import AlertBox from '../alert-box';
import { AlertType } from '../../types/enums';

const { CATALOG_PORTAL_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

interface Props
  extends DataServicesProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  dataServices: DataService[];
}

const DataServiceListPage: FC<Props> = ({
  dataServices,
  organization,
  match: {
    params: { organizationId }
  },
  dataServicesActions: { fetchAllDataServicesRequested: fetchAllDataServices }
}) => {
  useEffect(() => {
    if (organizationId) {
      fetchAllDataServices(organizationId);
    }
  }, [organizationId]);

  return (
    <SC.DataServiceListPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: CATALOG_PORTAL_BASE_URI
          },
          { title: 'Datatjenestekatalog', current: true }
        ]}
      />
      <Headline
        title='Datatjenestekatalog'
        subTitle={organization?.name ?? ''}
      />
      <SC.DataServiceListActions>
        <AlertBox
          message='I forbindelse med oppdatering av katalogen er all skrivetilgang midlertidig deaktivert. Vi forventer at skrivetilgangen er tilgjengelig igjen innen 4. februar, kl. 15.00.'
          type={AlertType.WARNING}
        />
      </SC.DataServiceListActions>
      <DataServiceListTable dataServices={dataServices} />
    </SC.DataServiceListPage>
  );
};

export default compose<FC<any>>(
  memo,
  withDataServices,
  withOrganization
)(DataServiceListPage);
