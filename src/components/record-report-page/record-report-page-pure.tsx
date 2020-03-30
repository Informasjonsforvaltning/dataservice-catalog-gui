import React, { useEffect, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';

import withDataServices, { Props as RecordsProps } from '../with-dataservices';

import SC from './styled';
import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
// import { RecordItem } from './record-item';
import { RepresentativesInterface } from '../../types';
import { localization } from '../../lib/localization';
import { fetchAllRepresentativesRequested } from '../representatives/redux/actions';
import { ReportRepresentatives } from './report-representatives';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends RecordsProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {
  representatives: RepresentativesInterface;
  fetchAllRepresentatives: typeof fetchAllRepresentativesRequested;
}

const { FDK_REGISTRATION_BASE_URI } = env;

const RecordReportPage = ({
  // records,
  organization,
  representatives,
  match: {
    params: { organizationId }
  },
  fetchAllRepresentatives,
  organizationActions: { fetchOrganizationRequested },
  dataServicesActions: { fetchAllDataServicesRequested }
}: Props): JSX.Element => {
  useEffect(() => {
    if (organizationId) {
      fetchAllDataServicesRequested(organizationId);
      fetchAllRepresentatives(organizationId);
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  return (
    <SC.RecordReportPage>
      <BreadcrumbsBar
        breadcrumbs={[
          {
            title: 'Alle kataloger',
            url: FDK_REGISTRATION_BASE_URI
          },
          {
            title: 'Datatjenestekatalog',
            url: `${location.origin}/${organizationId}`
          },
          {
            title: 'Rapport',
            current: true
          }
        ]}
      />
      <Headline
        title={localization.protocol}
        subTitle={organization?.name ?? ''}
      />

      <ReportRepresentatives representatives={representatives} />

      <SC.RecordReportList>
        {/* {records.map(record => (
          <RecordItem key={record.id} record={record} />
        ))} */}
      </SC.RecordReportList>
    </SC.RecordReportPage>
  );
};

export default memo(withDataServices(withOrganization(RecordReportPage)));
