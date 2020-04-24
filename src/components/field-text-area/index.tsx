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
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.FieldWrapper language={language}>
      {language && <SC.Language>{language}</SC.Language>}
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
    </SC.FieldWrapper>
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextAreaField);
