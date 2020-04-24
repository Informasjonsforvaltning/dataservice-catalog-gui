import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const Language = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 25px;
  margin: 0 8px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
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
      & > ${TextField} {
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

export default { Field, FieldWrapper, TextField, Language, Label, HelperText };
