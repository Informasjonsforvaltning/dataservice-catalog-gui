import React, { FC, memo, ChangeEvent } from 'react';
import { Field } from 'formik';

import SC from './styled';

interface Option {
  label: string;
  value: any;
}

interface Props {
  name: string;
  value: any;
  error?: any;
  labelText?: string;
  helperText?: any;
  options: Option[];
  isReadOnly?: boolean;
  columnDirection?: boolean;
  onChange?: (event: ChangeEvent<any>) => void;
}

const Radio: FC<Props> = ({
  name,
  value,
  error,
  labelText,
  helperText,
  options,
  isReadOnly,
  columnDirection,
  onChange,
  ...props
}) => (
  <SC.Radio {...props}>
    {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
    <SC.Options columnDirection={columnDirection}>
      {options.map(({ label, value: optionValue }) => (
        <SC.Option
          key={`${name}-${optionValue}`}
          checked={`${optionValue}` === `${value}`}
          isReadOnly={isReadOnly}
        >
          {!isReadOnly && (
            <Field
              type='radio'
              name={name}
              value={optionValue}
              checked={`${optionValue}` === `${value}`}
              id={`${name}-${optionValue}`}
              onChange={onChange}
            />
          )}
          <label htmlFor={`${name}-${optionValue}`}>{label}</label>
        </SC.Option>
      ))}
    </SC.Options>
    {helperText && !isReadOnly && (
      <SC.HelperText error={error}>{helperText}</SC.HelperText>
    )}
  </SC.Radio>
);

export default memo(Radio);
