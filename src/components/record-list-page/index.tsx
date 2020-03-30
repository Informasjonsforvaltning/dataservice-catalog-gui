import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withDataServices, {
  Props as DataServicesProps
} from '../with-dataservices';

import IconAdd from '../../images/icon-add-cicle-sm-negative.svg';

import Headline from '../headline';
import FDKButton from '../fdk-button';
import BreadcrumbsBar from '../breadcrumbs-bar';
import RecordListTable from '../record-list-table';

import SC from './styled';

import { DataService } from '../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
}

// interface Props
//   extends RecordsProps,
//     OrganizationProps,
//     RouteComponentProps<RouteParams> {
//   records: Record[];
// }

interface Props
  extends DataServicesProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  dataServices: DataService[];
}

const RecordListPage = ({
  dataServices,
  organization,
  history: { push },
  match: {
    params: { organizationId }
  },
  dataServicesActions: { fetchAllDataServicesRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllDataServicesRequested(organizationId);
    }
  }, [organizationId]);

  const navigateToReportPage = () => push(`/${organizationId}/report`);
  const navigateToNewRecordPage = () => push(`/${organizationId}/records`);

  return (
    <SC.RecordListPage>
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
      <SC.RecordListActions>
        <FDKButton
          icon={IconAdd}
          variant='default'
          text='Legg til datatjenestebeskrivelse'
          onClick={navigateToNewRecordPage}
        />
        <FDKButton
          icon={IconAdd}
          variant='secondary'
          text='Høst spesifikasjon fra katalog'
          onClick={navigateToReportPage}
        />
      </SC.RecordListActions>
      <RecordListTable dataServices={dataServices} />
    </SC.RecordListPage>
  );
};

export default memo(withDataServices(withOrganization(RecordListPage)));
