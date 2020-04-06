import styled from 'styled-components';

const Tag = styled.span`
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 14px;
  background: ${({ theme }) => theme.fdk.colors.alerts.warning.lightest};
  color: ${({ theme }) => theme.fdk.colors.yellows.sand};
`;

export default { Tag };
