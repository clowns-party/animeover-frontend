import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { PlusIcon } from "assets/icons/PlusIcon";
import styled from "styled-components";

export enum ButtonType {
  "important" = "important",
  "default" = "default",
  "secondary" = "secondary",
  "download" = "download",
}
const DefaultButton = styled.button`
  background: #000000;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-family: -apple-system, OpenSans, sans-serif;
  font-size: 13px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  justify-content: center;
  width: 99px;
  height: 32px;
  cursor: pointer;
  border: none;
  transition: 0.3s all ease;
  &:disabled {
    cursor: no-drop;
    opacity: 0.7;
  }
  &:hover{
    opacity: 0.7;
  }
`;
const ImportantButton = styled(DefaultButton)`
  background: #4478ff;
`;
const SecondaryButton = styled(DefaultButton)`
  border: 1px solid #4a4a4a;
  color: #4a4a4a;
  background: transparent;
  transition: 0.3s all ease;
  &:hover {
    color: black;
    border: 1px solid black;
  }
  &:disabled {
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.3);
  }
`;
const DownloadButton = styled(SecondaryButton)`
  svg {
    path {
      fill: #777777 !important;
      transition: fill 0.3s ease;
    }
  }
  &:hover {
    svg {
      path {
        fill: black !important;
      }
    }
  }
  &:disabled {
    svg {
      path {
        fill: rgba(0, 0, 0, 0.3) !important;
      }
    }
  }
`;
const DownloadWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 10px;
  }
`;

type Props = {
  children: React.ReactNode;
  extends?: HTMLAttributes<HTMLButtonElement>;
  style?: React.CSSProperties;
  typeComponent?: ButtonType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton: FC<Props> = ({
  children,
  style,
  typeComponent = ButtonType.default,
  ...other
}) => {
  switch (typeComponent) {
    case ButtonType.important:
      return (
        <ImportantButton {...other} style={style}>
          {children}
        </ImportantButton>
      );
    case ButtonType.secondary:
      return (
        <SecondaryButton {...other} style={style}>
          {children}
        </SecondaryButton>
      );
    case ButtonType.download:
      return (
        <DownloadButton {...other} style={style}>
          <DownloadWrap>
            <PlusIcon />
            {children}
          </DownloadWrap>
        </DownloadButton>
      );
    default:
      return (
        <DefaultButton {...other} style={style}>
          {children}
        </DefaultButton>
      );
  }
};
