import styled, { css } from 'styled-components';

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Option = styled.span<{
  isReadOnly?: boolean;
  checked?: boolean;
}>`
  display: flex;

  &,
  & * {
    cursor: pointer;
  }

  & > label {
    display: flex;
    margin-left: 5px;

    ${({ isReadOnly, checked, theme }) =>
      isReadOnly &&
      css`
        margin: 0;
        padding: 4px 12px;
        border: 1px solid ${theme.fdk.colors.neutrals.darker};
        border-radius: 4px;
        background: ${checked ? theme.fdk.colors.neutrals.darker : 'none'};
        color: ${checked ? 'white' : theme.fdk.colors.neutrals.darker};
      `}
  }
`;

const Options = styled.div`
  display: flex;

  ${Option} {
    &:nth-of-type(n + 2) {
      margin-left: 20px;
    }
  }
`;

const HelperText = styled.p<{ error?: boolean }>`
  margin-top: 5px;
  margin-left: 8px;
  font-size: 12;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

export default { Radio, Label, Options, Option, HelperText };
