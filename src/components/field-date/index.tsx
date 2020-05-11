import React, { memo, FC, SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
import { nb } from 'date-fns/locale';

import SC from './styled';

interface Props {
  id?: string;
  placeholder?: string;
  labelText?: string;
  value?: string;
  name: string;
  isReadOnly?: boolean;
  format?: string;
  onChange: (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => void;
}

const DateField: FC<Props> = ({
  id,
  name,
  value,
  placeholder,
  labelText,
  format,
  onChange,
  isReadOnly
}) => (
  <SC.Field>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.FieldWrapper>
      <DatePicker
        selected={value ? new Date(value) : null}
        id={id}
        name={name}
        minDate={new Date()}
        customInput={<SC.DateField isReadOnly={isReadOnly} />}
        placeholderText={placeholder}
        dateFormat={format ?? 'dd.MM.yyyy'}
        locale={nb}
        todayButton='Dagens'
        onChange={onChange}
        disabled={isReadOnly}
      />
      {!isReadOnly && <SC.CalendarIcon />}
    </SC.FieldWrapper>
  </SC.Field>
);

export default memo(DateField);
