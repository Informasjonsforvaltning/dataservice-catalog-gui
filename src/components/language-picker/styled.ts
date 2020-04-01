import styled from 'styled-components';

const LanguagePicker = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  button:nth-of-type(n + 2) {
    margin-left: 15px;
  }
`;

export default { LanguagePicker };
