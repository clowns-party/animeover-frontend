import React, { FC } from "react";
import Modal from "antd/lib/modal/Modal";

type Props = {
  children: React.ReactNode;
  visible?: boolean;
  show?: () => void;
  submit?: () => void;
  cancel?: () => void;
};
export const BaseModal: FC<Props> = ({
  children,
  visible = false,
  show = () => null,
  submit = () => null,
  cancel = () => null,
}) => {
  return (
    <>
      <Modal visible={visible} footer={null} onCancel={cancel}>
        {children}
      </Modal>
    </>
  );
};
