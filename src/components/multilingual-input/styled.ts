import styled from 'styled-components';

const MultilingualInput = styled.div`
  & > div:nth-of-type(n + 2) {
    margin-top: 8px;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

export default { MultilingualInput, Label };
