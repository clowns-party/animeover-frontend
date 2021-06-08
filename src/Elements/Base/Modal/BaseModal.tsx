import React, { FC, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "utils/hooks/useOutsideClick";

type Props = {
  children: React.ReactNode;
  visible?: boolean;
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
  z-index: 99999;
  background-color: #00000073;
`;

const BaseModal: FC<Props> = ({ children, cancel, visible }) => {
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
    <ModalWrapper>
      <div ref={modalRef}>{children}</div>
    </ModalWrapper>
  );
  return React.useMemo(
    () => (container ? ReactDOM.createPortal(Modal, container) : null),
    [visible]
  );
};

export default React.memo(BaseModal);
