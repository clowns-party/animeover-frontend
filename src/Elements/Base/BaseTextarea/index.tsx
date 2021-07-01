import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

export enum TextareaType {
  "default" = "default",
}

const DefaultTextarea: any = styled.textarea`
  height: 121px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.5);
  padding: 12px;
  resize: none;
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
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

type Props = {
  children?: React.ReactNode;
  extends?: HTMLAttributes<HTMLTextAreaElement>;
  style?: React.CSSProperties;
  typeComponent?: TextareaType;
  hasError?: string | boolean;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export const BaseTextarea: FC<Props> = ({
  children,
  style,
  typeComponent = TextareaType.default,
  hasError,
  ...other
}) => {
  return (
    <DefaultTextarea {...other} style={style} hasError={hasError}>
      {children && children}
    </DefaultTextarea>
  );
};
