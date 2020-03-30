import styled from 'styled-components';

import { Form } from 'formik';

const DataServiceImportPanel = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  background: white;

  padding: 30px;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;

  button:not(:last-of-type) {
    margin-right: 15px;
  }
`;

const InlineFields = styled.div`
  display: flex;

  & > :nth-child(n + 2) {
    margin-left: 10px;
  }

  & > :first-child {
    flex: 0 0 80%;
  }

  input {
    padding: 10px;
  }

  button {
    margin-top: auto;
  }
`;

const FormTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormStatus = styled.div`
  margin-top: 20px;
`;

const DataServiceImportForm = styled(Form)`
  display: flex;
  flex-direction: inherit;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default {
  DataServiceImportPanel,
  DataServiceImportForm,
  FormTitle,
  FormStatus,
  ButtonGroup,
  InlineFields
};
