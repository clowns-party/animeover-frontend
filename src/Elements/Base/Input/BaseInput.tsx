import { SearchIcon } from "assets/icons/SearchIcon";
import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";
import styled from "styled-components";

export enum InputType {
  "default" = "default",
  "search" = "search",
}
type StyledInputProps = {
  hasError: string | boolean;
};

const DefaultInput = styled.input<{ hasError: boolean }>`
  width: 280px;
  height: 32px;
  background: #ffff;
  border: 1px solid
    ${(props: StyledInputProps) =>
      props.hasError ? "#FF6666 !important" : "rgba(0, 0, 0, 0.3)"};
  box-sizing: border-box;
  border-radius: 4px;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${(props: StyledInputProps) =>
    props.hasError ? "#FF6666 !important" : "rgba(0, 0, 0, 0.5)"};
  transition: 3ms all ease;
  padding-left: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 12px;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #000000;
  }
  &:disabled {
    background: #e8ebee;
    border: 1px solid #e8ebee;
    color: rgba(0, 0, 0, 0.3);
    cursor: no-drop;
  }
`;

const InputWrap = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 8px;
    right: 12px;
  }
`;

const SearchInput = styled(DefaultInput)`
  padding-right: 34px;
`;

type Props = {
  children?: React.ReactNode;
  extends?: HTMLAttributes<HTMLInputElement>;
  style?: React.CSSProperties;
  typeComponent?: InputType;
  hasError?: boolean;
} & InputHTMLAttributes<any>;
export const BaseInput: FC<Props> = ({
  children,
  style,
  typeComponent = DefaultInput.default,
  hasError,
  ...other
}) => {
  switch (typeComponent) {
    case InputType.default:
      return (
        <DefaultInput {...other} style={style} hasError={hasError}>
          {children && children}
        </DefaultInput>
      );
    case InputType.search:
      return (
        <InputWrap>
          <SearchInput {...other} style={style} hasError={hasError}>
            {children && children}
          </SearchInput>
          <SearchIcon />
        </InputWrap>
      );

    default:
      return (
        <DefaultInput {...other} style={style} hasError={hasError}>
          {children && children}
        </DefaultInput>
      );
  }
};
