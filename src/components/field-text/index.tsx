import React, { memo, PropsWithChildren, ChangeEvent } from 'react';

import SC from './styled';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string;
  error?: any;
  helperText?: any;
  language?: string;
  name: string;
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
  language,
  onChange
}: PropsWithChildren<Props>) => (
  <SC.Field error={error}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.FieldWrapper language={language}>
      {language && <SC.Language>{language}</SC.Language>}
      <SC.TextField
        id={id}
        placeholder={placeholder || labelText}
        name={name}
        value={value}
        onChange={onChange}
      />
    </SC.FieldWrapper>
    {helperText && <SC.HelperText>{helperText}</SC.HelperText>}
  </SC.Field>
);

export default memo(TextField);
