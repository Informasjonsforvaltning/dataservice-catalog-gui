import React, { memo, ChangeEvent, useState, useRef, useEffect } from 'react';

import SC from './styled';

interface Option {
  label: string;
  value: any;
}

interface Props {
  name: string;
  value?: string;
  options: Option[];
  helperText?: string;
  labelText?: string;
  noOptionLabel?: string;
  isResettable?: boolean;
  onChange?: (event?: ChangeEvent<any>) => void;
}

const Select = ({
  name,
  options,
  labelText,
  noOptionLabel,
  isResettable,
  value,
  onChange
}: Props): JSX.Element => {
  const currentOption = options.find(
    ({ value: optionValue }) => `${value}` === `${optionValue}`
  );
  const selectElement = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLSelectElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const [selectLabel, setSelectLabel] = useState(
    currentOption ? currentOption.label : noOptionLabel || ''
  );
  const toggleExpandedState = () => setIsExpanded(!isExpanded);

  const handleClickOutside = (e: MouseEvent) => {
    if (!selectElement?.current?.contains(e.target as any)) {
      setIsExpanded(false);
    }
  };

  const handleChangeValue = (
    newValue: string | undefined,
    newIndex: number,
    newLabel?: string
  ) => (e: any) => {
    if (!newValue) {
      e.stopPropagation();
    }
    setSelectValue(newValue);
    setSelectLabel(newLabel ?? (noOptionLabel || ''));
    setImmediate(() => {
      if (inputElement && inputElement.current) {
        inputElement.current.selectedIndex = newIndex;
        const event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputElement.current.dispatchEvent(event);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <SC.Select ref={selectElement} onClick={toggleExpandedState}>
      {labelText && <SC.Label htmlFor={name}>{labelText}</SC.Label>}
      <SC.SelectButton type='button'>
        <span>{currentOption ? currentOption.label : selectLabel}</span>
        {isResettable && selectValue && (
          <SC.ResetIcon onClick={handleChangeValue(undefined, -1)} />
        )}
      </SC.SelectButton>
      <SC.OverflowControl visible={isExpanded}>
        <SC.Dropdown>
          {noOptionLabel && (
            <SC.NoOptionLabel>{noOptionLabel}</SC.NoOptionLabel>
          )}
          {options.map(({ label, value: optionValue }, index) => (
            <SC.DropdownItem
              id={name}
              key={`${label}-${optionValue}`}
              selected={`${value}` === `${optionValue}`}
              onClick={handleChangeValue(optionValue, index, label)}
            >
              {label}
            </SC.DropdownItem>
          ))}
        </SC.Dropdown>
      </SC.OverflowControl>
      <SC.HiddenSelect
        ref={inputElement}
        as='select'
        name={name}
        value={selectValue}
        onInput={onChange}
        onChange={() => {}}
      >
        {options.map(({ label, value: optionValue }) => (
          <option key={`${name}-${optionValue}`} value={optionValue}>
            {label}
          </option>
        ))}
      </SC.HiddenSelect>
    </SC.Select>
  );
};

export default memo(Select);
