import styled from 'styled-components';

import Common from '../common/styled';

const DataServiceListPage = styled(Common.Container)`
  margin-bottom: 50px;
`;

const DataServiceListActions = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

export default {
  DataServiceListPage,
  DataServiceListActions
};
