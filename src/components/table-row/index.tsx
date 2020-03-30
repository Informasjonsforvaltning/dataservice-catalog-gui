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

const TableRow = ({
  dataService: { id, organizationId, title, status, modified = '' },
  history: { push }
}: Props) => {
  const navigateToDataService = () =>
    push(`/${organizationId}/data-services/${id}`);
  return (
    <SC.TableRow onClick={navigateToDataService}>
      <td> {translate(title)} </td>
      <td />
      <td>{formatDate(dateStringToDate(modified))}</td>
      <td>
        <DataServiceStatusIndicator status={status} />
      </td>
    </SC.TableRow>
  );
};

export default memo(withRouter(TableRow));
