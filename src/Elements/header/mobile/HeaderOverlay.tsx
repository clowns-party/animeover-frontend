import { AddUser } from "assets/icons/AddUser";
import { SpaIcon } from "assets/icons/SpaIcon";
import { signModalToggle } from "bus/auth/actions";
import { useAuth } from "bus/auth/hooks/useAuth";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ROUTES } from "utils/routes";
import BaseModal from "../../../stories/BaseModal";

const OverlayWrapper = styled.div`
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const OverlayContent = styled.div`
  background: #252323eb;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverlayItem = styled.div`
  width: 90%;
  max-width: 300px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  &:first-child {
    margin-bottom: 0px;
  }
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  span {
    color: #fff;
    display: inline-block;
    transform: rotate(45deg);
    font-size: 40px;
  }
  background: #252323eb;
`;

type Props = {
  show: () => void;
  cancel: () => void;
  visible: boolean;
};

export const HeaderOverlay: FC<Props> = ({ show, visible, cancel }) => {
  const dispatch = useDispatch();
  const { data } = useAuth();
  const auth = data?.user;
  const router = useRouter();
  const extraLinks = [
    {
      title: auth ? "Profile" : "Log In",
      icon: <AddUser />,
      active: false,
      action: () => {
        if (!auth) {
          show();
          dispatch(signModalToggle(true));
        } else {
          show();
          router.push(ROUTES.profile);
        }
      },
    },
    {
      title: "Anime",
      icon: <SpaIcon />,
      active: false,
      action: () => {
        show();
        router.push(ROUTES.anime);
      },
    },
  ];
  return (
    <BaseModal visible={visible}>
      <OverlayWrapper>
        <Close>
          <span onClick={() => show()}>+</span>
        </Close>
        <OverlayContent>
          {extraLinks.map((link, index) => (
            <OverlayItem key={index.toString()} onClick={link.action}>
              {link.title}
            </OverlayItem>
          ))}
        </OverlayContent>
      </OverlayWrapper>
    </BaseModal>
  );
};
