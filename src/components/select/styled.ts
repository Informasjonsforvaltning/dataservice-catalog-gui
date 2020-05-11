import styled, { css } from 'styled-components';
import { Field } from 'formik';
import ResetIconBase from '@material-ui/icons/Close';

const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-height: 36px;
  min-width: 200px;
  max-width: 260px;
  padding: 0 8px;
  background: none;

  &,
  & * {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const SelectButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 36px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.fdk.colors.text.default};
  color: ${({ theme }) => theme.fdk.colors.text.default};
  background: none;
  text-align: left;

  & > span {
    display: block;
    max-width: calc(100% - 20px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:not(:disabled):focus {
    box-shadow: 0 0 0 0.1rem ${({ theme }) => theme.fdk.colors.text.default};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${({ theme }) => theme.fdk.colors.text.link};
  }
`;

const OverflowControl = styled.div<{ visible: boolean }>`
  position: relative;
  margin-top: 1px;
  border-radius: 5px;
  box-shadow: 0 0 3px 1px #ddd;
  background: white;
  z-index: 2;

  ${({ visible }) =>
    !visible &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

const Dropdown = styled.ul`
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  outline: none;
`;

const NoOptionLabel = styled.p`
  padding: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.fdk.colors.neutrals.default};
  cursor: auto;
  user-select: none;
`;

const DropdownItem = styled.li<{ selected: boolean }>`
  padding: 12px 8px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.fdk.colors.neutrals.lightest};
  }

  ${({ selected }) =>
    selected &&
    css`
      background: ${({ theme }) => theme.fdk.colors.neutrals.lightest};
    `}
`;

const HiddenSelect = styled(Field)<any>`
  display: none;
`;

const ResetIcon = styled(ResetIconBase)`
  height: 20px !important;
  width: 20px !important;
  margin-right: 20px;
  color: ${({ theme }) => theme.fdk.colors.neutrals.default};
`;

export default {
  Select,
  Label,
  SelectButton,
  OverflowControl,
  Dropdown,
  NoOptionLabel,
  DropdownItem,
  HiddenSelect,
  ResetIcon
};
