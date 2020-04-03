import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'anchor' | 'default';

const FDKButton = styled.button<{ variant?: Variant }>`
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  outline: none;
  border: none;
  border-radius: 3px;
  line-height: 21px;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.25);

  &:not(:disabled):active:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 128, 179, 0.5);
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }

  ${({ variant, theme }) => {
    const buttonStyles = theme.fdk.colors.buttons;
    switch (variant) {
      case 'primary': {
        return css`
          background: ${buttonStyles.primary.background};
          color: ${buttonStyles.primary.text};
        `;
      }
      case 'secondary': {
        return css`
          background: ${buttonStyles.secondary.background};
          color: ${buttonStyles.secondary.text};

          & > svg {
            fill: ${theme.fdk.colors.text.default};
          }

          &:disabled {
            color: white;
          }
        `;
      }
      case 'anchor': {
        return css`
          background: none;
          color: ${buttonStyles.secondary.text};
          box-shadow: none;
          border-bottom: 1px dashed;
          border-radius: 0;
          margin-bottom: 10px;

          padding: 0;
          justify-content: center;

          & > svg {
            display: none;
          }
        `;
      }
      default:
        return css`
          background: ${buttonStyles.default.background};
          color: ${buttonStyles.default.text};

          & > svg {
            fill: ${buttonStyles.default.text};
          }
        `;
    }
  }}

  & > svg {
    margin-right: 5px;
    font-size: 21px;
    width: 20px;
    height: 20px;
  }
`;

export default { FDKButton };
