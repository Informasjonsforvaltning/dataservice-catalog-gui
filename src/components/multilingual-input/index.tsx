import React, { FC, memo, ComponentType, ChangeEvent } from 'react';

import SC from './styled';

interface Props {
  component: ComponentType<any>;
  languages: string[];
  id?: string;
  name: string;
  value?: { [key in string]: string };
  error?: string;
  placeholder?: string;
  labelText?: string;
  helperText?: string;
  onChange?: (event: ChangeEvent<any>) => void;
}

const MultilingualInput: FC<Props> = ({
  id,
  name,
  value,
  error,
  placeholder,
  labelText,
  helperText,
  onChange,
  languages,
  component: Component
}) => (
  <SC.MultilingualInput>
    {labelText && <SC.Label>{labelText}</SC.Label>}
    {languages.map(language => (
      <Component
        id={`${id}.${language}`}
        name={`${name}.${language}`}
        value={value?.[language]}
        error={error}
        placeholder={placeholder}
        helperText={helperText}
        onChange={onChange}
        language={language}
      />
    ))}
  </SC.MultilingualInput>
);

export default memo(MultilingualInput);
