import React, { memo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { translate } from '../../lib/localization';
import { formatDate, dateStringToDate } from '../../lib/date-utils';

import DataServiceStatusIndicator from '../dataservice-status-indicator';

import SC from './styled';

import { DataService } from '../../types';

interface Props extends RouteComponentProps {
  dataService: DataService;
}

const RecordRow = ({
  dataService: { id, organizationId, title, status, modified },
  history: { push }
}: Props) => {
  const navigateToRecord = () => push(`/${organizationId}/dataservices/${id}`);
  return (
    <SC.RecordRow onClick={navigateToRecord}>
      <td> {translate(title)} </td>
      <td />
      <td>{formatDate(dateStringToDate(modified))}</td>
      <td>
        <DataServiceStatusIndicator status={status.statusText} />
      </td>
    </SC.RecordRow>
  );
};

export default memo(withRouter(RecordRow));
