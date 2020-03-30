import React, { memo } from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import withDataServices, {
  Props as DataservicesProps
} from '../with-dataservices';

import SC from './styled';
import { SortOrder } from '../../types/enums';

interface Props extends DataservicesProps {
  title: string;
  fieldSelector: string[];
}

const TableHead = ({
  title,
  fieldSelector,
  dataServicesActions: { sortDataServices }
}: Props): JSX.Element => (
  <th>
    <div>
      <span>{title}</span>
      <SC.SortButtons>
        <button
          type='button'
          onClick={() => sortDataServices(fieldSelector, SortOrder.ASC)}
        >
          <ArrowDropUp fontSize='large' />
        </button>
        <button
          type='button'
          onClick={() => sortDataServices(fieldSelector, SortOrder.DSC)}
        >
          <ArrowDropDown fontSize='large' />
        </button>
      </SC.SortButtons>
    </div>
  </th>
);

export default memo(withDataServices(TableHead));
