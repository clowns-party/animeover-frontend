import React, { useState } from "react";

import BaseModal from "Elements/Base/Modal/BaseModal";
import { zIndexLayout } from "utils/constants/zIndexLayout";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import { FC } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { BaseInput } from "Elements/Base/Input/BaseInput";

type Props = {
  disabled?: boolean;
};

const Body = styled.div`
  width: 460px;
  border-radius: 24px;
  background: #ffffff;
  padding: 40px 30px;
  height: 400px;
`;

export const UserAnimeListModal: FC<Props> = ({ disabled }) => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const cancel = () => {
    setVisible(false);
  };
  return (
    <>
      <BaseButton disabled={disabled} onClick={show}>
        Edit
      </BaseButton>
      <BaseModal
        visible={visible}
        show={show}
        cancel={cancel}
        style={{ zIndex: zIndexLayout.MIDDLE_LEVEL }}
      >
        <Body>
          <h2>Rate</h2>
          <Rate count={10} defaultValue={2} />
          <h3>Review</h3>
          <BaseInput />
          <BaseButton>save</BaseButton>
          <BaseButton>Discard</BaseButton>
        </Body>
      </BaseModal>
    </>
  );
};
