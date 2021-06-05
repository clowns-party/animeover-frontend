import React, { FC, HTMLAttributes, InputHTMLAttributes } from "react";
import styled from "styled-components";

export enum InputType {
  "default" = "default",
}
type StyledInputProps = {
  hasError: string | boolean;
};

const DefaultInput = styled.input`
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

type Props = {
  children?: React.ReactNode;
  extends?: HTMLAttributes<HTMLInputElement>;
  style?: React.CSSProperties;
  type?: InputType;
  hasError?: string | boolean;
} & InputHTMLAttributes<any>;
export const BaseInput: FC<Props> = ({
  children,
  style,
  type = DefaultInput.default,
  hasError,
  ...other
}) => {
  return (
    <DefaultInput {...other} style={style} hasError={hasError}>
      {children && children}
    </DefaultInput>
  );
};
