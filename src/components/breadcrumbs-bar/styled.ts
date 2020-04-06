import styled from 'styled-components';

const BreadcrumbsBar = styled.div`
  padding: 16px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.neutrals.lighter};

  & * {
    font-size: 16px;
  }

  & nav a {
    border-bottom: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
    color: ${({ theme }) => theme.fdk.colors.text.default};
  }

  & nav a,
  & nav a:hover {
    text-decoration: none;
  }

  & nav li:last-of-type {
    flex: 1 1 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default { BreadcrumbsBar };
