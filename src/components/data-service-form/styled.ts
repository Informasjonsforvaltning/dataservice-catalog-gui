import styled, { css } from 'styled-components';
import { Form } from 'formik';

import ExpansionPanel from '../expansion-panel';
import BaseFieldSet from '../fdk-fieldset';

const DataServiceForm = styled(Form)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label<{ isReadOnly?: boolean }>`
  margin-bottom: -15px;
  font-weight: bold;

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      margin-top: 20px;
      padding: 0 8px;
    `}
`;

const DateField = styled.input<{ isReadOnly?: boolean }>`
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

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      border: none;
      box-shadow: none;
    `}
`;

const ExpandAllButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-bottom: 12px;

  color: ${({ theme }) => theme.fdk.colors.text.default};

  &:hover {
    text-decoration: underline;
  }

  & > svg {
    height: 16px;
    width: 16px;
    margin-left: 5px;
    fill: ${({ theme }) => theme.fdk.colors.text.default};
  }
`;

const DataServiceFormSection = styled(ExpansionPanel)`
  width: 100%;

  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }
`;

const Fieldset = styled(BaseFieldSet)`
  &:nth-of-type(n + 2) {
    margin-top: 50px;
  }
`;

const InlineFields = styled.div`
  display: flex;

  & > div:nth-of-type(n + 2) {
    margin-left: 20px;
  }

  & > div:first-of-type {
    flex: 0 0 60%;
  }

  & > div:last-of-type {
    flex: 0 0 calc(40% - 20px);
  }
`;

const AddButton = styled.button<{ addMargin?: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.link};
  cursor: pointer;

  & > svg {
    height: 16px;
    width: 16px;
    margin-right: 6px;
  }

  ${({ addMargin }) =>
    addMargin &&
    css`
      margin-top: 18px;
    `}
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: auto;
  border: none;
  background: none;
  color: ${({ theme }) => theme.fdk.colors.text.danger};
  cursor: pointer;

  & > svg {
    height: 16px;
    width: 16px;
    margin-right: 6px;
  }
`;

export default {
  DataServiceForm,
  ExpandAllButton,
  DataServiceFormSection,
  Fieldset,
  InlineFields,
  AddButton,
  RemoveButton,
  DateField,
  Label
};
