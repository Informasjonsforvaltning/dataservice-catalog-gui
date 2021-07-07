import styled, { css } from 'styled-components';
import { Field as FormikField } from 'formik';

const Field = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  ${({ error }) =>
    error &&
    css`
      & input {
        border-color: red;

        &:not(:disabled):focus {
          box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.5);
        }
      }
    `}
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextTagsField = styled(FormikField)`
  width: 100%;
  display: block;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
  border-radius: 5px;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.fdk.colors.text.default};
  }
`;

const HelperText = styled.p<{ error?: boolean }>`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 12px;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: -5px;
`;

const Tag = styled.span<{ isReadOnly?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 14px;
  background: ${({ theme }) => theme.fdk.colors.neutrals.darker};
  color: white;

  & > span {
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > svg {
    height: 16px;
    width: 16px;
    margin-left: 5px;
    cursor: pointer;

    & > path {
      fill: white;
    }
  }

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      padding: 4px 12px;
      font-size: 16px;
    `}
`;

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
      position: relative;
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

const FieldWrapper = styled.div<{ language?: string; isReadOnly?: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  ${({ language }) =>
    language &&
    css`
      & > ${TextTagsField} {
        padding-left: 41px;
      }
    `}

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      margin: 4px 0;
    `}
`;

export default {
  Field,
  FieldWrapper,
  Label,
  Language,
  TextTagsField,
  HelperText,
  Tags,
  Tag
};
