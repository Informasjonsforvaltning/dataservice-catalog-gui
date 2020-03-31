import React, { FC, memo } from 'react';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import SC from './styled';

import { Status } from '../../types/enums';

interface Props {
  status: Status;
}

const statuses = {
  [Status.DRAFT]: {
    text: 'Utkast',
    icon: CreateIconOutlined
  },
  [Status.PUBLISHED]: {
    text: 'Publisert',
    icon: CheckBoxOutlinedIcon
  }
};

const DataServiceStatusIndicator: FC<Props> = ({ status }) => {
  const { text, icon: Icon } = statuses[status];
  return (
    <SC.DataServiceStatusIndicator>
      <Icon />
      <span>{text}</span>
    </SC.DataServiceStatusIndicator>
  );
};

export default memo(DataServiceStatusIndicator);
