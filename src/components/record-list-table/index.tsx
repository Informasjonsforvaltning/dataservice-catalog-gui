import React, { memo } from 'react';

import TableHead from '../table-head';

import SC from './styled';

import RecordRow from '../record-row';

import { Record } from '../../types';

interface Props {
  records: Record[];
}

const RecordListTable = ({ records }: Props): JSX.Element => (
  <>
    <SC.RecordListTable>
      <thead>
        <tr>
          <TableHead
            fieldSelector={['title']}
            title='Tittel på datatjenestebeskrivelse'
          />
          <TableHead
            // fieldSelector={['dataProcessorContactDetails', 'name']}
            title='Sist endret av'
          />
          <TableHead title='Sist endret' />
          <TableHead fieldSelector={['status']} title='Status' />
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <RecordRow key={record.id} record={record} />
        ))}
      </tbody>
    </SC.RecordListTable>
    {records.length === 0 && (
      <SC.EmptyTableBody>
        Det er ikke registrert noen beskrivelser ennå
      </SC.EmptyTableBody>
    )}
  </>
);

export default memo(RecordListTable);
