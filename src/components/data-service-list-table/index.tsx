import React, { FC, memo } from 'react';

import TableHead from '../table-head';

import SC from './styled';

import TableRow from '../table-row';

import { DataService } from '../../types';

interface Props {
  dataServices: DataService[];
}

const DataServiceListTable: FC<Props> = ({ dataServices }) => (
  <>
    <SC.DataServiceListTable>
      <thead>
        <tr>
          <TableHead
            fieldSelector={['title']}
            title='Tittel på datatjenestebeskrivelse'
          />
          <TableHead fieldSelector={['modified']} title='Sist endret' />
          <TableHead fieldSelector={['status']} title='Status' />
        </tr>
      </thead>
      <tbody>
        {dataServices.map(dataService => (
          <TableRow key={dataService.id} dataService={dataService} />
        ))}
      </tbody>
    </SC.DataServiceListTable>
    {dataServices.length === 0 && (
      <SC.EmptyTableBody>
        Det er ikke registrert noen beskrivelser ennå
      </SC.EmptyTableBody>
    )}
  </>
);

export default memo(DataServiceListTable);
