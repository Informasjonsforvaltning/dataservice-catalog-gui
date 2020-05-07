import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';

import { Language } from '../../types/enums';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string;
  error?: any;
  helperText?: any;
  language?: Language;
  name: string;
  disabled: boolean;
  isReadOnly?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
}

const TextAreaField = ({
  id,
  name,
  value,
  error,
  helperText,
  placeholder,
  labelText,
  language,
  disabled,
  isReadOnly,
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.FieldWrapper language={language} isReadOnly={isReadOnly}>
      {language && (
        <SC.Language isReadOnly={isReadOnly}>{language}</SC.Language>
      )}
      {!isReadOnly ? (
        <SC.TextAreaField
          component='textarea'
          rows={3}
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
    {helperText && !isReadOnly && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextAreaField);
