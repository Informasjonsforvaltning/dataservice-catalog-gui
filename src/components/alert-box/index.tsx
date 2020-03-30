import React, { FC, memo } from 'react';

import SC from './styled';
import { AlertType } from '../../types/enums';

interface Props {
  message: string;
  type: AlertType;
}

const AlertBox: FC<Props> = ({ type, message }) => (
  <SC.AlertBox type={type}>{message}</SC.AlertBox>
);

export default memo(AlertBox);
