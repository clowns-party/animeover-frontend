import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "../../assets/icons/ChevronDown";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";

type StyledDropdown = {
  toggled: boolean;
};
const DefaultDropdown = styled.div<{ disabled: boolean; toggled: boolean }>`
  position: relative;
  width: 280px;
  height: 32px;
  background: #e8ebee;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #4a4a4a;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 8px;
  padding-left: 8px;
  user-select: none;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "no-drop" : "auto")};
  svg {
    transform: ${(props: StyledDropdown) =>
      props.toggled ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
const HeadDropdown = styled.div<{ disabled: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  &:hover {
    opacity: 0.7;
  }
`;
const DropdownList = styled.div`
  position: absolute;
  z-index: 999999;
  width: ${(props: StyledDropdown) =>
    props.toggled ? "100%" : "0px !important"};
  left: 0;
  background: #e8ebee;
  border: 1px solid #e8ebee;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 4px;
  transition: 0.3s all ease;
  opacity: ${(props: StyledDropdown) => (props.toggled ? "1" : "0 !important")};
  height: ${(props: StyledDropdown) =>
    props.toggled ? "auto" : "0px !important"};
  box-sizing: border-box;
`;
type StyledItemProps = {
  active: boolean;
};
const Item = styled.div<{ disabled: boolean; active: boolean }>`
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${(props: StyledItemProps) =>
    props.active ? "rgba(0, 0, 0, 0.3)" : "#4a4a4a"};
  padding-top: 10px;
  width: 100%;
`;

type Props = {
  extends?: HTMLAttributes<HTMLDivElement>;
  style?: React.CSSProperties;
  select?: (item: string) => void;
  active: string;
  list: string[];
  disabled?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export const BaseDropdown: FC<Props> = ({
  active,
  list,
  style,
  select,
  disabled,
  ...other
}) => {
  const ref = React.useRef(null);
  const [toggled, setToggle] = useState(false);
  const toggle = () => {
    !disabled && setToggle(!toggled);
  };
  const close = () => {
    if (toggled) {
      !disabled && setToggle(false);
    }
  };
  useOutsideClick(ref, close);

  return (
    <DefaultDropdown
      {...other}
      style={style}
      toggled={toggled}
      ref={ref}
      disabled={disabled}
    >
      <HeadDropdown onClick={toggle} disabled={disabled}>
        {active || "-"}
        <ChevronDown />
      </HeadDropdown>
      <DropdownList toggled={toggled}>
        {toggled &&
          list?.length &&
          list.map((item, index) => (
            <Item
              disabled={disabled}
              onClick={() => (select ? select(item) : null)}
              key={index.toString()}
              active={item === active}
            >
              {item}
            </Item>
          ))}
      </DropdownList>
    </DefaultDropdown>
  );
};
