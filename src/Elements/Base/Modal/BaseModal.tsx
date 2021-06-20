import React, { FC, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { zIndexLayout } from "utils/constants/zIndexLayout";
import { useOutsideClick } from "utils/hooks/useOutsideClick";

type Props = {
  children: React.ReactNode;
  visible?: boolean;
  style?: React.CSSProperties;
  show?: () => void;
  submit?: () => void;
  cancel?: () => void;
};
const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${zIndexLayout.PRE_MIDDLE_LEVEL};
  background-color: #00000073;
`;

const BaseModal: FC<Props> = ({ children, cancel, visible, style }) => {
  let container;
  if (typeof window !== "undefined") {
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#__next");
    parentElem.appendChild(rootContainer);
    container = rootContainer;
  }
  const modalRef = container && useRef();

  container && useOutsideClick(modalRef, cancel, container);

  const Modal = visible && (
    <ModalWrapper style={style || {}}>
      <div ref={modalRef}>{children}</div>
    </ModalWrapper>
  );
  // Bad render if you pass children as not component
  const [force, setForce] = React.useState(false);
  React.useEffect(() => {
    setForce(!force);
  }, []);
  // bad resolve, find another
  React.useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else if (!visible) {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);
  return React.useMemo(
    () => (container ? ReactDOM.createPortal(Modal, container) : null),
    [visible, force]
  );
};

export default React.memo(BaseModal);
