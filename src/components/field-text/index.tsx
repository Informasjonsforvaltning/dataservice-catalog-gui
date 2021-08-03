import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import { Severity } from '@fellesdatakatalog/alert';

import SC from './styled';

import { Language } from '../../types/enums';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  disabled?: boolean;
  value?: string;
  error?: any;
  helperText?: any;
  language?: Language;
  name: string;
  isReadOnly?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
}

const TextField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  disabled,
  language,
  onChange,
  isReadOnly
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.FieldWrapper language={language} isReadOnly={isReadOnly}>
      {language && (
        <SC.Language isReadOnly={isReadOnly}>{language}</SC.Language>
      )}
      {!isReadOnly ? (
        <SC.TextField
          id={id}
          placeholder={placeholder || labelText}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <SC.ReadOnlyLabel>{value}</SC.ReadOnlyLabel>
      )}
    </SC.FieldWrapper>
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
    {error && <SC.Alert severity={Severity.ERROR}>{error}</SC.Alert>}
  </SC.Field>
);

export default memo(TextField);
