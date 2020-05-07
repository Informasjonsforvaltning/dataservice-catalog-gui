import React, { FC, memo, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import env from '../../env';

import { authService } from '../../services/auth-service';

import withOrganization, {
  Props as OrganizationProps
} from '../with-organization';
import withDataService, {
  Props as DataServiceProps
} from '../with-data-service';

import Headline from '../headline';
import BreadcrumbsBar from '../breadcrumbs-bar';
import DataServiceForm from '../data-service-form';
import StatusBar from '../status-bar';

import SC from './styled';

import { Status } from '../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  organizationId: string;
  dataServiceId?: string;
}

interface Props
  extends OrganizationProps,
    DataServiceProps,
    RouteComponentProps<RouteParams> {}

const DataServicePage: FC<Props> = ({
  dataService,
  organization,
  history: { replace },
  match: {
    params: { organizationId, dataServiceId }
  },
  dataServiceActions: {
    getDataServiceRequested: getDataService,
    deleteDataServiceRequested: deleteDataService,
    resetDataService
  },
  organizationActions: { fetchOrganizationRequested }
}) => {
  const [dataServiceTitle, setDataServiceTitle] = useState('');
  const [dataServiceStatus, setDataServiceStatus] = useState(
    dataService?.status ?? Status.DRAFT
  );
  const [canChangeUrl, setCanChangeUrl] = useState(false);
  const [formIsValid, setFormValidity] = useState(false);

  const navigateToDataServiceListPage = () => replace(`/${organizationId}`);
  const id = dataService?.id;
  const isReadOnlyUser = authService.isReadOnlyUser(organizationId);

  useEffect(() => {
    if (organizationId) {
      fetchOrganizationRequested(organizationId);
    }
  }, [organizationId]);

  useEffect(() => {
    setCanChangeUrl(true);
    if (dataServiceId) {
      getDataService(
        dataServiceId,
        organizationId,
        navigateToDataServiceListPage
      );
    }
    window.scrollTo(0, 0);
    return function cleanup() {
      resetDataService();
    };
  }, []);

  useEffect(() => {
    if (!dataServiceId && id && canChangeUrl) {
      replace(`/${organizationId}/data-services/${id}`);
    }
    if (dataService?.status !== dataServiceStatus) {
      setDataServiceStatus(dataService?.status ?? Status.DRAFT);
    }
  }, [dataService]);

  const handleDataServiceStatusChange = (status: Status) => {
    if (formIsValid || status === Status.DRAFT) {
      setDataServiceStatus(status);
    }
  };

  return (
    <SC.DataServicePage>
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
            title: dataServiceTitle ?? 'Protokoll over behandlingsaktiviteter',
            current: true
          }
        ]}
      />
      <Headline
        title={dataServiceTitle}
        subTitle={organization?.name ?? ''}
        status={dataServiceStatus}
      />

      <DataServiceForm
        organizationId={organizationId}
        dataServiceStatus={dataServiceStatus}
        onTitleChange={setDataServiceTitle}
        onValidityChange={setFormValidity}
      />
      {!isReadOnlyUser && (
        <StatusBar
          dataServiceId={dataServiceId}
          canBeApproved={formIsValid}
          updatedAt={dataService?.modified}
          status={dataServiceStatus}
          onSetStatus={handleDataServiceStatusChange}
          onDataServiceRemove={() =>
            id &&
            deleteDataService(id, organizationId, navigateToDataServiceListPage)
          }
        />
      )}
    </SC.DataServicePage>
  );
};

export default memo(withOrganization(withDataService(DataServicePage)));
