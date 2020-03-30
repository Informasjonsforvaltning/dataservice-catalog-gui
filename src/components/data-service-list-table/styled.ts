import styled from 'styled-components';

const EmptyTableBody = styled.div`
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.fdk.colors.neutrals.default};
  background: white;
  padding: 15px 10px;

  border-radius: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DataServiceListTable = styled.table`
  width: 100%;
  border-spacing: 0 5px;
  border-collapse: separate;
  table-layout: fixed;

  tr {
    text-align: left;
    background: white;
    padding: 10px 0;
  }

  td,
  th {
    padding: 15px 10px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-of-type {
      width: 50%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      width: 15%;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  th {
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    background: ${({ theme }) => theme.fdk.colors.neutrals.darker};
    color: white;
    font-weight: bold;
  }
`;

export default { DataServiceListTable, EmptyTableBody };
