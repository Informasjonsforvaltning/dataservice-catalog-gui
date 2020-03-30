import styled, { css } from 'styled-components';
import { AlertType } from '../../types/enums';

const AlertBox = styled.div<{ type: AlertType }>`
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  padding: 15px 20px;
  border-radius: 5px;

  border: 1px solid;

  ${({ type }) => {
    switch (type) {
      case AlertType.ERROR: {
        return css`
          background: #f2dedf;
          color: #a84441;
          border-color: #a84441;

          & > svg {
            fill: #a84441;
          }
        `;
      }
      case AlertType.WARNING: {
        return css`
          background: #fff2d9;
          color: #875b02;
          border-color: #875b02;

          & > svg {
            fill: #875b02;
          }
        `;
      }
      case AlertType.SUCCESS:
      default: {
        return css`
          background: #e6f2f0;
          color: #017d68;
          border-color: #017d68;

          & > svg {
            fill: #017d68;
          }
        `;
      }
    }
  }}
`;

export default { AlertBox };
