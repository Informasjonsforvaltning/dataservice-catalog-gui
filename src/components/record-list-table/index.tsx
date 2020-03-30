import React, { FC, memo } from 'react';

import TableHead from '../table-head';

import SC from './styled';

import RecordRow from '../record-row';

import { DataService } from '../../types';

interface Props {
  dataServices: DataService[];
}

const RecordListTable: FC<Props> = ({ dataServices }) => (
  <>
    <SC.RecordListTable>
      <thead>
        <tr>
          <TableHead
            fieldSelector={['title']}
            title='Tittel på datatjenestebeskrivelse'
          />
          <TableHead fieldSelector={['modifiedBy']} title='Sist endret av' />
          <TableHead fieldSelector={['modified']} title='Sist endret' />
          <TableHead fieldSelector={['status', 'statusText']} title='Status' />
        </tr>
      </thead>
      <tbody>
        {dataServices.map(dataService => (
          <RecordRow key={dataService.id} dataService={dataService} />
        ))}
      </tbody>
    </SC.RecordListTable>
    {dataServices.length === 0 && (
      <SC.EmptyTableBody>
        Det er ikke registrert noen beskrivelser ennå
      </SC.EmptyTableBody>
    )}
  </>
);

export default memo(RecordListTable);
