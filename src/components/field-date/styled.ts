import styled, { css } from 'styled-components';

import CalendarSVG from '../../images/icon-calendar-md.svg';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 8px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FieldWrapper = styled.div`
  position: relative;
`;

const DateField = styled.input<{ isReadOnly?: boolean }>`
  width: 140px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:disabled {
    background: none;
  }

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.fdk.colors.text.default};
  }

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      padding: 8px 0;
      border: none;
      box-shadow: none;

      ::-webkit-input-placeholder {
        color: ${({ theme }) => theme.fdk.colors.text.default};
      }

      :-ms-input-placeholder {
        color: ${({ theme }) => theme.fdk.colors.text.default};
      }

      ::placeholder {
        color: ${({ theme }) => theme.fdk.colors.text.default};
      }
    `}
`;

const CalendarIcon = styled(CalendarSVG)`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  height: 24px;
  width: 24px;
  min-height: 24px;
  min-width: 24px;
`;

export default { Field, Label, FieldWrapper, DateField, CalendarIcon };
