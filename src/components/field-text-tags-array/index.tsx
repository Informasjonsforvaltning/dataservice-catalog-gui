import { FieldArray } from 'formik';
import React, { memo, PropsWithChildren } from 'react';

import { Language } from '../../types/enums';

import TextTagsField from '../field-text-tags';

interface Props {
  id?: string;
  required?: boolean;
  placeholder?: string;
  labelText?: string;
  value?: string[];
  language?: Language;
  error?: any;
  helperText?: any;
  name: string;
  isReadOnly?: boolean;
}

const TextTagsArrayField = ({
  id,
  name,
  value,
  language,
  error,
  helperText,
  placeholder,
  labelText,
  isReadOnly
}: PropsWithChildren<Props>) => {
  return (
    <FieldArray
      name={name}
      render={({ push, remove }) => (
        <TextTagsField
          id={id}
          name={name}
          value={value}
          language={language}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          labelText={labelText}
          isReadOnly={isReadOnly}
          onAddTag={(tag: string) => !value?.includes(tag) && push(tag)}
          onRemoveTag={remove}
        />
      )}
    />
  );
};

export default memo(TextTagsArrayField);
