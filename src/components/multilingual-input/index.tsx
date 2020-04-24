import React, {
  FC,
  memo,
  useRef,
  useEffect,
  ComponentType,
  ChangeEvent
} from 'react';
import { fromJS } from 'immutable';

import SC from './styled';

import { MultiLanguageText } from '../../types';
import { Language } from '../../types/enums';

interface Props {
  component: ComponentType<any>;
  languages: Language[];
  id?: string;
  name: string;
  value?: MultiLanguageText;
  error?: any;
  placeholder?: string;
  labelText?: string;
  helperText?: any;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
  onLanguageChange?: () => void;
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
  disabled,
  onLanguageChange,
  languages,
  component: Component
}) => {
  const previousLanguages = useRef<Language[]>([]);

  useEffect(() => {
    if (
      !fromJS(languages.sort()).equals(fromJS(previousLanguages.current.sort()))
    ) {
      onLanguageChange?.();
      previousLanguages.current = languages;
    }
  }, [languages]);

  return (
    <SC.MultilingualInput>
      {labelText && <SC.Label>{labelText}</SC.Label>}
      {languages.map(language => (
        <Component
          key={language}
          id={`${id}.${language}`}
          name={`${name}.${language}`}
          value={value?.[language] ?? ''}
          error={error?.[language] ?? error}
          placeholder={placeholder}
          helperText={helperText?.[language] ?? helperText}
          onChange={onChange}
          disabled={disabled}
          language={language}
        />
      ))}
    </SC.MultilingualInput>
  );
};

export default memo(MultilingualInput);
