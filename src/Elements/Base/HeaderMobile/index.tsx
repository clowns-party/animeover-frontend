import { MoreCirclesIcon } from "assets/icons/MoreCirclesIcon";
import { SearchIcon } from "assets/icons/SearchIcon";
import { SmallLogo } from "assets/icons/SmallLogo";
import { WhatshotIcon } from "assets/icons/WhatshotIcon";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { ROUTES } from "utils/routes";
import { HeaderOverlay } from "./HeaderOverlay";

const MobileWrap = styled.div<{ overlay: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.overlay ? "0px" : "20px")};
  width: 100%;
  z-index: 999999;
  display: flex;
  justify-content: center;
  transition: 0.2s all ease;
  .tabs {
    transition: 0.2s all ease;
    width: ${(props) => (props.overlay ? "100%" : "auto")};
    height: auto;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: ${(props) => (props.overlay ? "0px" : "31px")};
    display: flex;
    justify-content: space-between;
    padding: 15px;
    align-items: center;
  }
`;

const Tab = styled.div<{ active: boolean }>`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .title {
    margin-top: 5px;
    cursor: pointer;
    font-style: normal;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }
  svg {
    transition: 0.3s all ease;
    width: 25px;
    height: 25px;
    path {
      fill: ${(props) => (props.active ? "#FF6666" : "#747374")};
    }
  }
  &:hover {
    svg {
      path {
        fill: #efa4a4;
      }
    }
  }
  &:active {
    svg {
      path {
        fill: #efa4a4;
      }
    }
  }
  @media screen and (max-width: 576px) {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

export const HeaderMobile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(!visible);
  };

  const cancel = () => {
    setVisible(false);
  };
  const items = [
    {
      title: "Home",
      icon: <SmallLogo />,
      active: true,
      action: () => {
        router.push(ROUTES.main);
      },
    },
    {
      title: "Ongoing",
      icon: <WhatshotIcon />,
      active: false,
      action: () => {
        router.push(ROUTES.ongoing);
      },
    },
    {
      title: "Search",
      icon: <SearchIcon />,
      active: false,
      action: () => null,
    },

    {
      title: "More",
      icon: <MoreCirclesIcon />,
      active: false,
      action: () => show(),
    },
  ];

  return (
    <MobileWrap overlay={visible}>
      <div className="tabs">
        {items.map(({ active, icon, title, action }, index) => (
          <Tab key={index.toString()} active={active} onClick={action}>
            {icon}
            <div className="title">{title}</div>
          </Tab>
        ))}
      </div>
      <HeaderOverlay show={show} cancel={cancel} visible={visible} />
    </MobileWrap>
  );
};
