import React, { memo, useState } from 'react';

import CreateIconOutlined from '@material-ui/icons/CreateOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

import SC from './styled';

import { Status } from '../../types/enums';

interface Props {
  dataServiceId?: string;
  status: Status;
  updatedAt?: string;
  canBeApproved: boolean;
  onSetStatus: (status: Status) => void;
  onDataServiceRemove: () => void;
}

const StatusBar = ({
  dataServiceId,
  status,
  updatedAt,
  onSetStatus,
  canBeApproved,
  onDataServiceRemove
}: Props): JSX.Element => {
  const [showConfirmDeleteMessage, setShowConfirmDeleteMessage] = useState(
    false
  );
  const setStatusToDraft = () => onSetStatus(Status.DRAFT);
  const setStatusToApproved = () => onSetStatus(Status.PUBLISHED);
  return (
    <SC.StatusBar>
      <SC.StatusBarBody>
        {!showConfirmDeleteMessage && updatedAt && (
          <span>{`Sist endret: ${new Date(updatedAt).toLocaleString()}`}</span>
        )}
        {showConfirmDeleteMessage && (
          <span>Er du sikker du vil slette denne datatjenesten?</span>
        )}
        <SC.ButtonGroup>
          {!showConfirmDeleteMessage && (
            <>
              <SC.StatusButton
                variant={status === Status.DRAFT ? 'default' : 'secondary'}
                selected={status === Status.DRAFT}
                text='Utkast'
                icon={CreateIconOutlined}
                onClick={setStatusToDraft}
              />
              <SC.StatusButton
                variant={
                  status === Status.PUBLISHED && canBeApproved
                    ? 'default'
                    : 'secondary'
                }
                selected={status === Status.PUBLISHED}
                disabled={!canBeApproved}
                text='Publiser'
                icon={CheckBoxOutlinedIcon}
                onClick={setStatusToApproved}
              />
              <SC.RemoveButton
                as='a'
                disabled={!dataServiceId || status === Status.PUBLISHED}
                onClick={() => {
                  setShowConfirmDeleteMessage(true);
                }}
              >
                Slett
              </SC.RemoveButton>
            </>
          )}
          {showConfirmDeleteMessage && (
            <>
              <SC.ConfirmButton
                variant='primary'
                text='Ja'
                onClick={() => {
                  setShowConfirmDeleteMessage(false);
                  onDataServiceRemove();
                }}
              />
              <SC.CancelButton
                as='a'
                onClick={() => {
                  setShowConfirmDeleteMessage(false);
                }}
              >
                Avbryt
              </SC.CancelButton>
            </>
          )}
        </SC.ButtonGroup>
      </SC.StatusBarBody>
    </SC.StatusBar>
  );
};

export default memo(StatusBar);
