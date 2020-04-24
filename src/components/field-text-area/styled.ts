import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

interface TextAreaFieldProps {
  disabled?: boolean;
  error?: boolean;
}

const Language = styled.span`
  position: absolute;
  top: 9px;
  left: 0;
  width: 25px;
  margin: 0 8px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`;

const TextAreaField = styled(FormikField)<TextAreaFieldProps>`
  width: 100%;
  min-height: 72px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
  color: ${({ theme }) => theme.fdk.colors.text.default};
  resize: vertical;

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.fdk.colors.text.default};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${({ theme }) => theme.fdk.colors.neutrals.light};
    `}
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const HelperText = styled.p`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 12px;
`;

const FieldWrapper = styled.div<{ language?: string }>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ language }) =>
    language &&
    css`
      & > ${TextAreaField} {
        padding-left: 41px;
      }
    `}
`;

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ error }) =>
    error &&
    css`
      & ${TextAreaField} {
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

export default {
  Field,
  FieldWrapper,
  TextAreaField,
  Language,
  Label,
  HelperText
};
