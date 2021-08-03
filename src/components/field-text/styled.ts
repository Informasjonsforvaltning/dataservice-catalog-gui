import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';
import { theme as fdkTheme } from '@fellesdatakatalog/theme';
import AlertBase from '@fellesdatakatalog/alert';

const Language = styled.span<{ isReadOnly?: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 25px;
  margin: 0 8px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      top: -3px;
      transform: none;
      margin: 0;
      padding: 3px 5px;
      border-radius: 4px;
      width: 34px;
      text-transform: lowercase;
      background: ${({ theme }) => theme.fdk.colors.neutrals.skyblue};
    `}
`;

const TextField = styled(FormikField)<{ disabled?: boolean; error?: boolean }>`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
  color: ${({ theme }) => theme.fdk.colors.text.default};

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.fdk.colors.neutrals.light};
    `}

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.fdk.colors.text.default};
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ReadOnlyLabel = styled.span`
  min-height: 18.4px;
`;

const HelperText = styled.p`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 12px;
`;

const FieldWrapper = styled.div<{ language?: string; isReadOnly?: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ language }) =>
    language &&
    css`
      & > ${TextField} {
        padding-left: 41px;
      }

      & > ${ReadOnlyLabel} {
        margin-left: 42px;
      }
    `}

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      margin: 4px 0;
    `}
`;

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  ${({ error }) =>
    error &&
    css`
      & ${TextField} {
        border-color: red;

        &:not(:disabled):focus {
          box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.5);
        }
      }

      & ${HelperText} {
        color: red;
      }
    `}
`;

const Alert = styled(AlertBase)`
  margin-top: ${fdkTheme.spacing('S8')};
  padding: ${fdkTheme.spacing('S4')};

  && > svg {
    font-size: ${fdkTheme.fontSize('FS20')};
  }
`;

export default {
  Field,
  FieldWrapper,
  TextField,
  Language,
  Label,
  ReadOnlyLabel,
  HelperText,
  Alert
};
