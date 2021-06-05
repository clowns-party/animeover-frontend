import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import styled from "styled-components";

export enum CheckboxType {
  "default" = "default",
}
type StyledCheckboxProps = {
  disabled?: boolean;
};
const DefaultChecbox = styled.div`
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #000000;
  }
  &:disabled {
    background: #e8ebee;
    border: 1px solid #e8ebee;
    color: rgba(0, 0, 0, 0.3);
  }
  input {
    position: absolute;
    opacity: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:checked + label {
      &::before {
        border: 1px solid #4478ff;
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='12' viewBox='0 0 14 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.36085 11.23C5.22721 11.3644 5.04489 11.4394 4.85549 11.4394C4.66609 11.4394 4.48376 11.3644 4.35012 11.23L0.314135 7.19333C-0.104712 6.77448 -0.104712 6.09529 0.314135 5.67723L0.819501 5.17174C1.23848 4.75289 1.91688 4.75289 2.33573 5.17174L4.85549 7.69163L11.6642 0.882739C12.0832 0.463892 12.7623 0.463892 13.1805 0.882739L13.6858 1.38824C14.1047 1.80708 14.1047 2.48614 13.6858 2.90433L5.36085 11.23Z' fill='%234478FF'/%3E%3C/svg%3E%0A");
      }
    }
    & + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
      &::before {
        margin-right: 10px;
        content: "";
        display: inline-block;
        flex-shrink: 0;
        flex-grow: 0;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 14px 14px;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 4px;
      }
    }

    &:not(:disabled):not(:checked) + label:hover::before {
      /* border-color: #b3d7ff; */
    }
    /* стили для активного состояния чекбокса (при нажатии на него) */
    &:not(:disabled):active + label::before {
      /* background-color: #b3d7ff;
      border-color: #b3d7ff; */
    }
    /* стили для чекбокса, находящегося в фокусе */
    &:focus + label::before {
      /* box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); */
    }
    /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
    &:focus:not(:checked) + label::before {
      /* border-color: #80bdff; */
    }
    /* стили для чекбокса, находящегося в состоянии disabled */
    &:disabled + label::before {
      /* background-color: #e9ecef; */
    }
  }
  label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #4a4a4a;
    cursor: ${(props: StyledCheckboxProps) =>
      props.disabled ? "no-drop" : "pointer"};
    opacity: ${(props: StyledCheckboxProps) => (props.disabled ? "0.7" : "1")};
  }
`;

type Props = {
  children?: React.ReactNode;
  extends?: HTMLAttributes<HTMLDivElement>;
  style?: React.CSSProperties;
  typeComponent?: CheckboxType;
  hasError?: string | boolean;
  label?: string;
  setChecked: (check: boolean) => void;
  checked: boolean;
  disabled?: boolean;
};
export const BaseCheckbox: FC<Props> = ({
  children,
  style,
  typeComponent = CheckboxType.default,
  label,
  hasError,
  setChecked,
  disabled,
  checked,
  ...other
}) => {
  return (
    <DefaultChecbox
      {...other}
      onClick={() => !disabled && setChecked(!checked)}
      disabled={disabled}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => null}
        name="checkbox"
      />
      {label && <label htmlFor="checkbox">{label}</label>}
    </DefaultChecbox>
  );
};
