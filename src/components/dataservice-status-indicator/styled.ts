import styled from 'styled-components';

const DataServiceStatusIndicator = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    height: 30px;
    width: 30px;
    margin-right: 6px;
    padding: 6px;
    border-radius: 50%;
    font-size: 20px;
    background: ${({ theme }) => theme.fdk.colors.neutrals.default};
    fill: white;
  }

  & > span {
    font-size: 18px;
    font-weight: normal;
  }
`;

export default { DataServiceStatusIndicator };
