import React, { memo } from 'react';

import DataServiceStatusIndicator from '../dataservice-status-indicator';

import SC from './styled';

import { Status } from '../../types/enums';

interface Props {
  title: string;
  subTitle: string;
  status?: Status;
}

const Headline = ({ title, subTitle, status }: Props): JSX.Element => (
  <SC.Headline>
    <SC.TitleWrapper>
      <SC.Title>{title}</SC.Title>
      {status && <DataServiceStatusIndicator status={status} />}
    </SC.TitleWrapper>
    <SC.SubTitle>{subTitle}</SC.SubTitle>
  </SC.Headline>
);

export default memo(Headline);
