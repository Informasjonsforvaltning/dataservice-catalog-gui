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

import IconAdd from '../../images/icon-add-cicle-sm-negative.svg';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import DataServiceListTable from '../data-service-list-table';

import SC from './styled';

import { DataService } from '../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

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
  history: { push },
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

  const navigateToNewDataServicePage = () =>
    push(`/${organizationId}/data-services`);

  return (
    <SC.DataServiceListPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI
          },
          { title: 'Datatjenestekatalog', current: true }
        ]}
      />
      <Headline
        title='Datatjenestekatalog'
        subTitle={organization?.name ?? ''}
      />
      <SC.DataServiceListActions>
        <FDKButton
          icon={IconAdd}
          variant='default'
          text='Legg til datatjenestebeskrivelse'
          onClick={navigateToNewDataServicePage}
        />
        {/*        <FDKButton
          icon={IconAdd}
          variant='secondary'
          text='Høst spesifikasjon fra katalog'
        /> */}
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
