import React, { FC, useRef } from "react";
import styled from "styled-components";
import { zIndexLayout } from "utils/constants/zIndexLayout";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import { Portal } from "react-portal";
import { useImperativeDisableScroll } from "utils/hooks/useImperativeDisableScroll";

type Props = {
  children: React.ReactNode;
  visible?: boolean;
  style?: React.CSSProperties;
  show?: () => void;
  submit?: () => void;
  cancel?: () => void;
  withoutOutsideClick?: boolean;
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
  const modalRef = useRef();
  const wrapRer = useRef();
  useOutsideClick(modalRef, cancel);

  return (
    <>
      {visible && (
        <Portal>
          <NoScrollSAFE visible={visible} />
          <ModalWrapper style={style || {}} ref={wrapRer}>
            <div ref={modalRef}>{children}</div>
          </ModalWrapper>
        </Portal>
      )}
    </>
  );
};
// Safe scrool component, when used 2 modals, scroll not blocked, call hook only when modal showed
const NoScrollSAFE = ({ visible }) => {
  useImperativeDisableScroll({
    disabled: visible,
  });
  return <></>;
};

export default React.memo(BaseModal);
